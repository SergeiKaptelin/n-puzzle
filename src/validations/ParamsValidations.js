import {FLAGS} from "../constants/Constants";
import {usage} from "../notifications/Notification";

export const validateParams = (flagIndexes) => {
  for (const name in flagIndexes) {
    const index = flagIndexes[name];
    const isLast = index === process.argv.length - 1;
    if (index === -1 || isLast || isNextFlag(FLAGS, process.argv[index + 1])) {
      usage();
    }
  }
};

const isNextFlag = (flags, param) => {
  for (const elem in flags) {
    if (flags[elem].includes(param))
      return true;
  }
  return false;
};
