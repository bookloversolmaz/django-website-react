import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './writing.css'

// This is the page that contains the entire post
const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from URL parameters
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get(`/writing/${postId}/`); // Fetch the specific post
        setPost(response.data); // Set the post data to state
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId]); // Fetch post whenever postId changes

  if (!post) return <div>Loading...</div>; // Show loading state while fetching data

  // Split the post body into paragraphs based on newline characters
  const SplitParagraphs= post.body.split('\n').filter(paragraph => paragraph.trim() !== '');
  // paragraph =>...: filter methods creates new array containing elements of old array passed from the earlier part of the function
  // The function paragraph => paragraph.trim() !== '' is an arrow function that takes a single parameter, paragraph.
  // trim method removes whitespace from both the beginning and the end of the string
  // !== '': This part checks if the trimmed paragraph is not equal to an empty string. If the result of trim() is not an empty string, 
  // it means that the paragraph contains some actual content (i.e., it's not just whitespace).

  // Sanitize and modify links to open in a new tab
  //  The map() method requires a function to process each element in SplitParagraphs, and the arrow function (paragraph => ...) is passed as the argument to map().
  // The parentheses around the arrow function are necessary because you're passing the arrow function as an argument to the map() method.
  // 
  const sanitizedParagraphs = SplitParagraphs.map(paragraph =>
    DOMPurify.sanitize(paragraph, {
      ADD_ATTR: ['target'], // Allow target attribute By default, sanitizers often strip attributes like target for security reasons.
      // This option explicitly allows the target attribute, enabling us to later modify links to open in a new tab.
      FORBID_TAGS: ['script'], // Disallow script tags for security. Prevents <script> tags from being included in the sanitized output, as they could execute harmful JavaScript code.
    // Add target="_blank" to links. Ensures that any <a> tag in the sanitized HTML has the target="_blank" attribute, which makes the link open in a new tab.
    }).replace(
      // Matches any <a> tag that does not already have a target attribute. <a\s+ matches the <a> tag with at least one space after it.
      // (?!.*target) is a negative lookahead that ensures the target attribute is not present anywhere in the tag.
      // The /g flag means this replacement will be applied globally (to all <a> tags in the string).
      /<a\s+(?!.*target)/g,
      // Adds the target="_blank" attribute to the <a> tag.
      '<a target="_blank" '
    )
  );

    // Handle go back to the previous page
    const handleGoBack = () => {
      navigate(-1);  // This goes back one page in history
    };


    return (
      <div>
        <button className="return-button" onClick={handleGoBack}>Return to Writing Page</button>
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
        {sanitizedParagraphs.map((paragraphs, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{__html: paragraphs}}
            // To create the link in django admin, use this format 
            // <a href="https://www.axelos.com/resource-hub/blog/itil-4-foundation-7-tips-to-prepare" target="_blank">here</a>.
            // React dangerouslySetInnerHTML react replacement for innerHTML. It makes react aware of HTML tags in rich text editor
            // i.e. django admin interface, and renders them properly. Should be an object with the __html key passed the component. Only use with trusted sources as it makes the site vulnerable to XSS attacks.
            //  
          ></p>
        ))}
      </div>
    );
  };

export default PostDetail;
