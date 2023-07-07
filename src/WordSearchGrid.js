import React, { useState } from 'react';

const WordSearchGrid = ({ words, onWordSelect }) => {
  const gridSize = 10; // Number of rows and columns in the grid
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Available letters

  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleCellMouseDown = (row, col) => {
    setIsDragging(true);
    handleCellClick(row, col);
  };

  const handleCellMouseUp = () => {
    setIsDragging(false);
  };

  const handleCellMouseEnter = (row, col) => {
    if (isDragging) {
      handleCellClick(row, col);
    }
  };

  const handleCellClick = (row, col) => {
    const newSelectedCells = [...selectedCells, { row, col }];
    setSelectedCells(newSelectedCells);

    const selectedWord = checkForWord(newSelectedCells);
    if (selectedWord) {
      onWordSelect(selectedWord);
    }
  };

  const checkForWord = (selectedCells) => {
    const selectedWord = words.find((word) => {
      if (word.length !== selectedCells.length) {
        return false;
      }

      return selectedCells.every((cell, index) => {
        const { row, col } = cell;
        return grid[row][col] === word[index];
      });
    });

    return selectedWord;
  };

  const generateGrid = () => {
    const newGrid = [];
    for (let row = 0; row < gridSize; row++) {
      const newRow = [];
      for (let col = 0; col < gridSize; col++) {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        newRow.push(randomLetter);
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
  };

  useState(() => {
    generateGrid();
  }, []);

  const isCellSelected = (row, col) => {
    return selectedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
  };

  return (
    <div className="word-search-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${
                isCellSelected(rowIndex, colIndex) ? 'selected' : ''
              }`}
              onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
              onMouseUp={handleCellMouseUp}
              onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordSearchGrid;
