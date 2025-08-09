import React, { useState, useRef } from 'react';
import './AddNotePopup.css';
import images from "../../assets/images";
import UserProfile from "../UserProfile/UseraProfile";

const AddNotePopup = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleOk = () => {
    if (title.trim() || description.trim()) {
      onSave({ 
        title, 
        description, 
        image: selectedImage 
      });
      setTitle('');
      setDescription('');
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Only render when open
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <div className="popup-title">
            ADD NEW NOTE
          </div>
          <div className="popup-subtitle">
            This note will be added for this academic year as registered in the system of our LMU Medical center.
          </div>
          <div className="user-info">
            <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
          </div>
        </div>

        <div className="popup-content">
          <div className="form-section">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
            
            <div className="content-section">
              <textarea
                placeholder="Enter the Description of the Note"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-textarea"
              />
              
              <div className="image-upload-section">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                
                <div 
                  className={`image-placeholder ${imagePreview ? 'has-image' : ''}`}
                  onClick={handleImageClick}
                >
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="image-preview"
                      />
                      <button 
                        className="remove-image-btn"
                        onClick={handleRemoveImage}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📷</div>
                      <span>Click to Upload Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="popup-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="ok-btn" onClick={handleOk}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotePopup;