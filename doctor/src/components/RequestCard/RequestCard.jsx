import React, { useState } from 'react';
import './RequestCard.css';

const RequestCard = ({ data, onDelete, onApprove, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      setLoading(true);
      await onDelete?.();
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);
    await onApprove?.();
    setIsApproving(false);
  };

  // Show priority based on message or status
  const getPriorityLevel = () => {
    if (data.status === "rejected") return "rejected";
    if (data.status === "approved") return "approved";

    if (data.message?.toLowerCase().includes('urgent') || data.message?.toLowerCase().includes('emergency')) {
      return 'high';
    } else if (data.message?.toLowerCase().includes('fever') || data.message?.toLowerCase().includes('pain')) {
      return 'medium';
    }
    return 'normal';
  };

  const priority = getPriorityLevel();

  return (
    <div className={`ultra-modern-card ${className} ${loading ? 'processing' : ''} ${isApproving ? 'approving' : ''} priority-${priority}`}>
      {/* Profile + Info */}
      <div className="card-header">
        <div className="profile-section">
          <div className="avatar-wrapper">
            <img src={data.image} alt="profile" className="profile-avatar" />
          </div>
          <div className="profile-info">
            <h3 className="patient-name">{data.name}</h3>
            <div className="patient-details">
              <span className="reg-number">{data.regNo}</span>
            </div>
          </div>
        </div>

        <div className="date-timeline">
          <div>
            <span>From: {data.dateFrom}</span> | <span>To: {data.dateTo}</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="message-container">
        <p>{data.message}</p>
      </div>

      {/* Medical Report */}
      <div className="medical-report">
        <p><strong>Diagnosis:</strong> {data.condition}</p>
        <p><strong>Report:</strong> {data.report}</p>
        <p><strong>Status:</strong> <span className={`status-text status-${data.status}`}>{data.status}</span></p>
      </div>

      {/* Actions */}
      <div className="action-section">
        {/* Disable buttons if already rejected or approved */}
        <button
          className={`action-btn reject-btn ${loading ? 'loading' : ''}`}
          onClick={handleDelete}
          disabled={loading || isApproving || data.status === 'rejected'}
        >
          {loading ? 'Processing...' : 'Reject'}
        </button>

        <button
          className={`action-btn approve-btn ${isApproving ? 'approving' : ''}`}
          onClick={handleApprove}
          disabled={loading || isApproving || data.status === 'approved'}
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
