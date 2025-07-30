import React, { useState } from 'react';
import './Updates.css';
import BlogCard from '../../../components/BlogCard/BlogCard';
import images from '../../../assets/images';
import UserProfile from '../../../components/UserProfile/UseraProfile';

const Updates = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Want to cool down? 14 ideas to try",
      image: images.cool,
      link: "https://www.health.harvard.edu/blog/want-to-cool-down-14-ideas-to-try-202408073065"
    },
    {
      id: 2,
      title: "What is a PSA test and how is it used?",
      image: images.psa,
      link: "https://www.health.harvard.edu/blog/what-is-a-psa-test-and-how-is-it-used-202507143101"
    },
    {
      id: 3,
      title: "Gratitude enhances health, brings happiness, and may even lengthen lives",
      image: images.gratitude,
      link: "https://www.health.harvard.edu/blog/gratitude-enhances-health-brings-happiness-and-may-even-lengthen-lives-202409113071"
    },
    {
      id: 4,
      title: "Respiratory health harms often follow flooding: taking these steps can help",
      image: images.respiratory,
      link: "https://www.health.harvard.edu/blog/respiratory-health-harms-often-follow-flooding-taking-these-steps-can-help-202211092848"
    },
    {
      id: 5,
      title: "Swimming lessons save lives: what parents should know",
      image: images.swimming,
      link: "https://www.health.harvard.edu/blog/swimming-lessons-save-lives-what-parents-should-know-201806151630"
    },
    {
      id: 6,
      title: "Wildfires: how to cope when smoke affects air quality and health",
      image: images.wildfires,
      link: "https://www.health.harvard.edu/blog/wildfires-how-to-cope-when-smoke-affects-air-quality-and-health-202306232947"
    },
  ]);

  const handleDelete = (id) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  return (
    <div className='updates-page'>
      <div className='user'><UserProfile /></div>

      <header className='updates-header'>
        <h2>Notes already Submitted</h2>
        <button className="add-btn">New Add</button>
      </header>

      <div className="blog-list">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            title={blog.title}
            link={blog.link}
            onDelete={() => handleDelete(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Updates;
