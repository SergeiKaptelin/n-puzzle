import colors from "colors/safe";

export const usage = () => {
  console.log(colors.yellow("Usage: ./npuzzle -f filename"));
  console.log(colors.yellow("  -f, --filename: path to npuzzle field file"));
  process.exit(0);
};
