import React, { useState } from 'react';

const WordSearchGrid = ({ words, gridSize, onWordSelect, isGameOver }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Available letters

  const [grid, setGrid] = useState(generateGrid());

  function generateGrid() {
    const newGrid = [];
    for (let row = 0; row < gridSize; row++) {
      const newRow = [];
      for (let col = 0; col < gridSize; col++) {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        newRow.push({ letter: randomLetter, selected: false });
      }
      newGrid.push(newRow);
    }
    return newGrid;
  }

  const handleCellMouseDown = (row, col) => {
    if (isGameOver) return;

    const updatedGrid = [...grid];
    updatedGrid[row][col].selected = true;
    setGrid(updatedGrid);
  };

  const handleCellMouseUp = () => {
    if (isGameOver) return;

    const selectedCells = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col].selected) {
          selectedCells.push({ row, col });
        }
      }
    }

    const selectedWord = checkForWord(selectedCells);
    if (selectedWord) {
      onWordSelect(selectedWord);
    }

    const updatedGrid = [...grid];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        updatedGrid[row][col].selected = false;
      }
    }
    setGrid(updatedGrid);
  };

  const handleCellMouseEnter = (row, col) => {
    if (isGameOver) return;

    if (grid[row][col].selected) return;

    const updatedGrid = [...grid];
    updatedGrid[row][col].selected = true;
    setGrid(updatedGrid);
  };

  const checkForWord = (selectedCells) => {
    const selectedWord = words.find((word) => {
      if (word.length !== selectedCells.length) {
        return false;
      }

      return selectedCells.every((cell, index) => {
        const { row, col } = cell;
        return grid[row][col].letter === word[index];
      });
    });

    return selectedWord;
  };

  return (
    <div className="word-search-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell.selected ? 'selected' : ''}`}
              onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
              onMouseUp={handleCellMouseUp}
              onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
            >
              {cell.selected && <span className="selected-letter">{cell.letter}</span>}
              {!cell.selected && cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordSearchGrid;
