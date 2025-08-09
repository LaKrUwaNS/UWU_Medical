import React from 'react';
import './ApplyMedical.css';
import MedicalForm from '../../components/MedicalForm/MedicalForm';
import RequestCard from '../../components/RequestCard/RequestCard';

function ApplyMedical() {
  return (
    <div className="page-container">
      <div className="form-wrapper">
         <MedicalForm />
      </div>
     

      <div className="request-section">
        <h2>Requested Medicals</h2>

        <RequestCard
          status="Pending"
          title="Headache"
          description="I have been experiencing persistent headaches for the past two days."
          fromDate="May 16"
          toDate="May 17"
        />
        <RequestCard
          status="Approved"
          title="Headache"
          description="I have been experiencing persistent headaches for the past two days."
          fromDate="May 16"
          toDate="May 17"
        />
        <RequestCard
          status="Rejected"
          title="Headache"
          description="I have been experiencing persistent headaches for the past two days."
          fromDate="May 16"
          toDate="May 17"
        />
      </div>
    </div>
  );
}

export default ApplyMedical;
