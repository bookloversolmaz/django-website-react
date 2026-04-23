import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

function About() {
  return (
    <main className="about-page page-shell">
      <section className="about-section page-hero">
        <h1 className="about-heading page-heading">About me</h1>

        <div className="about-card glass-card">
          <p className="about-me">
            I’m a software engineer based in London, with experience building production systems and growing my skills through projects, coding challenges, and volunteer development work.
          </p>

          <p className="about-me">
            I previously worked in editorial and content roles, where I transformed technical, complicated information into clear and easy to read content. My background shapes how I approach development, with a strong focus on communication, clarity and the user experience.
          </p>

          <p className="about-me">
            You can explore more of my work on the <Link to="/writing">writing</Link> page, connect with me on <a href="https://www.linkedin.com/in/solmaz-purser-853280115/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://github.com/bookloversolmaz" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}or get in touch <Link to="/contact">here</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;