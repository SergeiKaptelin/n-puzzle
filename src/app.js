import AStar from "./Core/Algorithm";
import Node from "./Core/Node";
import {usage} from "./Notification/Notification";
const fs = require("fs");

const FLAGS = {
  filename: ["-f", "--filename"],
  generate: ["-g", "--generate"],
};

const findFlags = () => {
  let flagIndexes = {};
  for (const name in FLAGS) {
    FLAGS[name].forEach((flagName) => {
      const index = process.argv.indexOf(flagName);
      if (index === -1) {
        return;
      }
      flagIndexes[name] = index;
    });
  }
  return flagIndexes;
};

const validateParams = (flagIndexes) => {
  for (const name in flagIndexes) {
    const index = flagIndexes[name];
    const isLast = index === process.argv.length - 1;
    if (index === -1 || isLast || isNextFlag(FLAGS, process.argv[index + 1])) {
      usage();
    }
  }
};

const isNextFlag = (flags, param) => {
  for (const elem in flags) {
    if (flags[elem].includes(param))
      return true;
  }
  return false;
};

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
  } else  {
    console.log("Error! File not exist");
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

const flagIndexes = findFlags();
validateParams(flagIndexes);
let puzzle = {};
if (flagIndexes.hasOwnProperty("filename")) {
  puzzle = loadPuzzle(process.argv[flagIndexes.filename + 1]);
} else {
  usage();
}

const goalPuzzle = generateGoal(puzzle.size);

// 3x3
// const init = new Node(0, [[7, 4, 0], [2, 6, 8], [1, 3, 5]], 0, 2, 0);
// const goal = new Node(0, [[1, 2, 3], [4, 5, 6], [7, 8, 0]], 2, 2, 0);

//4x4
// const init = new Node(0, [[14, 8, 3, 5], [1, 2, 12, 15], [4, 9, 6, 10], [11, 0, 7, 13]], 3, 1, 0);
// const goal = new Node(0, [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]], 3, 3, 0);
//

const init = new Node(0, puzzle.state, puzzle.emptyRow, puzzle.emptyCol, 0);
const goal = new Node(0, goalPuzzle.state, goalPuzzle.emptyRow, puzzle.emptyCol, 0);
const astar = new AStar(init, goal, 0);
const startTime = new Date();
astar.execute();
const endTime = new Date();
console.log(`Completed in: ${endTime - startTime} milliseconds`);
