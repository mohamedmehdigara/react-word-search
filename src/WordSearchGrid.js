import React, { useState, useEffect } from 'react';

const WordSearchGrid = ({ words, gridSize, onWordSelect, isGameOver }) => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);

  useEffect(() => {
    generateGrid();
  }, [gridSize]);

  const generateGrid = () => {
    const newGrid = [];

    for (let row = 0; row < gridSize; row++) {
      const newRow = [];

      for (let col = 0; col < gridSize; col++) {
        const randomChar = getRandomChar();
        newRow.push(randomChar);
      }

      newGrid.push(newRow);
    }

    setGrid(newGrid);
  };

  const getRandomChar = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const handleCellClick = (row, col) => {
    if (!isGameOver) {
      const clickedCell = { row, col };
      setSelectedCells([...selectedCells, clickedCell]);
    }
  };

  const handleTouchStart = (row, col) => {
    if (!isGameOver) {
      const touchedCell = { row, col };
      setSelectedCells([...selectedCells, touchedCell]);
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    if (!isGameOver) {
      const touch = event.touches[0];
      const cellWidth = event.target.offsetWidth;
      const cellHeight = event.target.offsetHeight;
      const row = Math.floor(touch.clientY / cellHeight);
      const col = Math.floor(touch.clientX / cellWidth);
      const touchedCell = { row, col };
      setSelectedCells([...selectedCells, touchedCell]);
    }
  };

  const handleTouchEnd = () => {
    if (!isGameOver) {
      onWordSelected();
    }
  };

  const onWordSelected = () => {
    const selectedWord = getSelectedWord();

    if (selectedWord) {
      onWordSelect(selectedWord);
    }

    setSelectedCells([]);
  };

  const getSelectedWord = () => {
    let selectedWord = '';

    // Convert selected cells to a string of characters
    const selectedChars = selectedCells.map(
      ({ row, col }) => grid[row][col]
    );

    // Convert the selected characters to both forward and backward directions
    const forwardWord = selectedChars.join('');
    const backwardWord = selectedChars.reverse().join('');

    // Find the matching word in the word list
    const foundWord =
      words.find((word) => word === forwardWord) ||
      words.find((word) => word === backwardWord);

    if (foundWord) {
      selectedWord = foundWord;
    }

    return selectedWord;
  };

  return (
    <div className="grid-container">
      <table className="grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((char, colIndex) => {
                const cellCoordinates = { row: rowIndex, col: colIndex };
                const isCellSelected = selectedCells.some(
                  (cell) =>
                    cell.row === rowIndex && cell.col === colIndex
                );
                const isSelectedWord =
                  selectedCells.length > 1 && getSelectedWord() !== '';

                return (
                  <td
                    key={colIndex}
                    className={`${
                      isCellSelected ? 'selected' : ''
                    } ${isSelectedWord ? 'selected-word' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {char}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordSearchGrid;
