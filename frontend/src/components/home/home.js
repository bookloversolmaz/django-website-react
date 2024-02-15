// import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom";


// function Home() {
//   return (
//     <div className = "Home">
//       <Link to="/todo"> To do page</Link>

//     </div>
//   );
// };

// export default Home;

// // we can use the name parameter to link to our home page from any other page by adding the following link in a template
// // This is reversed URL mapping

 
const Home = ({ to }) => {
 
    return (
        <Link to={`/${to}`}>
            <button className="my-button">
                Take me to {to === '' ? "To do list" : to}
            </button>
        </Link>
    )
}
 
export default Home;