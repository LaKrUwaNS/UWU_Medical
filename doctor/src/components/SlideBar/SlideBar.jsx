import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SlideBar.css";
import images from "../../assets/Image";

function SlideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header */}
       <img className="logo" src={images.logo} alt="logo" />
     
      <div className="header">
        
        {!isCollapsed && <div className="medical-center">Medical Center</div>}
      </div>

      {/* Menu */}
      <div className="menu-section">
        {!isCollapsed && <div className="menu-title">Main Menu</div>}

        <Link to="/dashboard" className="menu-item">
          <img className="iconimg" src={images.dashboard} alt="Dashboard" />
          {!isCollapsed && <span className="text">Dashboard</span>}
        </Link>

        <Link to="/students/1" className="menu-item">
          <img className="iconimg" src={images.studentData} alt="Student Data" />
          {!isCollapsed && <span className="text">Student Data</span>}
        </Link>

        <Link to="/medical-requests" className="menu-item">
          <img className="iconimg" src={images.medicalReq} alt="Medical Requests" />
          {!isCollapsed && <span className="text">Medical Requests</span>}
        </Link>

        <Link to="/reminder" className="menu-item">
          <img className="iconimg" src={images.reminders} alt="Reminders" />
          {!isCollapsed && <span className="text">Reminders</span>}
        </Link>

        <Link to="/updates" className="menu-item">
          <img className="iconimg" src={images.updates} alt="Updates" />
          {!isCollapsed && <span className="text">Updates</span>}
        </Link>

        {!isCollapsed && <div className="menu-title">Second Menu</div>}

        <Link to="/medicine-data" className="menu-item">
          <img className="iconimg" src={images.medicineData} alt="Medicine Data" />
          {!isCollapsed && <span className="text">Medicine Data</span>}
        </Link>

        <Link to="/staff" className="menu-item">
          <img className="iconimg" src={images.staff} alt="Staff" />
          {!isCollapsed && <span className="text">Staff</span>}
        </Link>

        <Link to="/reports" className="menu-item">
          <img className="iconimg" src={images.reports} alt="Reports" />
          {!isCollapsed && <span className="text">Reports</span>}
        </Link>

        <Link to="/settings" className="menu-item">
          <img className="iconimg" src={images.settings} alt="Settings" />
          {!isCollapsed && <span className="text">Settings</span>}
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="bottom-section">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <img className="toggle-icon" src={images.toggle} alt="Toggle" />
        </button>
      </div>
    </div>
  );
}

export default SlideBar;
