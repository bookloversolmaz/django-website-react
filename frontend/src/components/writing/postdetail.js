import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../axiosinstance';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './writing.css';

// Define the PostDetail component (this page shows a full blog post)
const PostDetail = () => {

  // Extract the postId from the URL (e.g. /writing/3 → postId = 3)
  const { postId } = useParams();

  // Create state to store the fetched post data (initially null)
  const [post, setPost] = useState(null);

  // Hook to programmatically navigate between pages
  const navigate = useNavigate();

  // useEffect runs when the component loads OR when postId changes
  useEffect(() => {

    // Async function to fetch the post from the backend
    const fetchPost = async () => {
      try {
        // Make GET request to backend API for this specific post
        const response = await AxiosInstance.get(`/writing/${postId}/`);

        // Store the returned post data in state
        setPost(response.data);

      } catch (error) {
        // Log any errors if the request fails
        console.error('Error fetching post details:', error);
      }
    };

    // Call the fetch function
    fetchPost();

  }, [postId]); // Dependency array: re-run if postId changes

  // While the post is still loading, show a loading message
  if (!post) return <div className="writing-loading">Loading...</div>;

  // Split the post body into paragraphs using newline characters
  const splitParagraphs = post.body
    .split('\n') // Split string into array by line breaks
    .filter((paragraph) => paragraph.trim() !== ''); // Remove empty lines

  // Sanitize each paragraph to prevent malicious code
  const sanitizedParagraphs = splitParagraphs.map((paragraph) =>
    DOMPurify.sanitize(paragraph, {
      ADD_ATTR: ['target', 'src', 'alt', 'class'], // Allow "target" attribute on links
      ALLOWED_TAGS: [
        'p',
        'a',
        'img',
        'strong',
        'em',
        'ul',
        'ol',
        'li',
        'br',
        'h2',
        'h3',
      ],
      // Add target="_blank" to any links that don’t already have it
      FORBID_TAGS: ['script'], // Block <script> tags for security
    }).replace(/<a\s+(?!.*target)/g, '<a target="_blank" ')
  );

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Go back one step in browser history
  };

  const bodyWithImage = post.image
  ? post.body.replace(
      '[IMAGE]',
      `<img src="${post.image}" alt="${post.title}" class="post-inline-image" />`
    )
  : post.body;

  // JSX layout for the page
  return (
    <main className="post-page"> {/* Main page wrapper */}
      
      <section className="post-section"> {/* Content section */}

        {/* Back button */}
        <button className="return-button" onClick={handleGoBack}>
          ← Return to Writing
        </button>

        {/* Glass-style card container */}
        <article className="post-card glass-card">

          {/* Small label above title */}
          <p className="writing-eyebrow">Writing</p>

          {/* Post title */}
          <h1 className="post-heading">{post.title}</h1>

          {/* Metadata section */}
          <div className="post-meta">

            {/* Publication date */}
            <p>
              Publication date:{' '}
              {new Date(post.publication_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            {/* Creation date */}
            <p>
              Created on:{' '}
              {new Date(post.created_on).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>

          </div>

          {/* Main body content */}
          <div className="post-body">

            {/* Loop through paragraphs and render each one */}
            {sanitizedParagraphs.map((paragraph, index) => (
              <p
                key={index} // Unique key for React rendering
                dangerouslySetInnerHTML={{ __html: paragraph }} 
                // Render HTML content safely (after sanitization)
              />
            ))}

          </div>

        </article>
      </section>
    </main>
  );
};

// Export component so it can be used in routing
export default PostDetail;