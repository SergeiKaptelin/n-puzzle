import $ from "jquery";

import AStar from "./core/Algorithm";
import Node from "./core/Node";
import PuzzleGenerator from "./puzzle/PuzzleGenerator";

import "normalize.css/normalize.css";
import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  let npuzzle = {
    heuristic: "manh",
    field: "3x3",
    puzzle: [[]],
  };

  $("#3x3").click(() => handleDrawField("3x3"));
  $("#4x4").click(() => handleDrawField("4x4"));
  $("#manhattanDistance").click(() => npuzzle.heuristic = "manh");
  $("#linearConflicts").click(() => npuzzle.heuristic = "lin");
  $("#misplacedTiles").click(() => npuzzle.heuristic = "misp");
  $(".random-button").click(() => handleRandomizeField());


  $("#solve").click(start);
  $("#show-solutions").click(showSolution);

  var emptytilePosRow = 1;
  var emptytilePosCol = 2;
  var cellDisplacement = "69px";

  $(".start .cell").click(moveTile);

  const handleDrawField = (fieldName) => {
    const largeField = $(".largeField");
    const smallField = $(".smallField");
    switch (fieldName) {
      case "3x3":
        largeField.fadeOut("fast", () => smallField.fadeIn("slow"));
        npuzzle.field = fieldName;
        return;
      case "4x4":
        smallField.fadeOut("fast", () => largeField.fadeIn("slow"));
        npuzzle.field = fieldName;
        return;
    }
  };

  const handleRandomizeField = () => {
    let size = 3;
    switch (npuzzle.field) {
      case "3x3":
        size = 3;
        break;
      case "4x4":
        size = 4;
        break;
    }
    const puzzleGenerator = new PuzzleGenerator(size);
    npuzzle.puzzle = puzzleGenerator.generate();
    insertRandomizedField(npuzzle.puzzle);
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
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        const node = domField.find(`[data-pos='${i},${j}']`);
        if (puzzle[i][j] === 0) {
          node.addClass("empty");
          node.text("");
        } else {
          node.hasClass("empty") && node.removeClass("empty");
          node.text(`${puzzle[i][j]}`);
        }
      }
    }
  };

  function moveTile() {
    // Gets the position of the current element
    var pos = $(this).attr("data-pos");
    var posRow = parseInt(pos.split(",")[0]);
    var posCol = parseInt(pos.split(",")[1]);

    // Move Up
    if (posRow + 1 == emptytilePosRow && posCol == emptytilePosCol) {
      $(this).animate({
        "top": "+=" + cellDisplacement //moves up
      });

      $("#empty").animate({
        "top": "-=" + cellDisplacement //moves down
      });

      emptytilePosRow -= 1;
      $(this).attr("data-pos", (posRow + 1) + "," + posCol);
    }

    // Move Down
    if (posRow - 1 == emptytilePosRow && posCol == emptytilePosCol) {
      $(this).animate({
        "top": "-=" + cellDisplacement //moves down
      });

      $("#empty").animate({
        "top": "+=" + cellDisplacement //moves up
      });

      emptytilePosRow += 1;
      $(this).attr("data-pos", (posRow - 1) + "," + posCol);
    }

    // Move Left
    if (posRow == emptytilePosRow && posCol + 1 == emptytilePosCol) {
      $(this).animate({
        "right": "-=" + cellDisplacement //moves right
      });

      $("#empty").animate({
        "right": "+=" + cellDisplacement //moves left
      });

      emptytilePosCol -= 1;
      $(this).attr("data-pos", posRow + "," + (posCol + 1));
    }

    // Move Right
    if (posRow == emptytilePosRow && posCol - 1 == emptytilePosCol) {
      $(this).animate({
        "right": "+=" + cellDisplacement //moves left
      });

      $("#empty").animate({
        "right": "-=" + cellDisplacement //moves right
      });

      emptytilePosCol += 1;
      $(this).attr("data-pos", posRow + "," + (posCol - 1));
    }

    // Update empty position
    $("#empty").attr("data-pos", emptytilePosRow + "," + emptytilePosCol);
  }

  function start() {
    // var init = new Node(0, [[6, 4, 7], [8, 5, 0], [3, 2, 1]], 1, 2, 0);
    var init = new Node(0, [[7, 4, 0], [2, 6, 8], [1, 3, 5]], 0, 2, 0);
    var goal = new Node(0, [[1, 2, 3], [4, 5, 6], [7, 8, 0]], 2, 2, 0);

    var astar = new AStar(init, goal, 0);
    // To measure time taken by the algorithm
    var startTime = new Date();
    // Execute AStar
    var result = astar.execute();
    // To measure time taken by the algorithm
    var endTime = new Date();
    alert("Completed in: " + (endTime - startTime) + " milliseconds");

    var panel = document.getElementById("panel");
    panel.innerHTML = "Solution: " + result.path + " Total steps: " + result.path.length + "<br>";
    solution = result.path;
  }

  var step = 0;
  var solution = "";

  function showSolution() {

    var move = "";

    switch (solution[step]) {
      case "R":
        move = (emptytilePosRow).toString() + "," + (emptytilePosCol + 1).toString();
        break;
      case "L":
        move = (emptytilePosRow).toString() + "," + (emptytilePosCol - 1).toString();
        break;
      case "U":
        move = (emptytilePosRow - 1).toString() + "," + (emptytilePosCol).toString();
        break;
      case "D":
        move = (emptytilePosRow + 1).toString() + "," + (emptytilePosCol).toString();
        break;
    }

    $("div[data-pos='" + move + "']").click();
    const panel = document.getElementById("panel");
    panel.innerHTML += "Step: " + step + " -> " + solution[step] + " ,";
    step++;
  }

  handleDrawField("3x3");
});
