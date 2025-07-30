import React from 'react';
import './BlogCard.css'; 

function BlogCard({image, title, link,onDelete}) {
  return (
    <div className='blog-card'>
        <img src={image} alt={title} className='blog-image' />

        <div className="blog-content">
            <h3>{title}</h3>
            <div className="blog-buttens">
                <button className='read-btn' onClick={ ()=> window.open(link, "_blank")}>Read</button>
                <button className='delete-btn' onClick={onDelete}>Delete</button>

            </div>
        </div>
    </div>
  )
}

export default BlogCard;