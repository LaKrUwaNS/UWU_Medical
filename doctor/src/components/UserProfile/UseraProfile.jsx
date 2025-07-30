import React from "react";
import './UserProfile.css';

const UserProfile = ({ name, image }) => {
  return (
    <div className="user-profile">
      <span className="user-name">{name}</span>
      <div className="profile-img-wrapper">
        <img src={image} alt="Profile" className="profile-img" />
        <span className="status-dot"></span>
      </div>
    </div>
  );
};

export default UserProfile;