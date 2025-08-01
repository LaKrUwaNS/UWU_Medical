import React, { useState } from 'react';
import './RequestCard.css';

const RequestCard = ({ data, onDelete, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      setLoading(true);
      setTimeout(() => {
        onDelete && onDelete();
        setLoading(false);
      }, 1500);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      // Handle approval logic here
    }, 2000);
  };

  const getPriorityLevel = () => {
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
      {/* Floating Status Indicator */}
      <div className="status-float">
        <div className="pulse-dot"></div>
        <span className="status-text">Active</span>
      </div>

      {/* Priority Stripe */}
      <div className="priority-stripe"></div>

      {/* Card Header with Enhanced Profile */}
      <div className="card-header">
        <div className="profile-section">
          <div className="avatar-wrapper">
            <img src={data.image} alt="profile" className="profile-avatar" />
            <div className="avatar-ring"></div>
            <div className="online-indicator"></div>
          </div>
          
          <div className="profile-info">
            <h3 className="patient-name">{data.name}</h3>
            <div className="patient-details">
              <span className="reg-number">{data.regNo}</span>
              <div className="patient-meta">
                <span className="meta-item">
                  <span className="meta-icon">🎓</span>
                  Student
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📍</span>
                  Medical Center
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="date-timeline">
          <div className="timeline-container">
            <div className="timeline-item start">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-label">From</span>
                <span className="timeline-date">{data.dataFrom}</span>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-item end">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-label">To</span>
                <span className="timeline-date">{data.dateTo}</span>
              </div>
            </div>
          </div>
          
          <div className="duration-badge">
            <span className="duration-icon">⏱️</span>
            <span className="duration-text">5 Days</span>
          </div>
        </div>
      </div>

      {/* Message Section with Typography Enhancement */}
      <div className="message-container">
        <div className="message-header">
          <span className="message-icon">💬</span>
          <span className="message-title">Patient Request</span>
          <div className="priority-indicator">
            <span className={`priority-dot priority-${priority}`}></span>
            <span className="priority-text">{priority === 'high' ? 'Urgent' : priority === 'medium' ? 'Moderate' : 'Normal'}</span>
          </div>
        </div>
        
        <div className={`message-content ${isExpanded ? 'expanded' : ''}`}>
          <p className="request-text">{data.message}</p>
          {data.message?.length > 100 && (
            <button 
              className="expand-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <span className={`toggle-arrow ${isExpanded ? 'rotated' : ''}`}>→</span>
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Medical Report */}
      <div className="medical-report">
        <div className="report-header">
          <div className="report-icon-wrapper">
            <span className="report-icon">🏥</span>
          </div>
          <div className="report-title-section">
            <h4 className="report-title">Medical Assessment</h4>
            <span className="report-subtitle">Professional Evaluation</span>
          </div>
        </div>
        
        <div className="diagnosis-tag">
          <span className="diagnosis-label">Diagnosis:</span>
          <span className="diagnosis-value">{data.condition}</span>
        </div>
        
        <div className="report-content">
          <p className="report-description">{data.report}</p>
        </div>
        
        <div className="report-footer">
          <div className="severity-meter">
            <span className="severity-label">Severity:</span>
            <div className="severity-bar">
              <div className={`severity-fill severity-${priority}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons with Micro-interactions */}
      <div className="action-section">
        <button 
          className={`action-btn reject-btn ${loading ? 'loading' : ''}`}
          onClick={handleDelete}
          disabled={loading || isApproving}
        >
          <span className="btn-icon">
            {loading ? <div className="spinner"></div> : '✕'}
          </span>
          <span className="btn-text">
            {loading ? 'Processing...' : 'Reject'}
          </span>
          <div className="btn-ripple"></div>
        </button>
        
        <button 
          className={`action-btn approve-btn ${isApproving ? 'approving' : ''}`}
          onClick={handleApprove}
          disabled={loading || isApproving}
        >
          <span className="btn-icon">
            {isApproving ? <div className="check-animation">✓</div> : '✓'}
          </span>
          <span className="btn-text">
            {isApproving ? 'Approving...' : 'Approve'}
          </span>
          <div className="btn-ripple"></div>
        </button>
      </div>

      {/* Card Footer with Timestamp */}
      <div className="card-footer">
        <div className="timestamp-section">
          <span className="timestamp-icon">🕐</span>
          <span className="timestamp-text">Submitted 2 hours ago</span>
        </div>
        
        <div className="quick-actions">
          <button className="quick-action-btn" title="Mark as Important">
            <span className="quick-icon">⭐</span>
          </button>
          <button className="quick-action-btn" title="Add Comment">
            <span className="quick-icon">💬</span>
          </button>
          <button className="quick-action-btn" title="More Options">
            <span className="quick-icon">⋯</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;