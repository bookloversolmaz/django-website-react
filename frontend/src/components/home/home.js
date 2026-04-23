import React from 'react';
import './home.css';
import macbookImage from '../images/gummy-macbook.png';

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Hi, I’m Solmaz</p>

          <h1>
            I build thoughtful
            <span> software for the web.</span>
          </h1>

          <p className="hero-description">
            Software engineer with experience building production systems in
            fintech across C#, React, Kafka and Azure, with a background in
            editorial and content strategy.
          </p>

          <div className="hero-buttons">
            <a href="/projects" className="primary-button">
              View Projects
            </a>
            <a href="/about" className="secondary-button">
              About Me
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={macbookImage}
            alt="Laptop with code and coffee mug"
            className="hero-image"
          />
        </div>
      </section>

      <section className="quick-links-section">
        <div className="quick-links-card">
          <a href="/about" className="quick-link">About</a>
          <a href="/projects" className="quick-link">Projects</a>
          <a href="/writing" className="quick-link">Writing</a>
          <a href="/contact" className="quick-link">Contact</a>
        </div>
      </section>
    </main>
  );
}

export default Home;