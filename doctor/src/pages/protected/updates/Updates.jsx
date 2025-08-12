import React, { useState, useEffect } from "react";
import "./Updates.css";
import BlogCard from "../../../components/BlogCard/BlogCard";
import AddNotePopup from "../../../components/AddNotePopup/AddNotePopup";
import { Toaster, toast } from "react-hot-toast";
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

const BASE_URL = "http://localhost:5000/doctor";

const Updates = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/articles`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setBlogs(data.data);
        } else {
          console.error("Error fetching articles:", data.message);
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRead = (id) => {
    fetch(`${BASE_URL}/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article details");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSelectedArticle(data.data);
        } else {
          toast.error(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Read error:", err);
        toast.error("Failed to fetch article content");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    fetch(`${BASE_URL}/articles/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete article");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setBlogs((prev) => prev.filter((blog) => blog._id !== id));
          toast.success("Article deleted successfully");
        } else {
          toast.error(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete article");
      });
  };

  const handleNewAdd = () => {
    setShowAddNotePopup(true);
  };

  const handleSaveNote = (noteData) => {
    const formData = new FormData();
    formData.append("title", noteData.title);
    formData.append("content", noteData.description);

    fetch(`${BASE_URL}/articles`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create article");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setBlogs((prev) => [data.data, ...prev]);
          alert("Article created successfully");
          setShowAddNotePopup(false);
        } else {
          toast.error(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Create error:", err);
        toast.error("Failed to create article");
      });
  };

  return (
    <div className="updates-page">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="updates-header">
        <h2>Notes already Submitted</h2>
        <button className="add-btn" onClick={handleNewAdd}>
          New Add
        </button>
      </header>

      {loading ? (
        <p><Loadinganimate /></p>
      ) : (
        <div className="blog-list">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              image={blog.photo}
              title={blog.title}
              onRead={() => handleRead(blog._id)}
              onDelete={() => handleDelete(blog._id)}
            />
          ))}
        </div>
      )}

      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedArticle.title}</h2>
            <img
              src={selectedArticle.photo}
              alt={selectedArticle.title}
              className="modal-image"
            />
            <p>{selectedArticle.content}</p>
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <AddNotePopup
        isOpen={showAddNotePopup}
        onClose={() => setShowAddNotePopup(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Updates;
