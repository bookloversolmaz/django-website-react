// In React, App.js is typically the main entry point and acts as the root 
// component of the application. It's where you define the overall structure and layout of your application, 
// including routing and the main layout components.

import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from '../home/home.js';
import Todo from '../todo/todo.js';
import Blog from '../blog/blog.js';
import Header from '../header/header.js';

const App = () => {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
    </div>
  );
};

export default App;
