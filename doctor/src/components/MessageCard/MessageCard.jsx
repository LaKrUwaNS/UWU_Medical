import React from 'react';
import './MessageCard.css';

function MessageCard({ type, id, content, urgent, read, onDelete, onMarkRead }) {
  const cardClass = `
    message-card 
    ${type === "Important" ? "important-card" : "article-card"} 
    ${read ? "read-card" : ""}
  `;

  return (
    <div className={cardClass}>
      <div className="message-card-header">
        <span className="message-type">
          {type} {urgent && <span className="urgent-badge">URGENT</span>}
        </span>
        <span className="student-id">{id}</span>
      </div>

      <p className="message-content">{content}</p>

      <div className="card-buttons">
        <button className="delete-btn" onClick={onDelete}>Delete</button>
        {!read && (
          <button className="read-btn" onClick={onMarkRead}>
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageCard;
