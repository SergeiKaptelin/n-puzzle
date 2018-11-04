import $ from "jquery";

import AStar from "./core/Algorithm";
import Node from "./core/Node";
import PuzzleGenerator from "./puzzle/PuzzleGenerator";
import {generateGoal} from "./puzzle/Puzzle";
import {movePeace} from "./utils/movePeace";

import "normalize.css/normalize.css";
import "./styles/index.scss";

const MOVE_DISTANCE = "83px";
const MOBILE_MOVE_DISTANCE = "68px";
const TABLET = 768;

document.addEventListener("DOMContentLoaded", () => {
  const handleDrawField = (fieldName) => {
    const largeField = $(".largeField");
    const smallField = $(".smallField");
    const linearConflictsElem = $(".linear-conflicts");
    const misplacedTilesElem = $(".misplaced-tiles");

    $(".result").fadeOut();
    switch (fieldName) {
      case "3x3":
        largeField.fadeOut("fast", () => smallField.fadeIn("slow"));
        npuzzle.field = fieldName;
        npuzzle.size = 3;
        linearConflictsElem.removeClass("disabled-button");
        misplacedTilesElem.removeClass("disabled-button");
        break;
      case "4x4":
        smallField.fadeOut("fast", () => largeField.fadeIn("slow"));
        npuzzle.field = fieldName;
        npuzzle.size = 4;
        linearConflictsElem.addClass("disabled-button");
        misplacedTilesElem.addClass("disabled-button");
        $("#manhattanDistance").prop("checked", true);
        npuzzle.heuristic = "manh";
        break;
    }
    handleRandomizeField();
  };

  const handleSolve = () => {
    const goalPuzzle = generateGoal(npuzzle.size);
    const init = new Node(0, npuzzle.puzzle, npuzzle.emptyRow, npuzzle.emptyCol, 0);
    const goal = new Node(0, goalPuzzle.state, goalPuzzle.emptyRow, goalPuzzle.emptyCol, 0);
    const astar = new AStar(init, goal, 0);
    $("#loading").removeClass("hide");
    npuzzle.field === "3x3" ? resolvePuzzle(astar) : setTimeout(() => resolvePuzzle(astar), 100);
    $(".play-wrap").fadeIn();
    $(".solve-button").addClass("disabled-button");
  };

  const handleRandomizeField = () => {
    const puzzleGenerator = new PuzzleGenerator(npuzzle.size);
    npuzzle.puzzle = puzzleGenerator.generate();
    $(".result").fadeOut();
    insertRandomizedField(npuzzle.puzzle);
    $(".play-wrap").fadeOut();
    $(".solve-button").removeClass("disabled-button");
    $(".play-button").removeClass("disabled-button");
    $("#heuristic-select").removeClass("disabled-button");
  };

  const handlePlay = () => {
    let domField = undefined;
    let moveDistance = MOVE_DISTANCE;
    switch (npuzzle.field) {
      case "3x3":
        domField = $(".smallField");
        moveDistance = MOVE_DISTANCE;
        break;
      case "4x4":
        domField = $(".largeField");
        moveDistance = (document.body.clientWidth || window.outerWidth) < TABLET ? MOBILE_MOVE_DISTANCE : MOVE_DISTANCE;
        break;
    }
    movePeace(domField, moveDistance, npuzzle);
    $(".play-button").addClass("disabled-button");
    $("#heuristic-select").addClass("disabled-button");
  };

  const handleChangeHeuristic = (heuriscit) => {
    npuzzle.heuristic = heuriscit;
    $(".solve-button").removeClass("disabled-button");
  };

  const resolvePuzzle = (astar) => {
    const startTime = new Date();
    const result = astar.execute(npuzzle.heuristic);
    const endTime = new Date();
    npuzzle.path = result.path.split("");
    $("#loading").addClass("hide");
    $(".complexity-in-time").text(`${result.complexityInTime}`);
    $(".complexity-in-size").text(`${result.complexityInSize}`);
    $(".number-of-moves").text(`${result.path.length}`);
    $(".sequence-of-states").text(`${npuzzle.path.join("-")}`);
    $(".completed-in").text(`${endTime - startTime} ms`);
    $(".result").fadeIn();
  };

  const insertRandomizedField = (puzzle) => {
    let domField = undefined;
    switch (npuzzle.field) {
      case "3x3":
        domField = $(".smallField");
        break;
      case "4x4":
        domField = $(".largeField");
        break;
    }

    if (!domField) {
      return;
    }
    
    const rows = domField.find(".row");
    $.each(rows, (i, row) => $.each(row.children, (j, cell) => $(cell).attr("data-pos", `${i},${j}`)));

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        const node = domField.find(`[data-pos='${i},${j}']`);
        node.removeAttr("style");
        if (puzzle[i][j] === 0) {
          node.addClass("empty");
          node.text("");
          npuzzle.emptyRow = i;
          npuzzle.emptyCol = j;
        } else {
          node.hasClass("empty") && node.removeClass("empty");
          node.text(`${puzzle[i][j]}`);
        }
      }
    }
  };

  let npuzzle = {
    heuristic: "manh",
    field: "3x3",
    size: 3,
    puzzle: [[]],
    emptyRow: 2,
    emptyCol: 2,
    path: [],
  };

  $("#3x3").click(() => handleDrawField("3x3"));
  $("#4x4").click(() => handleDrawField("4x4"));
  $("#manhattanDistance").click(() => handleChangeHeuristic("manh"));
  $("#linearConflicts").click(() => handleChangeHeuristic("lin"));
  $("#misplacedTiles").click(() => handleChangeHeuristic("misp"));
  $(".random-button").click(() => handleRandomizeField());
  $(".solve-button").click(() => handleSolve());
  $(".play-button").click(() => handlePlay());

  handleDrawField("3x3");
  handleRandomizeField();
});
