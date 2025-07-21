import React from 'react';
import './UploadProfile.css'

function UploadProfile() {
  return (
    <div className='popup-overlay'>
        <div className="popup-box">
            <div className="drop-area">
                <p className="drop-text">DRAG & DROP</p>
                <p className="drop-subtext">YOUR IMAGE HERE</p>
               

            </div>
            <p className='instruction-text'>
                You Can Upload Yor Photo Here. Make sure the image is clear and recent.

            </p>
            <button className='skip-button' onclick={onClose}>
                Skip
            </button>
        </div>

    </div>
  )
}

export default UploadProfile