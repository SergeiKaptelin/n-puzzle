import {error} from "../notifications/Notification";
import {DIFFERS_ROWS_AND_COLUMNS} from "../constants/Constants";

class Node {
  constructor(value, state, emptyRow, emptyCol, depth) {
    this.value = value;
    this.state = state;
    this.emptyCol = emptyCol;
    this.emptyRow = emptyRow;
    this.depth = depth;
    this.strRepresentation = "";
    this.path = "";

    // String representation of the state in CSV format
    for (var i = 0; i < state.length; i++) {
      // We assume the state is a square
      if (state[i].length != state.length) {
        error(DIFFERS_ROWS_AND_COLUMNS);
        return false;
      }

      for (var j = 0; j < state[i].length; j++)
        this.strRepresentation += state[i][j] + ",";
    }

    this.size = this.state.length;
  }
}

export default Node;
