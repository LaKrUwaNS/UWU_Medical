import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    universityId: '',
    bloodType: '',
    mentalHealthConditions: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      universityId: '',
      bloodType: '',
      mentalHealthConditions: '',
      allergies: '',
      emergencyContactName: '',
      emergencyContactNumber: ''
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-header">
          <h1>Settings</h1>
          <button className="close-btn">×</button>
        </div>

        <div className="profile-section">
          <div className="profile-avatar">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>Sophia Carter</h2>
            <p>Student</p>
          </div>
        </div>

        <div className="settings-form">
          <div className="form-section">
            <h3>Profile Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>University ID</label>
                <input
                  type="text"
                  name="universityId"
                  value={formData.universityId}
                  onChange={handleInputChange}
                  placeholder="Enter university ID"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Medical Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mental Health Conditions</label>
                <textarea
                  name="mentalHealthConditions"
                  value={formData.mentalHealthConditions}
                  onChange={handleInputChange}
                  placeholder="Enter any mental health conditions"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Enter any allergies"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact Number</label>
                <input
                  type="tel"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact number"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="save-btn" onClick={handleSubmit}>
            Save changes
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;