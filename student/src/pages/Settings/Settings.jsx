import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: 'Sophia',
    lastName: 'Carter',
    email: 'sophia.carter@university.edu',
    phoneNumber: '+1 (555) 123-4567',
    universityId: 'UC2024001',
    bloodType: 'A+',
    mentalHealthConditions: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactNumber: ''
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Settings saved:', formData);
    setIsEditing(false);
    alert('✅ Settings saved successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        {/* Header */}
        <div className="settings-header">
          <div className="header-content">
            <h1>Account Settings</h1>
            <p>Manage your profile and medical information</p>
          </div>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '👁️ View Mode' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-avatar">
            <span>SC</span>
          </div>
          <div className="profile-info">
            <h2>{formData.firstName} {formData.lastName}</h2>
            <p className="student-info">🎓 Medical Student</p>
            <p className="student-id">ID: {formData.universityId}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile Info
          </button>
          <button 
            className={`tab ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            🏥 Medical Info
          </button>
          <button 
            className={`tab ${activeTab === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            🚨 Emergency
          </button>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {activeTab === 'profile' && (
            <div className="form-section">
              <h3 className="section-title">📋 Personal Information</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>📧 Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>📱 Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="form-section">
              <h3 className="section-title">🩺 Medical Information</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>🩸 Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-select"
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
                <div className="input-group full-width">
                  <label>🧠 Mental Health Conditions</label>
                  <textarea
                    name="mentalHealthConditions"
                    value={formData.mentalHealthConditions}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Any mental health conditions or concerns..."
                    className="form-textarea"
                  />
                </div>
                <div className="input-group full-width">
                  <label>⚠️ Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Food, medication, or environmental allergies..."
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="form-section">
              <h3 className="section-title">🚨 Emergency Contact</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>👤 Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Emergency contact full name"
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>📞 Contact Number</label>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Emergency contact phone number"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="button-group">
            <button className="save-button" onClick={handleSubmit}>
              💾 Save Changes
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;