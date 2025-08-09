import React, { useState, useEffect } from "react";
import "./Updates.css";
import BlogCard from "../../../components/BlogCard/BlogCard";
import UserProfile from "../../../components/UserProfile/UseraProfile";

const BASE_URL = "http://localhost:5000/doctor";

const Updates = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch all articles
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
          alert(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Read error:", err);
        alert("Failed to fetch article content");
      });
  };

  // Handle Delete Function 
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
          alert("Article deleted successfully");
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete article");
      });
  };

  return (
    <div className="updates-page">
      <div className="user"><UserProfile /></div>

      <header className="updates-header">
        <h2>Notes already Submitted</h2>
        <button className="add-btn">New Add</button>
      </header>

      {loading ? (
        <p>Loading articles...</p>
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

      {/* Popup message modal  */}
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
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updates;
