import React from 'react';
import './BlogCard.css';

function BlogCard({ image, title, onRead, onDelete }) {
  // Provide a fallback image if `image` is empty or undefined
  const imageSrc = image && image.trim() !== '' ? image : '/Defaultimg.png';

  return (
    <div className='blog-card'>
      <img src={imageSrc} alt={title || 'Blog image'} className='blog-image' />

      <div className="blog-content">
        <h3>{title || 'Untitled Blog'}</h3>
        <div className="blog-buttens">
          <button className='read-btn' onClick={onRead}>Read</button>
          <button className='delete-btn' onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
