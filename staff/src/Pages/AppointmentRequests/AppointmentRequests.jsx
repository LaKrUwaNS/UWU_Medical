import React, { useEffect, useState } from "react";
import { Calendar, Clock, Search, BarChart, Check, X, Eye } from "lucide-react";
import "./AppointmentRequests.css";

const STATUS_COLORS = {
  pending: "#f59e0b",
  approved: "#10b981",
  rejected: "#ef4444",
};

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
  });
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/staff/medical-requests", {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setAppointments(json.data.medicalRequests);
          setStats(json.data.stats);
        } else {
          console.error("API error:", json.message);
        }
      } catch (error) {
        console.error("Failed to fetch medical requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab !== "All" && appointment.status !== activeTab.toLowerCase())
      return false;

    const search = searchTerm.toLowerCase();
    const studentName = appointment.studentId?.name?.toLowerCase() || "";
    const reason = appointment.reason?.toLowerCase() || "";
    return studentName.includes(search) || reason.includes(search);
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Placeholder: Call your API here to update appointment status or perform other actions
  const handleActionClick = async (appointmentId, action) => {
    console.log(`Performing '${action}' on appointment ${appointmentId}`);
    // Example API call pattern:
    // await fetch(`http://localhost:5000/staff/medical-requests/${appointmentId}/${action}`, {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    // Then refresh or update state accordingly
  };

  return (
    <div className="appointments-container">
      <div className="main-content">
        <div className="page-header">
          <h1>Appointment Requests</h1>
          <div className="header-stats">
            <div className="stat-card">
              <BarChart className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalRequests}</span>
                <span className="stat-label">Total Requests</span>
              </div>
            </div>
            <div className="stat-card pending">
              <Clock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalPending}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
            <div className="stat-card approved">
              <Check className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalApproved}</span>
                <span className="stat-label">Approved</span>
              </div>
            </div>
            <div className="stat-card rejected">
              <X className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalRejected}</span>
                <span className="stat-label">Rejected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className="tab-count">
                  {tab === "All" ? stats.totalRequests : stats[`total${tab}`] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="controls">
          <div className="search-filter">
            <div className="search-box-AR">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by student name or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          {loading ? (
            <p>Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <h3>No appointments found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Request Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th> {/* New Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="table-row">
                    <td>
                      <div className="student-info">
                        <img
                          src={
                            appointment.studentId?.photo ||
                            "https://via.placeholder.com/40"
                          }
                          alt={appointment.studentId?.name || "Student"}
                          className="student-avatar"
                        />
                        <span className="student-name">
                          {appointment.studentId?.name || "Unknown Student"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <Calendar size={16} className="date-icon" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                    </td>
                    <td>
                      <span className="reason-tag">{appointment.reason}</span>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: `${STATUS_COLORS[appointment.status]}33`,
                          color: STATUS_COLORS[appointment.status],
                        }}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-cell">
                        {/* View button */}
                        <button
                          className="btn-icon view"
                          title="View Details"
                          onClick={() => handleActionClick(appointment._id, "view")}
                        >
                          <Eye size={16} />
                        </button>

                        {/* Approve button for pending */}
                        {appointment.status === "pending" && (
                          <>
                            <button
                              className="btn-icon approve"
                              title="Approve"
                              onClick={() =>
                                handleActionClick(appointment._id, "approve")
                              }
                            >
                              <Check size={16} />
                            </button>

                            {/* Reject button for pending */}
                            <button
                              className="btn-icon reject"
                              title="Reject"
                              onClick={() =>
                                handleActionClick(appointment._id, "reject")
                              }
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequests;
