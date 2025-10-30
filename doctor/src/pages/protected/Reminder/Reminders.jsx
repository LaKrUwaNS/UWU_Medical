import React, { useState, useEffect } from 'react';
import MessageCard from '../../../components/MessageCard/MessageCard';
import './Reminders.css';
import { Toaster, toast } from 'react-hot-toast';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

function Reminders() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchReminders = async () => {
    try {
      const res = await fetch("http://localhost:5000/doctor/reminders", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.data);
      } else {
        toast.error(data.message || "Failed to fetch reminders");
      }
    } catch (err) {
      console.error("Error fetching reminders:", err);
      toast.error("Error fetching reminders");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/doctor/reminders/${id}/read`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Marked as read");
        fetchReminders();
      } else {
        toast.error(data.message || "Failed to mark as read");
      }
    } catch (err) {
      console.error("Error marking as read:", err);
      toast.error("Error marking as read");
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/doctor/reminders/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Reminder deleted");
        setMessages(prev => prev.filter(msg => msg._id !== id));
      } else {
        toast.error(data.message || "Failed to delete reminder");
      }
    } catch (err) {
      console.error("Error deleting reminder:", err);
      toast.error("Error deleting reminder");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="messages-page">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="top-bar">
        <h2>Reminders From Students</h2>
      </header>

      {loading ? (
        <p><Loadinganimate /></p>
      ) : messages.length === 0 ? (
        <p>No reminders found.</p>
      ) : (
        <div className="message-grid">
          {messages.map(msg => (
            <MessageCard
              key={msg._id}
              type={msg.type}
              id={msg.sender?.indexNumber || "Unknown"}
              content={msg.content}
              urgent={msg.urgent}
              read={msg.Read}
              onDelete={() => handleDelete(msg._id)}
              onMarkRead={() => handleMarkAsRead(msg._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reminders;
