import {error} from "../notifications/Notification";
import {
  EMPTY_FILE,
  EMPTY_ROW,
  INVALID_ROW,
  INVALID_DIMENSION,
  WRONG_NUMBER_ROWS,
  WRONG_NUMBER_COLS,
  LOW_DIMENSION,
  NO_LAST_EMPTY_LINE,
  TOO_LARGE_NUMBER,
  HAS_DUPLICATES,
} from "../constants/Constants";

const validateFile = (file) => {
  const fileStr = file.toString();
  if (fileStr.length === 0) {
    error(EMPTY_FILE);
    process.exit(0);
  }
  const splitedStr = fileStr.split("\n");
  splitedStr.forEach((row, index) => {
    if (row.length === 0 && index !== splitedStr.length - 1) {
      error(EMPTY_ROW);
      process.exit(0);
    }
    if (index === splitedStr.length - 1 && row.length > 0) {
      error(NO_LAST_EMPTY_LINE);
      process.exit(0);
    }
  });
  let dimension = undefined;
  const fileInfo = fileStr.replace(/#.+($|\n)/g, "$1")
    .split("\n")
    .filter((row) => row.length > 0)
    .map((row, index) => {
      if (index === 0) {
        dimension = Number(row);
        if (!dimension) {
          error(INVALID_DIMENSION, row);
          process.exit(0);
        }
        if (dimension < 3) {
          error(LOW_DIMENSION);
          process.exit(0);
        }
      }
      if (index === 0 && !/[0-9]*/.test(row)) {
        error(INVALID_ROW, row);
        process.exit(0);
      }
      return row.split(/\s+/g).filter((x) => x.length).map((cell) => {
        if (index > 0 && /[^0-9]/.test(cell)) {
          error(INVALID_ROW, row);
          process.exit(0);
        }
        const number = Number(cell);
        if (number > (dimension * dimension - 1)) {
          error(TOO_LARGE_NUMBER, number);
          process.exit(0);
        }
        return number;
      });
    });
  if (fileInfo.length - 1 !== dimension) {
    error(WRONG_NUMBER_ROWS);
    process.exit(0);
  }
  let array = [];
  for (let i = 1; i < fileInfo.length; i++) {
    if (fileInfo[i].length !== dimension) {
      error(WRONG_NUMBER_COLS);
      process.exit(0);
    }
    array = [...array, ...fileInfo[i]];
  }
  const duplicate = hasDuplicates(array);
  if (duplicate) {
    error(HAS_DUPLICATES, duplicate);
    process.exit(0);
  }
};

const hasDuplicates = (array) => array.find((element, index) => (array.indexOf(element) !== index));

export {
  validateFile,
};