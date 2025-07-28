import React from "react";
import "./NextPatientCard.css";

const NextPatientCard = ({ name, id, imageUrl, onProcess, onCancel }) => {
  return (
    <div className="next-patient-card">
      <div className="next-header">
        <span>Next Patient</span>
      </div>
      <div className="next-body">
        <img src={imageUrl} alt={name} className="patient-image" />
        <div className="patient-info">
          <p className="patient-id">{id}</p>
          <p className="patient-name">{name}</p>
        </div>
        <div className="patient-actions">
          <button className="process-btn" onClick={onProcess}>Process</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NextPatientCard;
