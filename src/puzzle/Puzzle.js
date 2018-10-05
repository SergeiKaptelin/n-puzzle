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
  generateGoal,
  isSolvable,
};
