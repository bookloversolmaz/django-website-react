import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todoPageUrl, setTodoPageUrl] = useState('');
  
  useEffect(() => {
    // Fetch data from the backend server
    axios.get('http://127.0.0.1:8000/todo/')
      .then(response => {
        // Assuming the response.data contains the URL for the todo page
        setTodoPageUrl(response.data.todo_page);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array, so it runs only once when the component mounts

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>Click the link below to go to the to do list page:</p>
      <a href={todoPageUrl}>To do list</a>
      {/* Add more links if needed */}
    </div>
  );
}

export default Home;