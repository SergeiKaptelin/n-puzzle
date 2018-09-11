import colors from "colors/safe";

import {FILE_NOT_EXIST, DIFFERS_ROWS_AND_COLUMNS} from "../constants/Constants";

const errorMessages = (key, message) => {
  switch (key) {
    case FILE_NOT_EXIST:
      return `File ${colors.yellow(message)} not exist`;
    case DIFFERS_ROWS_AND_COLUMNS:
      return "Number of rows differs from number of columns";
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
