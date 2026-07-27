import React from 'react';
import './home.css';
import laptopImage from '../images/homepage-image.png';


function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Hi, I’m Solmaz</p>

          <h1>
            <span className="line">I develop</span>
            <span className="line">thoughtful</span>
            <span className="line accent">content.</span>
          </h1>

          <p className="hero-description">
            Content designer and UX writer with with a background in content strategy, editorial and software development within fintech
          </p>

          <div className="hero-buttons">
            <a href="/projects" className="primary-button">
              View Projects →
            </a>
            <a href="/about" className="secondary-button">
              About Me →
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src={laptopImage} alt="Laptop setup" className="hero-image" />
        </div>
      </section>
    </main>
  );
}

export default Home