import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SlideBar.css";
import images from "../../assets/Image";

function SlideBar({ isCollapsed, onToggle, onLogout }) {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    {
      section: "Main Menu",
      items: [
        { to: "/dashboard", icon: images.dashboard, text: "Dashboard", id: "dashboard" },
        { to: "/student-records", icon: images.studentData, text: "Students Data", id: "students" },
        { to: "/medical-requests", icon: images.medicalReq, text: "Medical Requests", id: "medical-requests" },
        { to: "/reminder", icon: images.reminders, text: "Reminders", id: "reminder" },
        { to: "/updates", icon: images.updates, text: "Updates", id: "updates" }
      ]
    },
    {
      section: "Management",
      items: [
        { to: "/medicine-data", icon: images.medicineData, text: "Medicine Data", id: "medicine-data" },
        { to: "/staff", icon: images.staff, text: "Staff", id: "staff" },
        { to: "/reports", icon: images.reports, text: "Reports", id: "reports" },
        { to: "/settings", icon: images.settings, text: "Settings", id: "settings" }
      ]
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // trigger logout function passed from parent
    } else {
      console.log("Logout clicked");
      // Example: clear token & redirect
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className={`Sidebar ${isCollapsed ? "collapsed" : ""} ${mounted ? "mounted" : ""}`}>
      {/* Logo Section */}
      <div className="header">
        <img 
          className="slideBar-logo" 
          src={images.logo} 
          alt="Medical Center Logo" 
          loading="lazy"
        />
        {!isCollapsed && (
          <div className="medical-center">
            Medical Center
          </div>
        )}
      </div>

      {/* Menu Section */}
      <nav className="menu-section" role="navigation" aria-label="Main navigation">
        {menuItems.map((section, sectionIndex) => (
          <div key={section.section} className="menu-group">
            {!isCollapsed && (
              <div className="menu-title" role="heading" aria-level="2">
                {section.section}
              </div>
            )}
            
            {section.items.map((item, itemIndex) => (
              <Link
                key={item.id}
                to={item.to}
                className={`menu-item ${isActiveRoute(item.to) ? "active" : ""}`}
                aria-label={item.text}
                title={isCollapsed ? item.text : ""}
                style={{
                  animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s`
                }}
              >
                <img 
                  className="iconimg" 
                  src={item.icon} 
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
                {!isCollapsed && (
                  <span className="text">{item.text}</span>
                )}
                {isActiveRoute(item.to) && !isCollapsed && (
                  <div className="active-indicator" aria-hidden="true" />
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Logout Button */}
        <button 
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
        >
          <img 
            className="iconimg" 
            src={images.logout} // <-- Add logout icon to your images.js
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          {!isCollapsed && <span className="text">Logout</span>}
        </button>

        {/* Toggle Button */}
        <button 
          className="toggle-btn" 
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          type="button"
        >
          <img 
            className="toggle-icon" 
            src={images.toggle} 
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
}

export default SlideBar;
