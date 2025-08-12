import React from 'react';
import './ApplyMedical.css';
import MedicalForm from '../../components/MedicalForm/MedicalForm';
import RequestCard from '../../components/RequestCard/RequestCard';

function ApplyMedical() {
  return (
    <div className="medi-page-container">
      <div className="form-wrapper-Medi">
         <MedicalForm />
      </div>
     
      <div className="request-section">
        <h2 className="section-title-medi">Requested Medicals</h2>
        
        <div className="requests-list">
          <RequestCard
            status="Pending"
            title="Headache"
            description="I have been experiencing persistent headaches for the past two days."
            fromDate="May 16"
            toDate="May 17"
          />
          <RequestCard
            status="Approved"
            title="Regular Checkup"
            description="Annual health checkup and blood work examination."
            fromDate="May 18"
            toDate="May 19"
          />
          <RequestCard
            status="Rejected"
            title="Emergency Consultation"
            description="Urgent consultation needed for chest pain symptoms."
            fromDate="May 14"
            toDate="May 15"
          />
          <RequestCard
            status="Pending"
            title="Follow-up Visit"
            description="Follow-up appointment for previous medication review."
            fromDate="May 20"
            toDate="May 21"
          />
        </div>
      </div>
    </div>
  );
}

export default ApplyMedical;