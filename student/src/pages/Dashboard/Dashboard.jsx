import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      specialty: "Cardiologist",
      avatar: "👩‍⚕️",
      status: "available"
    },
    {
      id: 2,
      name: "Dr. David Lee",
      specialty: "Pediatrician",
      avatar: "👨‍⚕️",
      status: "busy"
    },
    {
      id: 3,
      name: "Dr. Sarah Jones",
      specialty: "Dermatologist",
      avatar: "👩‍⚕️",
      status: "busy"
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      specialty: "Neurologist",
      avatar: "👨‍⚕️",
      status: "busy"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Student Dashboard</h1>
          
        </div>
        <div className="header-right">
          <div className="profile-avatar">👤</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        

        {/* Medical Requests Section */}
        <div className="section">
          <div className="section-header">
            <h2>Medical Requests</h2>
            <span className="no-requests">No New Requests</span>
          </div>
          
          <div className="medical-card">
            <div className="card-icon">
              <div className="medical-cross">
                <div className="cross-horizontal"></div>
                <div className="cross-vertical"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Availability Section */}
        <div className="section">
          <h2 className="section-title">Doctor Availability</h2>
          
          <div className="doctors-list">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-item">
                <div className="doctor-info">
                  <div className="doctor-avatar">{doctor.avatar}</div>
                  <div className="doctor-details">
                    <div className="doctor-name">{doctor.name}</div>
                    <div className="doctor-specialty">{doctor.specialty}</div>
                  </div>
                </div>
                <div className={`status-indicator ${doctor.status}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;