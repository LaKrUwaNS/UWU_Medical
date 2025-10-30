import React from 'react';
import './RequestCard.css';

function RequestCard({ 
  id, 
  status, 
  title, 
  description, 
  fromDate, 
  toDate, 
  onDelete 
}) {
  const statusClass = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
  };

  const cssClass = statusClass[status] || 'pending';

  const handleDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      // Optional: Add confirmation dialog
      if (window.confirm('Are you sure you want to delete this request?')) {
        onDelete(id);
      }
    }
  };

  return (
    <div className={`request-card ${cssClass}`}>
      <div className="request-header">
        <span className="request-title">{title}</span>
        <span className={`badge ${cssClass}`}>{status}</span>
      </div>

      <p className="request-description">{description}</p>

      <div className="request-footer">
        <div className="duration">
          <strong>Duration</strong><br />
          <span>From {fromDate}</span><br />
          <span>To {toDate}</span>
        </div>
        <div className="button-group">
          <button className="btn resend-btn">Resend</button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;