import $ from "jquery";

import AStar from "./core/Algorithm";
import Node from "./core/Node";

import "normalize.css/normalize.css";
import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  $("#solve").click(start);
  $("#show-solutions").click(showSolution);

  var emptytilePosRow = 1;
  var emptytilePosCol = 2;
  var cellDisplacement = "69px";

  $(".start .cell").click(moveTile);

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
});
