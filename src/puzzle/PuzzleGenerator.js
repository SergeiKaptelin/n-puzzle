import {isSolvable} from "./Puzzle";

class PuzzleGenerator {
  constructor(size) {
    this.size = size;
  }

  createShuffledIndexArray = () => {
    var indexArray = [];

    const length = this.size * this.size;
    for (var i = 0; i < length; i++) {
      indexArray.push(i);
    }
    return this.shuffle(indexArray);
  };

  shuffle = (array) => {
    var counter = array.length,
      temp,
      index;

    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  chunkArray = (arr, chunk_size) => {
    let myArray = [...arr];
    let results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  };

  generate = () => {
    let field = this.createShuffledIndexArray();
    let puzzleField = this.chunkArray(field, this.size);

    while(!isSolvable(puzzleField)) {
      field = this.createShuffledIndexArray();
      puzzleField = this.chunkArray(field, this.size);
    }
    return puzzleField;
  };
}

export default PuzzleGenerator;
