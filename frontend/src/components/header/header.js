import React from 'react';

function Header() {
    return (
        <header>
            <nav aria-label="Main navigation">
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/todo">To do list</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/writing">Writing</a></li>
                    <li>
                        {/* Add target="_blank" and rel="noopener noreferrer" to the GitHub and LinkedIn links so they open in a new tab, and ensure security. */}
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
                </ul>
            </nav>
        </header>
    );
}

export default Header;
