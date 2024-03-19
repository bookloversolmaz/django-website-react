import axios from "axios";
import React, { useState, useEffect } from "react";

const Blog = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/blog/');
        if (response.status === 200) {
          setPost(response.data); // Set post to response data once Promise is resolved
        } else {
          console.error("Error fetching post");
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchPost();
  }, []);

  // Render loading indicator while post is null (i.e., Promise is pending)
  if (post === null) {
    return <div>Loading...</div>;
  }

  // Render post details once Promise is resolved
  return (
    <div className="Blog">
      <h1>Blog</h1>
      <header className="details_header">
        <h1 className="details_heading">{post.title}</h1>
        <div className="post_details">
          <div>
            <p className="details_date">Posted on {post.publication_date}</p>
          </div>
          <div>
            <p className="details_date">{post.description}</p>
          </div>
        </div>
      </header>
      <main className="details_body">{post.body_text}</main>
    </div>
  );
};

export default Blog;
