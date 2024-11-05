import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// This is the page that contains the entire post
const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from URL parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/writing/${postId}/`); // Fetch the specific post
        setPost(response.data); // Set the post data to state
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId]); // Fetch post whenever postId changes

  if (!post) return <div>Loading...</div>; // Show loading state while fetching data

  return (
    <div>
      <h1>{post.title}</h1> {/* Display post title */}
      <p>{new Date(post.publication_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })}</p> {/* Display publication date */}
      <p>{post.body}</p> {/* Display the full body of the post */}
    </div>
  );
};

export default PostDetail;
