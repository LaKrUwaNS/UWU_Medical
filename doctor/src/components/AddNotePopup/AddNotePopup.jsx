import React, { useState, useRef } from 'react';
import './AddNotePopup.css';
import images from "../../assets/images";
import UserProfile from "../UserProfile/UseraProfile";

const AddNotePopup = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedImage(null);
    setImagePreview(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleOk = async () => {
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Title and Description are required.');
      return;
    }
    if (!selectedImage) {
      setErrorMsg('Please upload an image.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      formData.append("tags", JSON.stringify([]));
      formData.append("photo", selectedImage);

      const res = await fetch("http://localhost:5000/doctor/articles/create", {
        method: "POST",
        credentials: "include", // send cookies if using cookie-based auth
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to create article: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        console.log("Article created:", data.data);
        resetForm();
        onClose();
      } else {
        setErrorMsg(data.message || 'Failed to create article.');
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrorMsg(err.message || 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);

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
                      <span>Click to Upload Image <br></br>(maximum size 5Mb) </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </div>

        <div className="popup-actions">
          <button className="cancel-btn" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
          <button className="ok-btn" onClick={handleOk} disabled={loading}>
            {loading ? 'Saving...' : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotePopup;
