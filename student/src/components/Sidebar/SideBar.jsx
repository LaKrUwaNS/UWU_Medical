import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import images from '../../assets/Image'

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');

  // Update activeItem based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveItem('dashboard');
    else if (path === '/reminders') setActiveItem('reminders');
    else if (path === '/apply-medical') setActiveItem('apply-medical');
    else if (path === '/updates') setActiveItem('updates');
    else if (path === '/settings') setActiveItem('settings');
    else if (path === '/contact-doctor') setActiveItem('contact-doctor');
    else if (path === '/view-report') setActiveItem('view-report');
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-content">
          <div className="header-icon-sidebar">
           <img className="logo" src={images.logo}alt="logo" />
          </div>
          <div className="header-text">
            <h2>Medical Center</h2>
            <p>Student Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="sidebar-content">
        {/* Main Menu */}
        <div className="menu-section">
          <h3 className="section-title">MAIN MENU</h3>
          <nav className="nav-menu">
            <Link
              to="/dashboard"
              className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <span className="nav-icon">🏠</span>
              Dashboard
            </Link>
            <Link
              to="/reminders"
              className={`nav-item ${activeItem === 'reminders' ? 'active' : ''}`}
              onClick={() => handleNavClick('reminders')}
            >
              <span className="nav-icon">🔔</span>
              Reminders
            </Link>
          </nav>
        </div>

        {/* Services */}
        <div className="menu-section">
          <h3 className="section-title">SERVICES</h3>
          <nav className="nav-menu">
            <Link
              to="/apply-medical"
              className={`nav-item ${activeItem === 'apply-medical' ? 'active' : ''}`}
              onClick={() => handleNavClick('apply-medical')}
            >
              <span className="nav-icon">➕</span>
              Apply Medical
            </Link>
            <Link
              to="/updates"
              className={`nav-item ${activeItem === 'updates' ? 'active' : ''}`}
              onClick={() => handleNavClick('updates')}
            >
              <span className="nav-icon">🔄</span>
              Updates
            </Link>
            <Link
              to="/settings"
              className={`nav-item ${activeItem === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavClick('settings')}
            >
              <span className="nav-icon">⚙️</span>
              Settings
            </Link>
            <Link
              to="/contact-doctor"
              className={`nav-item ${activeItem === 'contact-doctor' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact-doctor')}
            >
              <span className="nav-icon">📞</span>
              Contact Doctor
            </Link>
            <Link
              to="/view-report"
              className={`nav-item ${activeItem === 'view-report' ? 'active' : ''}`}
              onClick={() => handleNavClick('view-report')}
            >
              <span className="nav-icon">📋</span>
              View My Report
            </Link>
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-btn" onClick={() => console.log("Logout clicked")}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="footer-content">
          <div className="doctor-avatar">
            <span>👨‍⚕️</span>
          </div>
          <div className="doctor-info">
            <p className="doctor-name">Dr. Lakshan Dissanayaka</p>
            <p className="doctor-title">Medical Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;