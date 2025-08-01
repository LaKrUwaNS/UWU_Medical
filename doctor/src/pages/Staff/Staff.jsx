import React from 'react';
import './Staff.css';

const staffData = [
  { id: '102030', name: 'N.M.Lakruwan Sharaka', contact: '0761234567', role: 'Pharmacist' },
  { id: '102030', name: 'N.M.Lakruwan Sharaka', contact: '0761234567', role: 'Cleaning' },
  { id: '102030', name: 'N.M.Lakruwan Sharaka', contact: '0761234567', role: 'Assistent Phramasist' },
];

const Staff = () => {
  return (
    <div className="directory-container">
      <header className="directory-header">
        <div>
          <h1>Medical Staff Directory</h1>
          <p>Find a Staff Member By Name</p>
        </div>
        <div className="profile-section">
          <p>Dr. Lakruwan Sharaka</p>
          <img src="/profile.png" alt="Profile" className="profile-img" />
        </div>
      </header>

      <div className="summary-box">
        <h3>All Staff Members</h3>
        <div className="count-box">
          <p>2</p>
        </div>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search About Student"
      />

      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff_ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.contact}</td>
              <td>{staff.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
