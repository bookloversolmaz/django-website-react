import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjust the URL as needed

// Function to fetch game data
function fetchGameData(gameId) {
  console.log('Fetching game data with ID:', gameId); // Debugging statement
  return axios.get(`${API_BASE_URL}/tictactoe/`);
}

// Function to update game move
function updateGameMove(gameId, index, player) {
  console.log('Updating game move for ID:', gameId, 'Index:', index, 'Player:', player); // Debugging statement
  return axios.put(`${API_BASE_URL}/tictactoe/${gameId}/`, { index, player });
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [gameId, setGameId] = useState(null);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  useEffect(() => {
    // Fetch the initial game state
    axios.post(`${API_BASE_URL}/tictactoe/`)
      .then(response => {
        setGameId(response.data.id);
        setSquares(response.data.board);
      })
      .catch(error => console.error('Error starting game:', error));
  }, []);

  useEffect(() => {
    if (gameId) {
      fetchGameData(gameId).then(response => {
        setSquares(response.data.board);
        setWinner(response.data.winner);
      }).catch(error => console.error('Error fetching game data:', error));
    }
  }, [gameId]);

  const handlePlay = (index) => {
    if (squares[index] === null && !winner) {
      updateGameMove(gameId, index, currentPlayer)
        .then(response => {
          setSquares(response.data.board);
          setWinner(response.data.winner);
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        })
        .catch(error => console.error('Error making move:', error));
    }
  };

  const moves = squares.map((_, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => handlePlay(move)}>{description}</button>
      </li>
    );
  });

  if (gameId === null) return <div>Loading...</div>;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{winner ? (winner === 'Tie' ? "It's a tie!" : `Winner: ${winner}`) : `Next player: ${currentPlayer}`}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Assuming Board is another component that you've defined
function Board({ squares, onPlay }) {
  return (
    <div>
      {squares.map((square, index) => (
        <button
          key={index}
          onClick={() => onPlay(index)}
          disabled={square !== null}
        >
          {square}
        </button>
      ))}
    </div>
  );
}