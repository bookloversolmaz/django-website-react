import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
      <div className="home-container">
        <h1>Solmaz Purser</h1>
        <h2>Software developer and writer</h2>
        <div className="links-container">
          <Link to="/about" className="link-box link3">About</Link>
          <Link to="/projects" className="link-box link2">Projects</Link>
          <Link to="/writing" className="link-box link1">Writing</Link>
          <Link to="/contact" className="link-box link4">Contact</Link>
          <Link to="/todo" className="link-box link5">To-do Page Project</Link>
        </div>
      </div>
    );
}

export default Home;