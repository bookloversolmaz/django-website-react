import './header.css';
import React, { useState } from 'react';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header>
            <nav aria-label="Main navigation">
                <ul className="nav-list">
                    {/* Dropdown Menu */}
                    <li className="dropdown">
                        <button 
                            className="dropdown-button" 
                            onClick={toggleDropdown}
                            aria-haspopup="true" 
                            aria-expanded={dropdownOpen}
                        >
                            Menu
                        </button>
                        {dropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><a href="/">Home</a></li>
                                <li><a href="/todo">To do list</a></li>
                                <li><a href="/projects">Projects</a></li>
                                <li><a href="/writing">Writing</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        )}
                    </li>

                    {/* Social Links */}
                    <div className="social-links">
                        <li>
                            <a 
                                href="https://github.com/bookloversolmaz" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.linkedin.com/in/solmaz-purser-853280115/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
