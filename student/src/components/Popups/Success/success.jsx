import React from 'react';
import './Success.css';
import successImg from '../../../assets/Popups/s.png'; // Adjust path if needed


function success() {
  return (
    <div className="success-popup">
     <img src={successImg} alt="Success" className="success-icon" />
       
      <span className="success-text">New prescription Added</span>
    </div>
  );
}

export default success;