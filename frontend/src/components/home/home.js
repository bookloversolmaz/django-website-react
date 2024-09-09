import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  // Create function to track changes in dropdown list
  // Use useState to set the defualt value of DropDown Menu and declare the values
  const [dropdownValue, SetDropdownValue] = useState('')
  const handleChange = (event) => {
    SetDropdownValue(event.target.value);
    };
    return (
      <div>
        <h1>Solmaz Purser</h1>
        <h2>Software developer</h2>
        <p>Click the link below to go to the other pages</p>
        <Link to="/todo">To do page</Link>
      </div>
  );
}
export default Home;