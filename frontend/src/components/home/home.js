import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  // Create function to track changes in dropdown list
  // Use useState to set the defualt value of DropDown Menu and declare the values
  // const [dropdownValue, SetDropdownValue] = useState('')
  // const handleChange = (event) => {
  //   SetDropdownValue(event.target.value);
  //   };
    return (
      <div>
        <h1>Solmaz Purser</h1>
        <h2>Software developer and writer</h2>
        <p>Passionate about all things technology</p>
        <p><Link to="/todo">To do page</Link></p>
        <p><Link to="/projects">Projects</Link></p>
        <p><Link to="/writing">Writing</Link></p>
      </div>
  );
};
export default Home;