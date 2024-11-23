// In React, App.js is typically the main entry point and acts as the root 
// component of the application. It's where you define the overall structure and layout of your application, 
// including routing and the main layout components.

import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from '../home/home.js';
import Todo from '../todo/todo.js';
import Header from '../header/header.js';
import Projects from '../projects/projects.js'
import WritingLandingPage from '../writing/writinglandingpage.js'
import PostDetail from "../writing/postdetail.js";
import ContactPage from "../contact/contact.js";
import About from "../about/about.js"

const App = () => {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writing" element={<WritingLandingPage/>} />
          <Route path="/writing/:postId" element={<PostDetail />} />
          <Route path="/writing/:postId" element={<PostDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
    </div>
  );
};

export default App;
