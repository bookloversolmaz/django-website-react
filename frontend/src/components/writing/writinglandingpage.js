import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../axiosinstance';
import { useNavigate } from 'react-router-dom';
import './writing.css';

// Main component for the writing landing page
const WritingLandingPage = () => {

  // State to store all posts (initially empty array)
  const [posts, setPosts] = useState([]);

  // Hook to programmatically navigate between pages
  const navigate = useNavigate();

  // Function to fetch all blog posts from backend
  const getPostData = async () => {
    try {
      // Make GET request to /writing/ endpoint
      const response = await AxiosInstance.get('/writing/');

      // If request is successful (status 200), store data
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        // Handle unexpected response status
        console.error('Error fetching data: Response is undefined or status is not 200');
      }

    } catch (error) {
      // Catch and log errors from the request
      console.error('Error fetching data:', error.response?.data || error);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    getPostData(); // Fetch posts
  }, []); // Empty dependency array = runs once

  // Sort posts by creation date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on)
  );

  // Navigate to a specific post when clicked
  const handlePostClick = (postId) => {
    navigate(`/writing/${postId}`); // Go to post detail page
  };

  // JSX layout
  return (
    <main className="writing-page page-shell"> {/* Main page wrapper */}

      {/* Top hero section */}
      <section className="writing-hero page-hero">

        {/* Page heading */}
        <h1 className="writing-heading page-heading">Writing</h1>

        {/* Intro text */}
        <p className="writing-intro page-intro">
          Articles, reflections, and notes on software, books, and the ideas I keep returning to.
        </p>
      </section>

      {/* Grid section containing posts */}
      <section className="writing-grid-section">

        {/* Show loading state if no posts yet */}
        {sortedPosts.length === 0 ? (
          <div className="writing-loading">Loading...</div>

        ) : (
          // Otherwise render posts grid
          <div className="writing-grid">

            {/* Loop through each post */}
            {sortedPosts.map((post) => (

              // Individual post card
              <article className="writing-block glass-card" key={post.id}>

                <div className="writing-block-top">

                  {/* Post title (clickable) */}
                  <h2
                    className="writing-title"
                    onClick={() => handlePostClick(post.id)}
                  >
                    {post.title}
                  </h2>

                  {/* Metadata (dates) */}
                  <div className="writing-meta">

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

                  {/* Short preview of the post */}
                  <p className="writing-excerpt">
                    {post.body.length > 140
                      ? `${post.body.substring(0, 140)}...` // Truncate long text
                      : post.body} {/* Show full if short */}
                  </p>
                </div>

                {/* Button to open full post */}
                <button
                  className="writing-read-more"
                  onClick={() => handlePostClick(post.id)}
                >
                  Read more
                </button>

              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

// Export component to allow React to import this page and render it
export default WritingLandingPage;