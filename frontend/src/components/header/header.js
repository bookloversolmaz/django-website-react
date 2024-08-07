import React from 'react';

function Header() {
    return (
        <header>
            {/* Content of the header will go here */}
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/todo">Todo</a></li>
                    <li><a href="/tictactoe">Tic-tac-toe</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;