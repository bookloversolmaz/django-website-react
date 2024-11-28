import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


function Home() {
    return (
      <div>
        <h1>Solmaz Purser</h1>
        <h2>Software developer and writer</h2>
        <Link to="/about">About</Link>
        <p><Link to="/projects">Projects</Link></p>
        <p><Link to="/writing">Writing</Link></p>
        <p><Link to="/contact">Contact</Link></p>
        <p><Link to="/todo">To do page project</Link></p>
      </div>
  );
};
export default Home;