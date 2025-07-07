import React from "react";
import './ConfirmMessage.css';


const Confirmation = () => (
  <div className="confirmation-container">
    <div className="confirmation-box">
      <div className="confirmation-icon">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" stroke="#00FF00" strokeWidth="4" fill="none" />
          <path d="M20 34L30 44L46 26" stroke="#00FF00" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="confirmation-title">Registration Successful!</h2>
      <p className="confirmation-message">
        Thanks for the Registering to the our system now you<br />
        can make your logging
      </p>
      <button
        className="confirmation-button"
        onClick={() => window.location.href = "/login"}
      >
        Go to Logging
      </button>
    </div>
  </div>
);

export default Confirmation;