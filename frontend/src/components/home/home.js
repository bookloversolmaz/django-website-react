import axios from 'axios';
import React, { useState, useEffect } from 'react';

  const Home = () => {
    const [todoPageUrl, setTodoPageUrl] = useState('');
    
    // useEffect: This hook is called when the component mounts (because of the empty dependency array []). It triggers the fetching of data from the home url in the backend
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/todo') // Assuming this is the URL for the HomeView endpoint
        .then(response => response.json())
        .then(data => {
          setTodoPageUrl(data.todo_page);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
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