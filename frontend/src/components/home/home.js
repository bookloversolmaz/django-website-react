import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
      <div>
        <h1>Solmaz Purser</h1>
        <h2>Software developer</h2>
        <p>Click the link below to go to the other pages</p>
        {/* Link to software projects, drop down to to do list. Add tic tac toe */}
        <Link to="/todo">To do page</Link>
        <p><Link to="/blog">Blog </Link></p>
      </div>
  );
}

export default Home;