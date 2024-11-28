import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
      <div>
        <h1>About</h1>
        <p> I am a software developer based in London, UK. I recently graduated from Makers software development bootcamp 
            and have been further developing my skills via projects, coding challenges and volunteering with Unify Giving.
            Before my career change, I was an editor and writer for several years. You can find examples of my work in 
            the <Link to="/writing">writing</Link> page, where you can also read my musings on tech, books and other topics. 
            You can find out more about me at <a href="https://www.linkedin.com/in/solmaz-purser-853280115/" target="_blank" 
            rel="noopener noreferrer">LinkedIn</a> and <a href="https://github.com/bookloversolmaz" target="_blank" rel="noopener noreferrer">GitHub</a>. 
            You can also contact me <Link to="/contact">here.</Link>
        </p>
      </div>
  );
};
export default About;