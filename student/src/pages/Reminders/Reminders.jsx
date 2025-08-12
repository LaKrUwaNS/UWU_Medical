import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Reminders.css';

const Reminders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reminders = [
    {
      id: 1,
      title: "Free Medical Check-up This Friday",
      description: "All students are invited for a free check-up at the medical center 9 AM - 5 PM",
      category: "Event",
      type: "event",
      illustration: "doctor"
    },
    {
      id: 2,
      title: "Flu Shot Clinic",
      description: "Get your annual flu shot at the clinic, open until 6 PM today.",
      category: "Urgent",
      type: "urgent",
      illustration: "nurse"
    },
    {
      id: 3,
      title: "Health and Wellness Workshop",
      description: "Join our workshop on maintaining a healthy lifestyle. 2 PM - 3 PM",
      category: "General",
      type: "general",
      illustration: "wellness"
    }
  ];

  const filteredReminders = reminders.filter(reminder =>
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <h1 className="reminders-title">Reminders</h1>
        <p className="reminders-subtitle">
          Stay updated with important announcements and reminders from the Medical Center
        </p>
      </div>

      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search reminders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="special-notices">
        <h2 className="section-title">Special Notices</h2>
        
        <div className="reminders-list">
          {filteredReminders.map((reminder) => (
            <div key={reminder.id} className={`reminder-card ${reminder.type}`}>
              <div className="reminder-content">
                <h3 className="reminder-title">{reminder.title}</h3>
                <p className="reminder-description">{reminder.description}</p>
                <span className={`category-tag ${reminder.type}`}>
                  {reminder.category}
                </span>
              </div>
              
              <div className="reminder-illustration">
                {reminder.illustration === 'doctor' && (
                  <div className="illustration doctor-illustration">
                    <div className="doctor-figure">
                      <div className="doctor-head"></div>
                      <div className="doctor-body"></div>
                      <div className="doctor-coat"></div>
                      <div className="clipboard"></div>
                    </div>
                  </div>
                )}
                
                {reminder.illustration === 'nurse' && (
                  <div className="illustration nurse-illustration">
                    <div className="nurse-figure">
                      <div className="nurse-head"></div>
                      <div className="nurse-body"></div>
                      <div className="nurse-uniform"></div>
                      <div className="syringe"></div>
                    </div>
                  </div>
                )}
                
                {reminder.illustration === 'wellness' && (
                  <div className="illustration wellness-illustration">
                    <div className="wellness-figure">
                      <div className="person-head"></div>
                      <div className="person-body"></div>
                      <div className="apple"></div>
                      <div className="leaf"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminders;