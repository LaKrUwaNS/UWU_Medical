import React from 'react';
import './Error.css';
import errorImg from '../../../assets/Popups/error.png'; // Adjust path if needed

function Error() {
  return (
    <div className="error-popup">
      <img src={errorImg} alt="Error" className="error-icon" />
      <span className="error-text">Logging failed username password error</span>
    </div>
  );
}

export default Error;









