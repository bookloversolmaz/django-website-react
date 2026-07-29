import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../axiosinstance';
import { useNavigate } from 'react-router-dom';
import './writing.css';

const WritingLandingPage = () => {

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      const response = await AxiosInstance.get('/writing/');

      if (response.status === 200) {
        setPosts(response.data);
      }

    } catch (error) {
      console.error(
        'Error fetching data:',
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Newest posts first
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on)
  );

  const handlePostClick = (postId) => {
    navigate(`/writing/${postId}`);
  };

  // Extract first 20 words from first text block
  const getExcerpt = (post) => {

    const firstTextBlock = post.blocks?.find(
      (block) => block.block_type === "text"
    );

    if (!firstTextBlock || !firstTextBlock.body) {
      return "No preview available.";
    }

    const words = firstTextBlock.body.split(" ");

    if (words.length <= 20) {
      return firstTextBlock.body;
    }

    return `${words.slice(0, 20).join(" ")}...`;
  };

  return (
    <main className="writing-page page-shell">

      <section className="writing-hero page-hero">

        <h1 className="writing-heading page-heading">
          Writing
        </h1>

        <p className="writing-intro page-intro">
          Content design, software and other ideas
        </p>

      </section>

      <section className="writing-grid-section">

        {sortedPosts.length === 0 ? (

          <div className="writing-loading">
            Loading...
          </div>

        ) : (

          <div className="writing-grid">

            {sortedPosts.map((post) => (

              <article
                className="writing-block glass-card"
                key={post.id}
              >

                <div className="writing-block-top">

                  <h2
                    className="writing-title"
                    onClick={() => handlePostClick(post.id)}
                  >
                    {post.title}
                  </h2>

                  <div className="writing-meta">

                    <p>
                      Publication date:{' '}
                      {post.publication_date
                        ? new Date(post.publication_date).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            }
                          )
                        : "Not published"}
                    </p>

                    <p>
                      Created on:{' '}
                      {post.created_on
                        ? new Date(post.created_on).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            }
                          )
                        : "Unknown"}
                    </p>

                  </div>

                  <p className="writing-excerpt">
                    {getExcerpt(post)}
                  </p>

                </div>

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

export default WritingLandingPage;