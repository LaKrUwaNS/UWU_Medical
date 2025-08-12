import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  // Sample medical requests data
  const [medicalRequests] = useState([
    {
      id: 1,
      doctorName: "Dr. Emily Carter",
      specialty: "Cardiologist",
      requestDate: "2025-08-10",
      status: "pending",
      requestType: "Check-up",
      priority: "normal"
    },
    {
      id: 2,
      doctorName: "Dr. David Lee",
      specialty: "Pediatrician", 
      requestDate: "2025-08-09",
      status: "approved",
      requestType: "Consultation",
      priority: "urgent"
    },
    {
      id: 3,
      doctorName: "Dr. Sarah Jones",
      specialty: "Dermatologist",
      requestDate: "2025-08-08",
      status: "completed",
      requestType: "Treatment",
      priority: "normal"
    }
  ]);

  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      specialty: "Cardiologist",
      avatar: "👩‍⚕️",
      status: "available",
      nextAvailable: "Available until 5:00 PM",
      experience: "8 years"
    },
    {
      id: 2,
      name: "Dr. David Lee",
      specialty: "Pediatrician",
      avatar: "👨‍⚕️",
      status: "busy",
      nextAvailable: "Busy until 6:00 PM",
      experience: "12 years"
    },
    {
      id: 3,
      name: "Dr. Sarah Jones",
      specialty: "Dermatologist",
      avatar: "👩‍⚕️",
      status: "available",
      nextAvailable: "Available until 7:00 PM",
      experience: "6 years"
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      specialty: "Neurologist",
      avatar: "👨‍⚕️",
      status: "busy",
      nextAvailable: "Busy until tomorrow",
      experience: "15 years"
    }
  ];

  // Get request counts by status
  const getRequestStats = () => {
    const pending = medicalRequests.filter(req => req.status === 'pending').length;
    const approved = medicalRequests.filter(req => req.status === 'approved').length;
    const completed = medicalRequests.filter(req => req.status === 'completed').length;
    return { pending, approved, completed, total: medicalRequests.length };
  };

  const stats = getRequestStats();

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'normal': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Student Medical Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="profile-avatar">👤</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        
        {/* Quick Stats */}
        <div className="section">
          <h2 className="section-title">Medical Request Overview</h2>
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Requests</div>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card approved">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{stats.approved}</div>
                <div className="stat-label">Approved</div>
              </div>
            </div>
            <div className="stat-card completed">
              <div className="stat-icon">✓</div>
              <div className="stat-content">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Medical Requests */}
        <div className="section-Dash">
          <div className="section-header">
            <h2>My Medical Requests</h2>
            <span className="view-all-link">View All</span>
          </div>
          
          <div className="requests-list">
            {medicalRequests.map((request) => (
              <div key={request.id} className="request-item">
                <div className="request-info">
                  <div className="request-header">
                    <div className="request-title">{request.requestType}</div>
                    <div className="request-date">{new Date(request.requestDate).toLocaleDateString()}</div>
                  </div>
                  <div className="request-doctor">{request.doctorName} - {request.specialty}</div>
                </div>
                <div className="request-badges">
                  <span 
                    className="priority-badge" 
                    style={{backgroundColor: getPriorityColor(request.priority)}}
                  >
                    {request.priority}
                  </span>
                  <span 
                    className="status-badge"
                    style={{backgroundColor: getStatusColor(request.status)}}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Availability Section */}
        <div className="section-Dash-B">
          <h2 className="section-title-DA">Doctor Availability</h2>
          
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-card-header">
                  <div className="doctor-avatar">{doctor.avatar}</div>
                  <div className={`status-indicator ${doctor.status}`}></div>
                </div>
                <div className="doctor-card-content">
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-specialty">{doctor.specialty}</div>
                  <div className="doctor-experience">{doctor.experience} experience</div>
                  <div className="doctor-availability">
                    <span className="availability-label">Next Available:</span>
                    <span className="availability-time">{doctor.nextAvailable}</span>
                  </div>
                </div>
                <div className="doctor-status-display">
                  <div className={`availability-status ${doctor.status}`}>
                    <span className={`status-dot ${doctor.status}`}></span>
                    {doctor.status === 'available' ? 'Available Now' : 'Currently Busy'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;