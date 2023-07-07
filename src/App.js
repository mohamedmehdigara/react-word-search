import React, { useState, useEffect } from 'react';
import WordSearchGrid from './WordSearchGrid';
import ProgressBar from 'react-bootstrap/ProgressBar';
import successSoundFile from './sounds/success.mp3';
import gameOverSoundFile from './sounds/gameover.mp3';

const words = ['REACT', 'WORD', 'SEARCH', 'GAME']; // Define your word list here
const defaultGridSize = 10; // Default number of rows and columns in the grid
const gameDurationInSeconds = 180; // Duration of the game in seconds

const WordSearch = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(gameDurationInSeconds);
  const [isGameOver, setIsGameOver] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [gridSize, setGridSize] = useState(defaultGridSize);

  const successSound = new Audio(successSoundFile);
  const gameOverSound = new Audio(gameOverSoundFile);

  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setScore((prevScore) => prevScore + 1);

    if (!foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    }

    successSound.play();
  };

  useEffect(() => {
    if (remainingTime <= 0 || foundWords.length === words.length) {
      setIsGameOver(true);
      gameOverSound.play();
    }
  }, [remainingTime, foundWords]);

  const handleRestartGame = () => {
    setSelectedWord('');
    setScore(0);
    setRemainingTime(gameDurationInSeconds);
    setIsGameOver(false);
    setFoundWords([]);
  };

  const handleGridSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize || defaultGridSize);
  };

  return (
    <div className="container">
      <h1 className="text-center">Word Search Game</h1>
      <div className="grid-size">
        <label htmlFor="gridSize">Grid Size:</label>
        <input
          type="number"
          id="gridSize"
          value={gridSize}
          onChange={handleGridSizeChange}
          min="1"
          max="20"
        />
      </div>
      {!isGameOver ? (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <p>Selected Word: {selectedWord}</p>
            <p>Score: {score}</p>
            <ProgressBar
              now={(remainingTime / gameDurationInSeconds) * 100}
              label={`${remainingTime}s`}
            />
          </div>
          <WordSearchGrid
            words={words}
            gridSize={gridSize}
            onWordSelect={handleWordSelect}
            isGameOver={isGameOver}
          />
          <div className="word-list">
            <h2>Word List</h2>
            <ul>
              {words.map((word, index) => (
                <li
                  key={index}
                  className={foundWords.includes(word) ? 'found' : ''}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {foundWords.length === words.length ? (
            <div>
              <p>Congratulations! You found all the words.</p>
              <p>Final Score: {score}</p>
            </div>
          ) : (
            <div>
              <p>Game Over! Final Score: {score}</p>
            </div>
          )}
          <button className="btn btn-primary" onClick={handleRestartGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default WordSearch;

