import fs from "fs";

import {validateFile} from "../validations/FieldValidations";

import {error} from "../notifications/Notification";
import {FILE_NOT_EXIST} from "../constants/Constants";

const loadPuzzle = (filename) => {
  if (fs.existsSync(filename)) {
    const file = fs.readFileSync(filename);
    validateFile(file);
    const state = file.toString()
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

export {
  loadPuzzle,
};
