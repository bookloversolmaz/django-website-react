import React from 'react';

function Header() {
    return (
        <header>
            {/* Content of the header will go here */}
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/todo">To do list</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;