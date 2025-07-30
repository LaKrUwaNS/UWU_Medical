import React from 'react'
import './warning.css';
import warningIcon from '../../../assets/Popups/warning.png'; 


export default function warning() {
  return (
    <div className='warning-popup'>
         <img src={warningIcon} alt="Warning Icon" className="warning-icon" /> 
      
      <span className="warning-text">This can Delete Your User</span>
    </div>
  )
}
