const Board = require("./board");
const MoveError = require("./moveError");

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = Board.marks[0];
  }

  isOver() {
    return this.board.isOver();
  }

  playMove(pos) {
    let posX = pos[0];

    while (posX < 5 && this.board.grid[posX + 1][pos[1]] === null) {
      if (this.board.grid[posX + 1][pos[1]] === null) {
        posX += 1;
      }
      console.log("drop more!");
    }

    while (posX > 0 && this.board.grid[posX][[pos[1]]] !== null) {
      posX -= 1;
    }

    console.log("dropped");

    this.board.placeMark([posX, pos[1]], this.currentPlayer);
    this.swapTurn();
    console.log(this.currentPlayer);
    console.log(this.board);

    return [posX, pos[1]];
  }

  swapTurn() {
    if (this.currentPlayer === Board.marks[0]) {
      this.currentPlayer = Board.marks[1];
    } else {
      this.currentPlayer = Board.marks[0];
    }
  }

  winner() {
    return this.board.winner();
  }
}

module.exports = Game;
