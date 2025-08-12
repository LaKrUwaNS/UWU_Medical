import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const initialProfileData = {
    userName: '',
    fullName: '',
    mobileNumber: '',
    personalEmail: '',
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch doctor settings on component mount
  useEffect(() => {
    const fetchDoctorSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/doctor/settings', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (json.success) {
          const data = json.data;
          setProfileData({
            userName: data.userName || '',
            fullName: data.fullName || '',
            mobileNumber: data.mobileNumber || '',
            personalEmail: data.personalEmail || '',
          });

          if (data.photo) {
            setProfileImage(data.photo);
          } else {
            setProfileImage(null);
          }
        } else {
          alert(`Error: ${json.message}`);
        }
      } catch (err) {
        alert('Failed to fetch doctor settings.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchDoctorSettings();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setProfileImage(null);
    setImageFile(null);
  };

  // Save changes (PATCH)
  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', profileData.fullName);
      formData.append('phone', profileData.mobileNumber);
      formData.append('email', profileData.personalEmail);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('http://localhost:5000/doctor/settings', {
        method: 'PATCH',
        // IMPORTANT: Do NOT set Content-Type header with FormData
        body: formData,
        credentials: 'include', // if your backend uses cookies/session
      });

      const json = await res.json();

      if (json.success) {
        alert('Doctor data updated successfully');
        const data = json.data;
        setProfileData({
          userName: data.userName || '',
          fullName: data.fullName || '',
          mobileNumber: data.mobileNumber || '',
          personalEmail: data.personalEmail || '',
        });
        setProfileImage(data.photo || null);
        setImageFile(null);
      } else {
        alert(`Update failed: ${json.message}`);
      }
    } catch (err) {
      alert('Failed to update doctor settings.');
      console.error(err);
    }

    setLoading(false);
  };

  // Cancel changes resets to last loaded data
  const handleCancel = () => {
    setLoading(true);
    fetch('http://localhost:5000/doctor/settings', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const data = json.data;
          setProfileData({
            userName: data.userName || '',
            fullName: data.fullName || '',
            mobileNumber: data.mobileNumber || '',
            personalEmail: data.personalEmail || '',
          });
          setProfileImage(data.photo || null);
          setImageFile(null);
        } else {
          alert(`Error: ${json.message}`);
        }
      })
      .catch((err) => {
        alert('Failed to reset data.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="profile-page">
      <div className="profile-header-settings"></div>

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
                <button className="remove-btn" onClick={handleRemovePhoto}>
                  Remove Photo
                </button>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <h2>Profile data</h2>

            <div className="form-group">
              <label>UserName</label>
              <input
                type="text"
                name="userName"
                value={profileData.userName}
                readOnly
                className="form-input"
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label>FullName</label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your Fullname"
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
              <label>Personal Email</label>
              <input
                type="email"
                name="personalEmail"
                value={profileData.personalEmail}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter personal email address"
              />
            </div>

            <div className="button-group">
              <button className="save-btn cancel" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
              <button className="save-btn primary" onClick={handleSaveChanges} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
