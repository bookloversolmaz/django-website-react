import './header.css';
import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';

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
                                <li><a href="/about">About</a></li>
                                <li><a href="/projects">Projects</a></li>
                                <li><a href="/writing">Writing</a></li>
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="/todo">To-Do List</a></li>
                            </ul>
                        )}
                    </li>
                    <div className="social-links">
                        <li>
                            <SocialIcon 
                                url="https://github.com/bookloversolmaz" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ height: 30, width: 30 }} 
                            />
                        </li>
                        <li>
                            <SocialIcon 
                                url="https://www.linkedin.com/in/solmaz-purser-853280115/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ height: 30, width: 30 }} 
                            />
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;