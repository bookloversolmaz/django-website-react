import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import './writing.css';

const WritingLandingPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      const response = await axios.get('https://django-website-react-1.onrender.com/writing/');
      console.log("Fetched posts:", response.data); // Inspect response structure
      setPosts(Array.isArray(response.data) ? response.data : []); // Update state
    } catch (error) {
      console.error("Axios direct request error:", error.message);
      setPosts([]); // Fallback to empty array
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const sortedPosts = Array.isArray(posts)
    ? [...posts].sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
    : [];

  const handlePostClick = (postId) => {
    navigate(`/writing/${postId}`); // Redirect to the detailed view of the post
  };

  return (
    <div>
      <h1 className="landing-page-heading">Writing</h1>
      {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
        <div>
          {sortedPosts.map((post) => (
            <div className="writing-block" key={post.id}>
              <h2
                className="writing-title"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePostClick(post.id)}
              >
                {post.title}
              </h2>
              <p>
                Publication date:{' '}
                {new Date(post.publication_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p>
                Created on:{' '}
                {new Date(post.created_on).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p>
                {post.body.length > 100
                  ? `${post.body.substring(0, 100)}...`
                  : post.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading or no data available...</div>
      )}
    </div>
  );
};

export default WritingLandingPage;

