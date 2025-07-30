import React, { useState } from 'react';
import MessageCard from '../../../components/MessageCard/MessageCard';
import './Reminders.css';

function Reminders() {
  const [activeTab, setActiveTab] = useState("Massages");

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "Massage",
      studentId: "UWU/ICT/22/064",
      content: "I would like to request an appointment for a check-up..."
    },
    {
      id: 2,
      type: "Article",
      studentId: "UWU/ICT/22/064",
      content: "I would like to request an appointment for a check-up..."
    },
    // Add more as needed
  ]);

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleMarkAsRead = (id) => {
    alert(`Marked message ID ${id} as read!`);
    // You could move it to a "read" state or change status
  };

  return (
    <div className="messages-page">
      <header className="top-bar">
        <h2>Massages From Students</h2>
        <div className="tabs">
          <button className={activeTab === "Massages" ? "tab active" : "tab"} onClick={() => setActiveTab("Massages")}>Massages</button>
          <button className={activeTab === "Read" ? "tab active" : "tab"} onClick={() => setActiveTab("Read")}>Read</button>
        </div>
        <div className="profile">
          <img src="/images/profile.png" alt="Profile" />
        </div>
      </header>

      <div className="message-grid">
        {messages.map(msg => (
          <MessageCard
            key={msg.id}
            type={msg.type}
            id={msg.studentId}
            content={msg.content}
            onDelete={() => handleDelete(msg.id)}
            onMarkRead={() => handleMarkAsRead(msg.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Reminders;
