import React from "react";
import './Slidebar.css';
import { NavLink } from "react-router-dom";
import {
  FaNotesMedical,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaUserGraduate
 

} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import logo from '../../assets/SlideBar/Logo.svg';


export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logo} alt="Medical Center" className="logo-img" />
        <div className="logo-text">
          <h4>Medical Center</h4>
          <p>Staff Portal</p>
        </div>
      </div>

      {/* Menu Section */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/medical-requests" activeclassname="active">
            <FaNotesMedical /> Medical Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/medical-reports" activeclassname="active">
            <FaFileMedical /> Medical Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/prescription" activeclassname="active">
            <FaPrescriptionBottleAlt /> Prescription
          </NavLink>
        </li>
        <li>
          <NavLink to="/student-records" activeclassname="active">
            <FaUserGraduate /> Student Records
          </NavLink>
        </li>
      </ul>

      {/* User Section */}
      <div className="sidebar-user-logout">
        <BiLogOut /> Logout
  
        
      </div>
      <div className="sidebar-user">
        <img src="/staff.png" alt="staff" className="user-img" />
        <p>Mr.A.M.S.K.T. Aththanayaka</p>
      </div>

      










    </div>
  );
}
