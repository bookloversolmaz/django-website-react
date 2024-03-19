import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/blog/");
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="Blog">
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* The purpose of this code is to dynamically generate HTML elements for each 
          blog post retrieved from the database (posts array). By mapping over each post in the array and rendering 
          its properties (title, publication_date, description, body_text), you can display the posts on the frontend of your application. 
          The key attribute is essential for efficient rendering and managing the component's state in React. */}
          {posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.publication_date}</p>
              <p>{post.description}</p>
              <p>{post.body_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
