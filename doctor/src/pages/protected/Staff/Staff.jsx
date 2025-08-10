import React, { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import './Staff.css';
import images from '../../../assets/images';
import UserProfile from '../../../components/UserProfile/UseraProfile';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('http://localhost:5000/doctor/staff', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        if (result.success && result.data && result.data.staff) {
          setStaffData(result.data.staff);
        }
      } catch (err) {
        console.error('Error fetching staff:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const filteredStaff = staffData.filter((staff) => {
    const staffId = staff.id || '';
    const name = staff.name || '';
    const jobTitle = staff.jobTitle || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffId.includes(searchTerm) ||
      jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="medical-staff-directory">
      <div className="header-section">
        <div className="title-section">
          <div className="title-text">
            <h1>Medical Staff Directory</h1>
            <p>Find a Staff Member by Name</p>
          </div>
          <div className="user-info">
            <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
          </div>
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

      {loading ? (
        <div className="loading-wrapper">
          <Loadinganimate />
        </div>
      ) : (
        <div className="table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Staff_ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.id || 'N/A'}</td>
                  <td>{staff.name || 'N/A'}</td>
                  <td>{staff.mobileNumber || 'N/A'}</td>
                  <td>
                    <span className="role-badge">{staff.jobTitle || 'N/A'}</span>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Staff;
