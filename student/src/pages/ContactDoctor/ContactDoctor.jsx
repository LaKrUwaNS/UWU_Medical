import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import './ContactDoctor.css';

const ContactDoctor = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { subject, content });
  };

  const handleCancel = () => {
    setSubject('');
    setContent('');
  };

  return (
    <div className="contact-doctor-container">
      <div className="contact-form-section">
        <h1 className="title">Contact the Doctor</h1>
        <p className="description">
          This message has been sent to you with all the 
          medical details. Please respond this because what 
          you can help the patient.
        </p>
        
        <div className="contact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="subject-input"
            />
          </div>
          
          <div className="form-group">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-textarea"
              rows="8"
            />
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-btn"
            >
              CANCEL
            </button>
            <button 
              type="button" 
              onClick={() => {
                setSubject('');
                setContent('');
                console.log('Form submitted:', { subject, content });
              }}
              className="send-btn"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      <div className="doctor-section">
        <div className="doctor-image-container">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=400&fit=crop&crop=face"
            alt="Doctor" 
            className="doctor-image"
          />
          <div className="stethoscope"></div>
        </div>
        
        <div className="email-notification">
          <Mail className="mail-icon" />
          <span className="notification-badge">1</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDoctor;