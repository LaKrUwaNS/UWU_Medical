import React from 'react';
import './MessageCard.css';

function MessageCard({ type, id, content, onDelete, onMarkRead }) {
  const cardClass = type === "Massage" ? "massage-card" : "article-card";

  return (
    <div className={`message-card ${cardClass}`}>
      <div className="message-card-header">
        <span className="message-type">{type}</span>
        <span className="student-id">{id}</span>
      </div>
      <p className="message-content">{content}</p>
      <div className="card-buttons">
        <button className="delete-btn" onClick={onDelete}>Delete</button>
        <button className="read-btn" onClick={onMarkRead}>Mark as Read</button>
      </div>
    </div>
  );
}

export default MessageCard;
