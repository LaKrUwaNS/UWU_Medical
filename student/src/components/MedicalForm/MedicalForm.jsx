import React, { useState } from 'react';
import './MedicalForm.css';

function MedicalForm() {
  const [formData, setFormData] = useState({
    reason: '',
    symptoms: '',
    history: '',
    date: '',
    time: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Medical request submitted successfully!');
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        {/* Header */}
        <div className="form-header">
          <div className="header-icon">
            <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="form-title">Medical Request</h2>
          <p className="form-subtitle">Please fill out the information below to schedule your appointment</p>
        </div>

        <div className="form-content">
          {/* Reason for Visit */}
          <div className="field-group">
            <label htmlFor="reason" className="field-label">
              Reason For Visit <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select 
                id="reason" 
                name="reason" 
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select your reason</option>
                <option value="headache">Headache</option>
                <option value="fever">Fever</option>
                <option value="checkup">Regular Checkup</option>
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up Visit</option>
                <option value="emergency">Emergency</option>
              </select>
              <div className="select-arrow">
                <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="field-group">
            <label htmlFor="symptoms" className="field-label">
              Describe Your Symptoms <span className="required">*</span>
            </label>
            <textarea 
              id="symptoms" 
              name="symptoms" 
              value={formData.symptoms}
              onChange={handleInputChange}
              rows="4" 
              required
              placeholder="Please describe your symptoms in detail..."
              className="form-textarea"
            />
          </div>

          {/* Medical History */}
          <div className="field-group">
            <label htmlFor="history" className="field-label">
              Medical History
            </label>
            <textarea 
              id="history" 
              name="history" 
              value={formData.history}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any relevant medical history, current medications, allergies..."
              className="form-textarea"
            />
          </div>

          {/* Preferred Time Slot */}
          <div className="field-group">
            <label className="field-label">
              Preferred Time Slot <span className="required">*</span>
            </label>
            <div className="timeslot-grid">
              <div className="timeslot-item">
                <label htmlFor="date" className="timeslot-label">
                  Date
                </label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="timeslot-item">
                <label htmlFor="time" className="timeslot-label">
                  Time
                </label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button 
              onClick={handleSubmit}
              className="submit-btn"
            >
              <div className="submit-content">
                <svg className="submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Submit Medical Request</span>
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <div className="footer-note">
            <p>🔒 Your medical information is secure and confidential</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalForm;