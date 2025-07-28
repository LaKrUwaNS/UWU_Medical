import React from "react";
import './UserProfile.css';
import images from "../../assets/images";


const UserProfile = () => {
    return(
        <div className="user-profile">
      <span className="user-name">Dr. Lakruwan Sharaka</span>
      <div className="profile-img-wrapper">
        <img src={images.lakruwan} alt="Profile" className="profile-img" />
        <span className="status-dot"></span>
      </div>
    </div>
    );
};
export default UserProfile;