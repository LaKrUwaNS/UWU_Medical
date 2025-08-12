import React, { useState } from 'react';
import './ApplyMedical.css';
import MedicalForm from '../../components/MedicalForm/MedicalForm';
import RequestCard from '../../components/RequestCard/RequestCard';

function ApplyMedical() {
  // State to manage the list of medical requests
  const [medicalRequests, setMedicalRequests] = useState([
    {
      id: 1,
      status: "Pending",
      title: "Headache",
      description: "I have been experiencing persistent headaches for the past two days.",
      fromDate: "May 16",
      toDate: "May 17"
    },
    {
      id: 2,
      status: "Approved",
      title: "Regular Checkup",
      description: "Annual health checkup and blood work examination.",
      fromDate: "May 18",
      toDate: "May 19"
    },
    {
      id: 3,
      status: "Rejected",
      title: "Emergency Consultation",
      description: "Urgent consultation needed for chest pain symptoms.",
      fromDate: "May 14",
      toDate: "May 15"
    },
    {
      id: 4,
      status: "Pending",
      title: "Follow-up Visit",
      description: "Follow-up appointment for previous medication review.",
      fromDate: "May 20",
      toDate: "May 21"
    }
  ]);

  // Handler to delete a medical request
  const handleDeleteRequest = (requestId) => {
    setMedicalRequests(prevRequests => 
      prevRequests.filter(request => request.id !== requestId)
    );
  };

  // Handler to add a new medical request (you can connect this to your MedicalForm)
  const handleAddRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: Date.now(), // Simple ID generation, consider using a more robust method
      status: "Pending" // New requests start as pending
    };
    setMedicalRequests(prevRequests => [...prevRequests, requestWithId]);
  };

  return (
    <div className="medi-page-container">
      <div className="form-wrapper-Medi">
         <MedicalForm onSubmit={handleAddRequest} />
      </div>
     
      <div className="request-section">
        <h2 className="section-title-medi">Requested Medicals</h2>
        
        <div className="requests-list">
          {medicalRequests.length > 0 ? (
            medicalRequests.map(request => (
              <RequestCard
                key={request.id}
                id={request.id}
                status={request.status}
                title={request.title}
                description={request.description}
                fromDate={request.fromDate}
                toDate={request.toDate}
                onDelete={handleDeleteRequest}
              />
            ))
          ) : (
            <div className="no-requests">
              <p>No medical requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplyMedical;