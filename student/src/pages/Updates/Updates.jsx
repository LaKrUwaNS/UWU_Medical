import React, { useState } from 'react';
import './Updates.css';

const Updates = () => {
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const updates = [
    {
      id: 1,
      title: "When using lecture halls",
      image: "/api/placeholder/300/200",
      category: "Guidelines",
      description: "Important guidelines for maintaining health and safety while using lecture halls. Follow these recommendations to ensure a safe learning environment for everyone."
    },
    {
      id: 2,
      title: "Use masks when you Sick",
      image: "/api/placeholder/300/200",
      category: "Health Protocol",
      description: "Essential information about proper mask usage when you're feeling unwell. Protect yourself and others by following these health protocols."
    },
    {
      id: 3,
      title: "Nutrition & Fitness",
      image: "/api/placeholder/300/200",
      category: "Wellness",
      description: "Comprehensive guide to maintaining proper nutrition and fitness levels as a student. Learn about healthy eating habits and exercise routines."
    },
    {
      id: 4,
      title: "When using lecture halls",
      image: "/api/placeholder/300/200",
      category: "Guidelines",
      description: "Additional guidelines for lecture hall usage including seating arrangements, ventilation, and cleanliness protocols."
    },
    {
      id: 5,
      title: "Use masks when you Sick",
      image: "/api/placeholder/300/200",
      category: "Health Protocol",
      description: "Updated mask-wearing guidelines for students who are experiencing symptoms or feeling unwell."
    },
    {
      id: 6,
      title: "Nutrition & Fitness",
      image: "/api/placeholder/300/200",
      category: "Wellness",
      description: "Advanced nutrition tips and fitness recommendations specifically designed for university students' busy lifestyle."
    },
    {
      id: 7,
      title: "Sexual heath",
      image: "/api/placeholder/300/200",
      category: "Health Education",
      description: "Important information about sexual health, safety, and wellness for university students. Confidential resources and guidelines."
    },
    {
      id: 8,
      title: "Are You know about your Health",
      image: "/api/placeholder/300/200",
      category: "Health Awareness",
      description: "Self-assessment guide to help you understand your current health status and identify areas that need attention."
    },
    {
      id: 9,
      title: "What need to do in sunny days",
      image: "/api/placeholder/300/200",
      category: "Seasonal Health",
      description: "Health tips and precautions to take during hot, sunny weather. Stay safe and healthy during extreme weather conditions."
    }
  ];

  const openModal = (update) => {
    setSelectedUpdate(update);
  };

  const closeModal = () => {
    setSelectedUpdate(null);
  };

  return (
    <div className="student-updates-container">
      {/* Header */}
      

      {/* Page Title */}
      <div className="page-title">
        <h2>Health & Wellness Updates</h2>
        <p className="subtitle">Stay informed with the latest health guidelines and wellness tips</p>
      </div>

      {/* Updates Grid */}
      <div className="updates-grid">
        {updates.map((update) => (
          <div key={update.id} className="update-card">
            <div className="card-image">
              <img src={update.image} alt={update.title} />
              <div className="card-overlay">
                <h3 className="card-title">{update.title}</h3>
              </div>
            </div>
            <div className="card-actions">
              <button 
                className="read-btn"
                onClick={() => openModal(update)}
              >
                Read
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for reading updates */}
      {selectedUpdate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedUpdate.title}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <img src={selectedUpdate.image} alt={selectedUpdate.title} className="modal-image" />
              <div className="modal-info">
                <span className="modal-category">{selectedUpdate.category}</span>
                <p className="modal-description">{selectedUpdate.description}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updates;