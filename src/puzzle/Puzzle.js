import fs from "fs";

import {error} from "../notifications/Notification";
import {FILE_NOT_EXIST} from "../constants/Constants";

const loadPuzzle = (filename) => {
  if (fs.existsSync(filename)) {
    const state = fs.readFileSync(filename).toString()
    //removing comments
      .replace(/#.+($|\n)/g, "$1")
      .split("\n")
      .map((line) => line.split(/\s+/g).filter(x => x.length).map((cell) => parseInt(cell)))
      .filter(row => row.length);

    const size = state.splice(0, 1)[0][0];
    const {emptyCol, emptyRow} = getEmptyCellCoordinates(state);
    return {
      state,
      size,
      emptyRow,
      emptyCol,
    };
  } else {
    error(FILE_NOT_EXIST, filename);
    process.exit(0);
  }
};

const getEmptyCellCoordinates = (state) => {
  let emptyCol = -1;
  let emptyRow = -1;
  state.forEach((row, indexRow) => row.forEach((cell, indexCol) => {
    if (cell === 0) {
      emptyCol = indexCol;
      emptyRow = indexRow;
    }
  }));
  return {emptyCol, emptyRow};
};

const generateGoal = (size) => {
  let goalState = [];
  const emptyRow = size - 1;
  const emptyCol = size - 1;
  const emptyCell = 0;
  let index = 1;
  for (let i = 0; i < size; i++) {
    goalState[i] = [];
    for (let j = 0; j < size; j++) {
      if (i === emptyRow && j === emptyCol) {
        goalState[i].push(emptyCell);
        continue;
      }
      goalState[i].push(index);
      index++;
    }
  }
  return {
    state: goalState,
    size,
    emptyRow,
    emptyCol,
  };
};

const isSolvable = (state) => {
  let puzzle = [];
  state.forEach((row) => puzzle = [...puzzle, ...row]);

  let parity = 0;
  const gridWidth = Math.sqrt(puzzle.length);
  let row = 0; // the current row we are on
  let blankRow = 0; // the row with the blank tile

  for (let i = 0; i < puzzle.length; i++) {
    if (i % gridWidth == 0) { // advance to next row
      row++;
    }
    if (puzzle[i] == 0) { // the blank tile
      blankRow = row; // save the row on which encountered
      continue;
    }
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
        parity++;
      }
    }
  }

  if (gridWidth % 2 == 0) { // even grid
    if (blankRow % 2 == 0) { // blank on odd row; counting from bottom
      return parity % 2 == 0;
    } else { // blank on even row; counting from bottom
      return parity % 2 != 0;
    }
  } else { // odd grid
    return parity % 2 == 0;
  }
};

export {
  loadPuzzle,
  generateGoal,
  isSolvable,
};
