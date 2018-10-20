import colors from "colors/safe";

import {
  FILE_NOT_EXIST,
  DIFFERS_ROWS_AND_COLUMNS,
  EMPTY_FILE,
  EMPTY_ROW,
  INVALID_ROW,
  INVALID_DIMENSION,
  WRONG_NUMBER_ROWS,
  WRONG_NUMBER_COLS,
  LOW_DIMENSION,
  NO_LAST_EMPTY_LINE,
} from "../constants/Constants";

const errorMessages = (key, message) => {
  switch (key) {
    case FILE_NOT_EXIST:
      return `File ${colors.yellow(message)} not exist`;
    case DIFFERS_ROWS_AND_COLUMNS:
      return "Number of rows differs from number of columns";
    case EMPTY_FILE:
      return "Empty file is not allowed";
    case EMPTY_ROW:
      return "Empty row is not allowed. Please remove all empty rows in a file";
    case INVALID_ROW:
      return `Invalid row ${colors.yellow(message)}. Please use only digits or comment in the end of the row`;
    case INVALID_DIMENSION:
      return `Please use only one number for dimension, ${colors.yellow(message)} invalid`;
    case WRONG_NUMBER_ROWS:
      return "Dimension not equal number of rows";
    case WRONG_NUMBER_COLS:
      return "Dimension not equal number of cols";
    case LOW_DIMENSION:
      return "Dimension is too low, should be greater than 3";
    case NO_LAST_EMPTY_LINE:
      return "Please add empty line to the end of the file";
  }
};

const usage = () => {
  console.log(colors.yellow("Usage: ./npuzzle -f filename -h (manh | lin | misp)"));
  console.log(colors.yellow("  -f, --filename: path to npuzzle field file"));
  console.log(colors.yellow("  -h, --heuristic: heuristic functions, could be:"));
  console.log(colors.yellow("     manh - manhattan distance"));
  console.log(colors.yellow("     lin  - linear conflicts"));
  console.log(colors.yellow("     misp - misplaced tiles"));
  process.exit(0);
};

const error = (key, message = "") => {
  const errorMessage = errorMessages(key, message);
  console.log(colors.red("ERROR!"), errorMessage);
};

export {
  error,
  usage,
};
