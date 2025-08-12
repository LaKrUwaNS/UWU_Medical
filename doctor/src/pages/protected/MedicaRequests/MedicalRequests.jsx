import React, { useState, useEffect } from 'react';
import './MedicalRequests.css';
import RequestCard from '../../../components/RequestCard/RequestCard';
import images from "../../../assets/images";


function MedicalRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch medical requests from backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/staff/medical-requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const mappedRequests = data.data.medicalRequests.map(req => ({
            id: req._id,  // Use backend _id here
            name: req.studentId?.name || "Unknown Student",
            regNo: req.studentId?.indexNumber || "N/A",
            dateFrom: new Date(req.date).toISOString().split("T")[0],
            dateTo: new Date(req.schedule).toISOString().split("T")[0],
            message: req.reason || "No reason provided",
            condition: req.servicetype || "Not specified",
            report: req.report || req.Report || "No report",
            image: req.studentId?.photo || images.defaultProfile,
            status: req.status
          }));
          setRequests(mappedRequests);
        } else {
          console.error("Failed to fetch medical requests:", data.message);
        }
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Reject handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/doctor/medical-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" })
      });
      const result = await res.json();
      if (result.success) {
        // Remove rejected request from UI list or update status
        setRequests(prev => prev.filter(req => req.id !== id));
      } else {
        alert("Failed to reject request: " + result.message);
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  // Approve handler
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/doctor/medical-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" })
      });
      const result = await res.json();
      if (result.success) {
        // Update approved request status in UI
        setRequests(prev =>
          prev.map(req => (req.id === id ? { ...req, status: "approved" } : req))
        );
      } else {
        alert("Failed to approve request: " + result.message);
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex' }}>
        <main className="medical-request-page">
          <div className="header-MR">
            <h2 className="MR">Medical Requests</h2>
          </div>

          {loading ? (
            <div className="empty-state"><p>Loading medical requests...</p></div>
          ) : requests.length === 0 ? (
            <div className="empty-state"><p>No medical requests available.</p></div>
          ) : (
            <div className="requests-grid two-cols">
              {requests.map(req => (
                <RequestCard
                  key={req.id}
                  data={req}
                  onDelete={() => handleDelete(req.id)}
                  onApprove={() => handleApprove(req.id)}
                  className="request-card"
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MedicalRequests;
