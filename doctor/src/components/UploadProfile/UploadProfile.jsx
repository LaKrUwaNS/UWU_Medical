import React, { useState } from 'react';
import './UploadProfile.css';

function UploadProfile({ onClose }) {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      console.log("Dropped image:", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      console.log("Selected image:", file);
    }
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-box'>
        <div
          className='drop-area'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <p className="drop-text">DRAG & DROP</p>
          <p className="drop-subtext">YOUR IMAGE HERE</p>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        <p className='instruction-text'>
          You can upload your photo here. Make sure the image is clear and recent.
        </p>

        <button className='skip-button' onClick={onClose}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default UploadProfile;
