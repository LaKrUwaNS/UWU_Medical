import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import './Staff.css';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staffData = [
    {
      staffId: '102030',
      name: 'N.M.Lakruwan Sharaka',
      contact: '0761234567',
      role: 'Pharmacist'
    },
    {
      staffId: '102032',
      name: 'R.P.Chamila Nirmal',
      contact: '0761234567',
      role: 'Cleaning'
    },
    {
      staffId: '102030',
      name: 'N.M.Lakruwan Sharaka',
      contact: '0761234567',
      role: 'Assistant Pharmacist'
    }
  ];

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.staffId.includes(searchTerm) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medical-staff-directory">
      <div className="header-section">
        <div className="title-section">
          <h1>Medical Staff Directory</h1>
          <p>Find a Staff Member by Name</p>
        </div>

        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-icon">
              <Users size={24} />
            </div>
            <div className="stats-info">
              <p>All Staff Members</p>
              <span className="stats-number">{filteredStaff.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="search-section-staff">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
              id="staff-search"
              name="staffSearch"
              type="text"
              placeholder="Search Staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
        </div>
      </div>

      <div className="table-container">
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
            {filteredStaff.map((staff, index) => (
              <tr key={index}>
                <td>{staff.staffId}</td>
                <td>{staff.name}</td>
                <td>{staff.contact}</td>
                <td>
                  <span className="role-badge">{staff.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
