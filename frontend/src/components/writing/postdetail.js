import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// This is the page that contains the entire post
const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from URL parameters
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

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

  // Split the post body into paragraphs based on newline characters
  const paragraphs = post.body.split('\n').filter(paragraph => paragraph.trim() !== '');
  // paragraph =>...: filter methods creates new array containing elements of old array passed from the earlier part of the function
  // The function paragraph => paragraph.trim() !== '' is an arrow function that takes a single parameter, paragraph.
  // trim method removes whitespace from both the beginning and the end of the string
  // !== '': This part checks if the trimmed paragraph is not equal to an empty string. If the result of trim() is not an empty string, 
  // it means that the paragraph contains some actual content (i.e., it's not just whitespace).

    // Handle go back to the previous page
    const handleGoBack = () => {
      navigate(-1);  // This goes back one page in history
    };


    return (
      <div>
        <button onClick={handleGoBack}>Return to Writing Page</button>
        <h1>{post.title}</h1>
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
        {/* Render each paragraph with dangerouslySetInnerHTML */}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: paragraph }}
            // To create the link in django admin, use this format 
            // <a href="https://www.axelos.com/resource-hub/blog/itil-4-foundation-7-tips-to-prepare" target="_blank">here</a>.
            // React dangerouslySetInnerHTML react replacement for innerHTML. It makes react aware of HTML tags in rich text editor
            // i.e. django admin interface, and renders them properly.
          ></p>
        ))}
      </div>
    );
  };

export default PostDetail;
