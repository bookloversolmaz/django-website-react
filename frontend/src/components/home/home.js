// import axios from 'axios';
import React from 'react';
import ToDo from '../todo/todo';


const Home = () => {
  return (
    <div className = "ToDo">
      <ToDo/>
    </div>


    // <Routes>
    //   <Route path="/todo" element={<ToDo navigate={ToDo()} />} />

    // </Routes>
  );
};

export default Home;

// we can use the name parameter to link to our home page from any other page by adding the following link in a template
// This is reversed URL mapping
{/* <a href="{% url 'index' %}">Home</a>. */}

  