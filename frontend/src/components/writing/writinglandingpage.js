import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

// This is the writing landing page, which contains all of the blogs with the first 100 words of the body text.
// The user can then click on the title of each blog and they are then taken to the post detail page
const WritingLandingPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/writing/');
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error('Error fetching data: Response is undefined or status is not 200');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Function to handle post click
  const handlePostClick = (postId) => {
    navigate(`/writing/${postId}`); // Redirect to the detailed view of the post
  };

  return (
    <div>
      <h1>Writing</h1>
      {posts.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h2 style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post.id)}>
                {post.title}
              </h2>
              <p>{new Date(post.publication_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              })}</p>
              <p>
                {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingLandingPage;
