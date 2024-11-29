import React from 'react';
import './home.css';

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
        </div>
    );
}

export default Home;
