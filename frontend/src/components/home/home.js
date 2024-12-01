import React from 'react';
import './home.css';
import macbookImage from '../images/gummy-macbook.png';

function Home() {
    return (
        <div className="home-container">
            <h1>Solmaz Purser</h1>
            <h2>Software developer and writer</h2>
            <div className="links-container">
                <a href="/about" className="link-bubble link1">About</a>
                <a href="/projects" className="link-bubble link2">Projects</a>
                <a href="/writing" className="link-bubble link3">Writing</a>
                <a href="/contact" className="link-bubble link4">Contact</a>
                <a href="/todo" className="link-bubble link5">To do list</a>
            </div>
            {/* Image with attribution */}
            <div className="image-container">
                <img 
                    src={macbookImage} 
                    alt="MacBook Illustration" 
                    className="home-image" 
                />
            </div>
            <footer className="attribution">
                Illustrations by <a href="https://icons8.com/illustrations/author/SH5qVUiWnjy4" target="_blank" rel="noopener noreferrer">Icons8</a> 
            </footer>
        </div>
    );
}

export default Home;