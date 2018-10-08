import $ from "jquery";

const movePeace = async (domField, moveDistance, npuzzle) => {
  await asyncForEach(npuzzle.path, async (direction) => {
    await waitFor(250);
    switch (direction) {
      case "U":
        moveUp(domField, moveDistance, npuzzle);
        break;
      case "D":
        moveDown(domField, moveDistance, npuzzle);
        break;
      case "L":
        moveLeft(domField, moveDistance, npuzzle);
        break;
      case "R":
        moveRight(domField, moveDistance, npuzzle);
        break;
    }
  });
};

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const moveUp = (domField, moveDistance, npuzzle) => {
  const peace = domField.find(`[data-pos='${npuzzle.emptyRow - 1},${npuzzle.emptyCol}']`);
  const empty = $(".empty");

  peace.animate({
    "top": "+=" + moveDistance //moves up
  }, 100);

  empty.animate({
    "top": "-=" + moveDistance //moves down
  }, 100);

  npuzzle.emptyRow -= 1;
  peace.attr("data-pos", (npuzzle.emptyRow + 1) + "," + npuzzle.emptyCol);
  empty.attr("data-pos", (npuzzle.emptyRow) + "," + npuzzle.emptyCol);
};

const moveDown = (domField, moveDistance, npuzzle) => {
  const peace = domField.find(`[data-pos='${npuzzle.emptyRow + 1},${npuzzle.emptyCol}']`);
  const empty = $(".empty");

  peace.animate({
    "top": "-=" + moveDistance //moves up
  }, 100);

  empty.animate({
    "top": "+=" + moveDistance //moves down
  }, 100);

  npuzzle.emptyRow += 1;
  peace.attr("data-pos", (npuzzle.emptyRow - 1) + "," + npuzzle.emptyCol);
  empty.attr("data-pos", (npuzzle.emptyRow) + "," + npuzzle.emptyCol);
};

const moveLeft = (domField, moveDistance, npuzzle) => {
  const peace = domField.find(`[data-pos='${npuzzle.emptyRow},${npuzzle.emptyCol - 1}']`);
  const empty = $(".empty");

  peace.animate({
    "right": "-=" + moveDistance //moves up
  }, 100);

  empty.animate({
    "right": "+=" + moveDistance //moves down
  }, 100);

  npuzzle.emptyCol -= 1;
  peace.attr("data-pos", npuzzle.emptyRow + "," + (npuzzle.emptyCol + 1));
  empty.attr("data-pos", npuzzle.emptyRow + "," + npuzzle.emptyCol);
};

const moveRight = (domField, moveDistance, npuzzle) => {
  const peace = domField.find(`[data-pos='${npuzzle.emptyRow},${npuzzle.emptyCol + 1}']`);
  const empty = $(".empty");

  peace.animate({
    "right": "+=" + moveDistance //moves up
  }, 100);

  empty.animate({
    "right": "-=" + moveDistance //moves down
  }, 100);

  npuzzle.emptyCol += 1;
  peace.attr("data-pos", npuzzle.emptyRow + "," + (npuzzle.emptyCol - 1));
  empty.attr("data-pos", npuzzle.emptyRow + "," + npuzzle.emptyCol);
};

export {
  movePeace,
};