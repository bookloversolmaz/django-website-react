import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Writing = () => {
  const [posts, setPosts] = useState([]);
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
    postId.push(`/writing/${postId}`); // Redirect to the detailed view of the post
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

export default Writing;
