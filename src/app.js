import colors from "colors/safe";

import AStar from "./core/Algorithm";
import Node from "./core/Node";
import {usage} from "./notifications/Notification";
import {findFlags} from "./utils/flagsUtils";
import {validateParams, isAllovedHeuristic} from "./validations/ParamsValidations";
import {generateGoal, isSolvable} from "./puzzle/Puzzle";
import {loadPuzzle} from "./utils/loadPuzzle";

const flagIndexes = findFlags();
validateParams(flagIndexes);
if (!flagIndexes.hasOwnProperty("filename") || !flagIndexes.hasOwnProperty("heuristic")) {
  usage();
}
const heuristicName = process.argv[flagIndexes.heuristic + 1];
if (!isAllovedHeuristic(heuristicName)) {
  usage();
}

const puzzle = loadPuzzle(process.argv[flagIndexes.filename + 1]);
const goalPuzzle = generateGoal(puzzle.size);
if (!isSolvable(puzzle.state)) {
  console.log("It's puzzle", colors.cyan("unsolvable"));
  process.exit(0);
}

const init = new Node(0, puzzle.state, puzzle.emptyRow, puzzle.emptyCol, 0);
const goal = new Node(0, goalPuzzle.state, goalPuzzle.emptyRow, goalPuzzle.emptyCol, 0);
const astar = new AStar(init, goal, 0);
const startTime = new Date();
const result = astar.execute(heuristicName);
const endTime = new Date();

console.log(colors.green("Complexity in time:"), colors.yellow(result.complexityInTime));
console.log(colors.green("Complexity in size:"), colors.yellow(result.complexityInSize));
console.log(colors.green("Number of moves:"), colors.yellow(result.path.length));
console.log(colors.green("The ordered sequence of states:"), colors.yellow(result.path.split("").join("-")));
console.log(colors.green("Completed in:"), colors.yellow(endTime - startTime), colors.green("ms"));
