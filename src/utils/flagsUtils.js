import {FLAGS} from "../constants/Constants";

export const findFlags = () => {
  let flagIndexes = {};
  for (const name in FLAGS) {
    FLAGS[name].forEach((flagName) => {
      const index = process.argv.indexOf(flagName);
      if (index === -1) {
        return;
      }
      flagIndexes[name] = index;
    });
  }
  return flagIndexes;
};
