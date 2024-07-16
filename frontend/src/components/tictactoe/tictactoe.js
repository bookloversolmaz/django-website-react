import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(' '));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    // Fetch initial game state
    axios.post('http://127.0.0.1:8000/tictactoe/', { player_one: 'X', player_two: 'O' })
      .then(response => {
        setGameId(response.data.id);
        // Assuming the backend sends the initial board state
        setBoard(Array(9).fill(' '));
      })
      .catch(error => console.error('Error starting game:', error));
  }, []);

  const handleMove = (index) => {
    if (board[index] === ' ' && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      // Send move to backend using `gameId`
      axios.post(`http://127.0.0.1:8000/tictactoe/${gameId}/`, { index })
        .then(response => {
          // Assuming the backend sends the updated board state and winner status
          setBoard(response.data.board);
          setWinner(response.data.winner);
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        })
        .catch(error => console.error('Error making move:', error));
    }
  };

  return (
    <div className="tictactoe">
      <h1>Tic Tac Toe</h1>
      {winner ? <h2>{winner} wins!</h2> : <h2>Current Player: {currentPlayer}</h2>}
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} onClick={() => handleMove(index)}>{cell}</button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;