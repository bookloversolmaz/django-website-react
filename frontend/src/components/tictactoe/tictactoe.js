// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Game() {
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [gameId, setGameId] = useState(null);
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     // Fetch the initial game state
//     axios.post('http://127.0.0.1:8000/tictactoe/')
//       .then(response => {
//         setGameId(response.data.id);
//         setSquares(response.data.board);
//       })
//       .catch(error => console.error('Error starting game:', error));
//   }, []);

//   const handlePlay = (index) => {
//     // Determine current player
//     const currentPlayer = squares.filter(square => square).length % 2 === 0 ? 'X' : 'O';
    
//     // Make the move
//     axios.put(`http://127.0.0.1:8000/tictactoe/${gameId}/`, {
//       index: index,
//       player: currentPlayer
//     })
//     .then(response => {
//       setSquares(response.data.board);
//       setWinner(response.data.winner);
//     })
//     .catch(error => console.error('Error making move:', error));
//   };

//   const moves = squares.map((_, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => handlePlay(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board squares={squares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <div>{winner ? (winner === 'Tie' ? "It's a tie!" : `Winner: ${winner}`) : `Next player: ${squares.filter(square => square).length % 2 === 0 ? 'X' : 'O'}`}</div>
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust the URL as needed

function fetchGameData(gameId) {
  return axios.get(`${API_BASE_URL}/games/${gameId}/`);
}

function updateGameMove(gameId, index, player) {
  return axios.put(`${API_BASE_URL}/games/${gameId}/`, { index, player });
}

function Game({ gameId }) {
  const [game, setGame] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  useEffect(() => {
    fetchGameData(gameId).then(response => {
      setGame(response.data);
    });
  }, [gameId]);

  function handleMove(index) {
    updateGameMove(gameId, index, currentPlayer).then(response => {
      setGame(response.data);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    });
  }

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <div>Current Player: {currentPlayer}</div>
      <div className="board">
        {game.board.map((cell, index) => (
          <button 
            key={index} 
            onClick={() => handleMove(index)} 
            disabled={cell !== ' ' || game.winner}
          >
            {cell}
          </button>
        ))}
      </div>
      {game.winner && <div>Winner: {game.winner}</div>}
    </div>
  );
}

export default Game;
