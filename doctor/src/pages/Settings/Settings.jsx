import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: 'Lakruwan saraka rishashanka',
    gender: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: ''
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', profileData);
    alert('Changes saved successfully!');
  };

  const handleSaveChangesPrimary = () => {
    console.log('Saving changes (primary):', profileData);
    alert('Changes saved successfully!');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="doctor-info">
          <span>Dr. Lakruwan Sharaka</span>
          <div className="doctor-avatar">👨‍⚕️</div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-image-section">
              <div className="profile-image">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <div className="default-avatar">
                    <div className="avatar-character">👨‍💼</div>
                  </div>
                )}
              </div>
              <div className="image-actions">
                <label htmlFor="upload-photo" className="upload-btn">
                  Upload Photo
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button className="remove-btn">Remove Photo</button>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <h2>Profile data</h2>
            
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter email address"
              />
            </div>

            <div className="button-group">
              <button 
                className="save-btn secondary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button 
                className="save-btn primary"
                onClick={handleSaveChangesPrimary}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;