import React, { useState, useEffect } from 'react';
import { Edit, Home, Calendar, Settings, User, Stethoscope, Bell, FileText, MessageCircle, Menu, X } from 'lucide-react';
import './homeui.css'; // Import the CSS file

export default function MedicalCenterPortal() {
  const [activePage, setActivePage] = useState('updates');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'apply', label: 'Apply medical', icon: Stethoscope },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'contact', label: 'Contact Doctor', icon: MessageCircle }
  ];

  // Additional menu items for expanded sidebar
  const additionalMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'student-data', label: 'Student Data', icon: User },
    { id: 'medical-requests', label: 'Medical Requests', icon: FileText },
    { id: 'reminders', label: 'Reminders', icon: Calendar }
  ];

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard - Overview';
      case 'student-data': return 'Student Data - Profile Information';
      case 'medical-requests': return 'Medical Requests - Request History';
      case 'reminders': return 'Reminders - Upcoming Appointments';
      case 'apply': return 'Apply Medical - Application Form';
      case 'updates': return 'Update - Reading';
      case 'settings': return 'Settings - Profile Configuration';
      case 'contact': return 'Contact - Doctor Communication';
      default: return '';
    }
  };

  // New page components for additional menu items
  const DashboardPage = () => (
    <div className="content-card">
      <h1 className="page-title">Dashboard</h1>
      <div className="form-grid">
        <div className="doctor-info-card">
          <h3 className="section-title">Welcome Back!</h3>
          <p>Here's an overview of your medical center activities.</p>
          <div className="doctor-info-details">
            <p><strong>Next Appointment:</strong> Tomorrow at 2:00 PM</p>
            <p><strong>Pending Requests:</strong> 2</p>
            <p><strong>Recent Updates:</strong> 3 new messages</p>
          </div>
        </div>
        <div className="doctor-info-card">
          <h3 className="section-title">Quick Actions</h3>
          <div className="button-group">
            <button className="button" onClick={() => setActivePage('apply')}>
              New Medical Request
            </button>
            <button className="secondary-button" onClick={() => setActivePage('contact')}>
              Contact Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StudentDataPage = () => (
    <div className="content-card">
      <h1 className="page-title">Student Data</h1>
      <div className="form-grid">
        <div>
          <div className="form-group">
            <label className="label">Student ID</label>
            <input type="text" defaultValue="STU2024001" className="input" readOnly />
          </div>
          <div className="form-group">
            <label className="label">Full Name</label>
            <input type="text" defaultValue="John Doe" className="input" />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input type="email" defaultValue="john.doe@university.edu" className="input" />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label className="label">Phone Number</label>
            <input type="tel" defaultValue="+94 77 123 4567" className="input" />
          </div>
          <div className="form-group">
            <label className="label">Emergency Contact</label>
            <input type="tel" defaultValue="+94 77 987 6543" className="input" />
          </div>
          <button className="button">Update Information</button>
        </div>
      </div>
    </div>
  );

  const MedicalRequestsPage = () => (
    <div className="content-card">
      <h1 className="page-title">Medical Requests</h1>
      <div style={{ marginBottom: '24px' }}>
        <button className="button" onClick={() => setActivePage('apply')}>
          + New Medical Request
        </button>
      </div>
      <div className="form-grid">
        {[1, 2, 3].map((request) => (
          <div key={request} className="doctor-info-card">
            <h3 className="section-title">Request #{request}</h3>
            <div className="doctor-info-details">
              <p><strong>Type:</strong> General Consultation</p>
              <p><strong>Date:</strong> 2024-08-0{request}</p>
              <p><strong>Status:</strong> {request === 1 ? 'Approved' : request === 2 ? 'Pending' : 'Completed'}</p>
              <p><strong>Doctor:</strong> Dr. Lakruwan Shanika</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RemindersPage = () => (
    <div className="content-card">
      <h1 className="page-title">Reminders</h1>
      <div className="form-grid">
        <div className="doctor-info-card">
          <h3 className="section-title">Upcoming Appointments</h3>
          <div className="doctor-info-details">
            <p className="doctor-info-row"><strong>Tomorrow, 2:00 PM</strong> - General Checkup</p>
            <p className="doctor-info-row"><strong>Aug 10, 10:00 AM</strong> - Vaccination</p>
            <p className="doctor-info-row"><strong>Aug 15, 3:30 PM</strong> - Follow-up</p>
          </div>
        </div>
        <div className="emergency-notice">
          <h4 className="emergency-title">Health Reminders</h4>
          <p className="emergency-text">• Annual health checkup due next month</p>
          <p className="emergency-text">• Flu vaccination available</p>
          <p className="emergency-text">• Update emergency contact information</p>
        </div>
      </div>
    </div>
  );

  const ApplyPage = () => (
    <div className="content-card">
      <h1 className="page-title">Apply for Medical Services</h1>
      <div className="form-grid">
        <div>
          <div className="form-group">
            <label className="label">Full Name</label>
            <input type="text" className="input" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label className="label">Student ID</label>
            <input type="text" className="input" placeholder="Enter your student ID" />
          </div>
          <div className="form-group">
            <label className="label">Medical Service Type</label>
            <select className="select">
              <option>General Consultation</option>
              <option>Vaccination</option>
              <option>Health Checkup</option>
              <option>Emergency Care</option>
            </select>
          </div>
        </div>
        <div>
          <div className="form-group">
            <label className="label">Preferred Date</label>
            <input type="date" className="input" />
          </div>
          <div className="form-group">
            <label className="label">Symptoms/Reason</label>
            <textarea className="textarea" placeholder="Describe your symptoms or reason for visit"></textarea>
          </div>
          <button className="button">Submit Application</button>
        </div>
      </div>
    </div>
  );

  const UpdatesPage = () => (
    <div className="update-card">
      <div className="update-image">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300'%3E%3Crect width='800' height='300' fill='%23f3f4f6'/%3E%3Cg fill='%23374151'%3E%3Crect x='50' y='100' width='80' height='40' rx='4'/%3E%3Crect x='150' y='100' width='80' height='40' rx='4'/%3E%3Crect x='250' y='100' width='80' height='40' rx='4'/%3E%3Crect x='350' y='100' width='80' height='40' rx='4'/%3E%3Crect x='450' y='100' width='80' height='40' rx='4'/%3E%3Crect x='550' y='100' width='80' height='40' rx='4'/%3E%3Crect x='650' y='100' width='80' height='40' rx='4'/%3E%3Crect x='50' y='160' width='80' height='40' rx='4'/%3E%3Crect x='150' y='160' width='80' height='40' rx='4'/%3E%3Crect x='250' y='160' width='80' height='40' rx='4'/%3E%3Crect x='350' y='160' width='80' height='40' rx='4'/%3E%3Crect x='450' y='160' width='80' height='40' rx='4'/%3E%3Crect x='550' y='160' width='80' height='40' rx='4'/%3E%3Crect x='650' y='160' width='80' height='40' rx='4'/%3E%3Crect x='50' y='220' width='80' height='40' rx='4'/%3E%3Crect x='150' y='220' width='80' height='40' rx='4'/%3E%3Crect x='250' y='220' width='80' height='40' rx='4'/%3E%3Crect x='350' y='220' width='80' height='40' rx='4'/%3E%3Crect x='450' y='220' width='80' height='40' rx='4'/%3E%3Crect x='550' y='220' width='80' height='40' rx='4'/%3E%3Crect x='650' y='220' width='80' height='40' rx='4'/%3E%3Crect x='300' y='20' width='200' height='60' rx='8' fill='%236b7280'/%3E%3Crect x='320' y='35' width='160' height='30' rx='4' fill='%233b82f6'/%3E%3C/g%3E%3C/svg%3E"
          alt="Lecture hall with desks and screen"
          className="update-image-img"
        />
        <button className="edit-button">
          <Edit size={16} color="white" />
        </button>
      </div>

      <div className="update-content">
        <h1 className="page-title">When using lecture halls</h1>

        <div className="form-grid">
          <div>
            <p className="update-text">
              When using lecture halls, it is important to prioritize health and safety to create a comfortable and productive learning environment. Proper ventilation should be maintained to ensure a steady flow of fresh air, reducing the risk of airborne illnesses and improving concentration. Seating should be arranged to promote good posture, as poor sitting positions over long periods can cause back and neck pain. Adequate lighting helps prevent eye strain, while maintaining a moderate room temperature ensures comfort for all attendees. Regular cleaning and sanitization of desks, chairs, and shared equipment are essential to limit the spread of germs.
            </p>

            <p className="update-text">
              Cleanliness and hygiene in lecture halls play a vital role in preventing the spread of diseases. High-contact surfaces such as desks, chairs, door handles, and microphones should be cleaned regularly. Students should also be encouraged to maintain personal hygiene and follow health protocols.
            </p>
          </div>

          <div>
            <p className="update-text">
              Another key factor is posture and seating comfort. Students often spend long hours in lecture halls, and poorly designed seating or incorrect sitting posture can lead to back, neck, and shoulder strain. It is advisable to sit with proper back support and adjust one's position periodically. Lecturers can encourage students to take brief stretching breaks during long sessions to improve blood circulation and prevent stiffness. This not only improves physical well-being but also boosts alertness and focus.
            </p>

            <p className="update-text">
              Lastly, crowd management and personal responsibility are essential to maintaining a healthy lecture hall atmosphere. Overcrowding can make it difficult to maintain personal space and proper ventilation throughout the room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="content-card">
      <h1 className="page-title">Settings</h1>

      <div>
        <div className="settings-section">
          <h2 className="section-title">Profile Settings</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Display Name</label>
              <input type="text" defaultValue="Student User" className="input" />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input type="email" defaultValue="student@medicalcenter.edu" className="input" />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Notification Preferences</h2>
          <div>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span>Email notifications for appointments</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span>SMS reminders</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              <span>Health tips and updates</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="section-title">Account Security</h2>
          <div className="button-group">
            <button className="button">Change Password</button>
            <button className="secondary-button">Enable Two-Factor Auth</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="content-card">
      <h1 className="page-title">Contact Doctor</h1>
      <div className="contact-grid">
        <div>
          <div className="doctor-info-card">
            <div className="doctor-info-header">
              <div className="doctor-info-avatar">
                <User size={32} color="white" />
              </div>
              <div>
                <h3 className="doctor-info-name">Dr. Lakruwan Shanika</h3>
                <p className="doctor-info-title">General Practitioner</p>
              </div>
            </div>
            <div className="doctor-info-details">
              <p className="doctor-info-row"><strong>Office Hours:</strong> Mon-Fri 9:00 AM - 5:00 PM</p>
              <p className="doctor-info-row"><strong>Phone:</strong> +94 11 234 5678</p>
              <p className="doctor-info-row"><strong>Email:</strong> dr.shanika@medicalcenter.edu</p>
              <p className="doctor-info-row"><strong>Emergency:</strong> +94 11 911 0000</p>
            </div>
          </div>

          <div className="emergency-notice">
            <h4 className="emergency-title">Emergency Notice</h4>
            <p className="emergency-text">For medical emergencies, please call emergency services immediately or visit the nearest emergency room.</p>
          </div>
        </div>

        <div>
          <h3 className="section-title">Send a Message</h3>
          <div>
            <div className="form-group">
              <label className="label">Subject</label>
              <select className="select">
                <option>General Inquiry</option>
                <option>Appointment Request</option>
                <option>Prescription Refill</option>
                <option>Test Results</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label">Message</label>
              <textarea className="textarea" placeholder="Type your message here..."></textarea>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                <span>Mark as urgent</span>
              </label>
            </div>
            <button className="button">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'student-data': return <StudentDataPage />;
      case 'medical-requests': return <MedicalRequestsPage />;
      case 'reminders': return <RemindersPage />;
      case 'apply': return <ApplyPage />;
      case 'updates': return <UpdatesPage />;
      case 'settings': return <SettingsPage />;
      case 'contact': return <ContactPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="container">
      {/* Overlay for mobile sidebar */}
      <div
        className={`overlay ${isMobile && sidebarOpen ? 'mobile-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Header */}
      <div className="header">
        <h1 className="header-title">
          {getPageTitle()}
        </h1>
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="main-layout">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarCollapsed && !isMobile ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''} ${sidebarOpen ? 'open' : ''}`}>
          {/* Logo and Title */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-icon">
                <Home size={18} color="white" />
              </div>
              <div className="doctor-info">
                <div className="logo-text">Medical Center</div>
                <div className="logo-subtext">Student Portal</div>
              </div>
            </div>
            <button
              className="collapse-button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={16} style={{
                transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="nav">
            {/* Main Menu Section */}
            <div className="menu-section">
              <div className="menu-section-title">Main Menu</div>
              <ul className="nav-list">
                {additionalMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const isHovered = hoveredNav === item.id;

                  return (
                    <li key={item.id} className="nav-item">
                      <button
                        className={`nav-button ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActivePage(item.id);
                          setSidebarOpen(false);
                        }}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        <Icon
                          size={18}
                          color={isActive ? '#ffffff' : isHovered ? '#2073c2ff' : '#6b7280'}
                          className="nav-icon"
                        />
                        <span className="nav-label">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Current Menu Items */}
            <div className="menu-section">
              <div className="menu-section-title">Services</div>
              <ul className="nav-list">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const isHovered = hoveredNav === item.id;

                  return (
                    <li key={item.id} className="nav-item">
                      <button
                        className={`nav-button ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActivePage(item.id);
                          setSidebarOpen(false);
                        }}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        <Icon
                          size={18}
                          color={isActive ? '#ffffff' : isHovered ? '#2073c2ff' : '#6b7280'}
                          className="nav-icon"
                        />
                        <span className="nav-label">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
}