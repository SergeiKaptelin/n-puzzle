import colors from "colors/safe";

import AStar from "./core/Algorithm";
import Node from "./core/Node";
import {usage} from "./notifications/Notification";
import {findFlags} from "./utils/flagsUtils";
import {validateParams} from "./validations/ParamsValidations";
import {loadPuzzle, generateGoal} from "./puzzle/Puzzle";

const flagIndexes = findFlags();
validateParams(flagIndexes);
if (!flagIndexes.hasOwnProperty("filename")) {
  usage();
}

const puzzle = loadPuzzle(process.argv[flagIndexes.filename + 1]);
const goalPuzzle = generateGoal(puzzle.size);

// 3x3
// const init = new Node(0, [[7, 4, 0], [2, 6, 8], [1, 3, 5]], 0, 2, 0);
// const goal = new Node(0, [[1, 2, 3], [4, 5, 6], [7, 8, 0]], 2, 2, 0);

//4x4
// const init = new Node(0, [[14, 8, 3, 5], [1, 2, 12, 15], [4, 9, 6, 10], [11, 0, 7, 13]], 3, 1, 0);
// const goal = new Node(0, [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]], 3, 3, 0);

const init = new Node(0, puzzle.state, puzzle.emptyRow, puzzle.emptyCol, 0);
const goal = new Node(0, goalPuzzle.state, goalPuzzle.emptyRow, puzzle.emptyCol, 0);
const astar = new AStar(init, goal, 0);
const startTime = new Date();
const result = astar.execute();
const endTime = new Date();
console.log(colors.green("Completed in:"), colors.yellow(endTime - startTime), colors.green("milliseconds"));
console.log("result", result);
