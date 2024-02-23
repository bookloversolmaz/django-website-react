import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
      <div>
        <h1>Welcome to the Homepage</h1>
        <p>Click the link below to go to the to-do list page:</p>
        <Link to="/todo">To do page</Link>
      </div>
  );
}

export default Home;
