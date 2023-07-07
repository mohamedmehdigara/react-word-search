import React, { useState, useEffect } from 'react';
import WordSearchGrid from './WordSearchGrid';

const WordSearch = () => {
  const words = ['REACT', 'WORD', 'SEARCH', 'GAME']; // Define your word list here
  const gridSize = 10; // Number of rows and columns in the grid
  const gameDurationInSeconds = 180; // Duration of the game in seconds

  const [selectedWord, setSelectedWord] = useState('');
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(gameDurationInSeconds);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      setIsGameOver(true);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isGameOver]);

  const handleRestartGame = () => {
    setSelectedWord('');
    setScore(0);
    setRemainingTime(gameDurationInSeconds);
    setIsGameOver(false);
  };

  return (
    <div className="container">
      <h1 className="text-center">Word Search Game</h1>
      {!isGameOver ? (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <p>Selected Word: {selectedWord}</p>
            <p>Score: {score}</p>
            <p>Time Remaining: {remainingTime}s</p>
          </div>
          <WordSearchGrid
            words={words}
            gridSize={gridSize}
            onWordSelect={handleWordSelect}
            isGameOver={isGameOver}
          />
        </div>
      ) : (
        <div className="text-center">
          <p>Game Over! Final Score: {score}</p>
          <button className="btn btn-primary" onClick={handleRestartGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
