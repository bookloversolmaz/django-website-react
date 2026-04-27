import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../axiosinstance';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './writing.css';

// Define the PostDetail component.
// This page displays one full writing/blog post.
const PostDetail = () => {
  // Get the postId from the URL.
  // Example: /writing/3 means postId is 3.
  const { postId } = useParams();

  // Store the post returned from the backend.
  // It starts as null while the data is loading.
  const [post, setPost] = useState(null);

  // Allows navigation from code, such as going back one page.
  const navigate = useNavigate();

  // Fetch the post when the component loads, or whenever postId changes.
  useEffect(() => {
    // Define an async function so we can use await.
    const fetchPost = async () => {
      try {
        // Request the post data from the backend API.
        const response = await AxiosInstance.get(`/writing/${postId}/`);

        // Save the returned post data into state.
        setPost(response.data);
      } catch (error) {
        // Log any API errors to the console.
        console.error('Error fetching post details:', error);
      }
    };

    // Run the fetch function.
    fetchPost();
  }, [postId]);

  // Show a loading message until the post has been fetched.
  if (!post) return <div className="writing-loading">Loading...</div>;

  // Go back to the previous page in browser history.
  const handleGoBack = () => {
    navigate(-1);
  };

  // Insert the post image into the body wherever [IMAGE] appears.
  // If there is no image, keep the body unchanged.
  const bodyWithImage = post.image
    ? post.body.replace(
        '[IMAGE]',
        `<img src="${post.image}" alt="${post.title}" class="post-inline-image" />`
      )
    : post.body;

  // Split the post body into paragraph-like chunks using line breaks.
  // Empty lines are removed.
  const splitParagraphs = bodyWithImage
    .split('\n')
    .filter((paragraph) => paragraph.trim() !== '');

  // Sanitize each paragraph before rendering it as HTML.
  // This protects against unsafe HTML such as scripts.
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

  // JSX layout for the page
  return (
    <main className="post-page">
      {/* Main content section for the post */}
      <section className="post-section">
        {/* Button returns the user to the previous page */}
        <button className="return-button" onClick={handleGoBack}>
          ← Return to Writing
        </button>

        {/* Glass-style card containing the post */}
        <article className="post-card glass-card">
          {/* Small label above the post title */}
          <p className="writing-eyebrow">Writing</p>

          {/* Main post title */}
          <h1 className="post-heading">{post.title}</h1>

          {/* Post date metadata */}
          <div className="post-meta">
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
          </div>

          {/* Main body of the post */}
          <div className="post-body">
            {/* Render each sanitized paragraph or image block */}
            {sanitizedParagraphs.map((paragraph, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};

// Export this component so React Router can render it.
export default PostDetail;