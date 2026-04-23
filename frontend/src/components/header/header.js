import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './header.css';

function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="/" className="site-logo">SP.</a>

        <ul className="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/writing">Writing</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <ul className="social-links">
        <li>
            <SocialIcon
            className="social-icon"
            url="https://github.com/bookloversolmaz"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="transparent"
            fgColor="#2b221d"
            />
        </li>
        <li>
            <SocialIcon
            className="social-icon"
            url="https://www.linkedin.com/in/solmaz-purser-853280115/"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="transparent"
            fgColor="#2b221d"
            />
        </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;