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

    debugger
    while (posX < 5 && this.board.grid[posX + 1][pos[1]] === null) {
      debugger
      if (this.board.grid[posX + 1][pos[1]] === null) {
        posX += 1;
      }
      debugger
      console.log('drop more!');
    }

    console.log('dropped');

    this.board.placeMark([posX, pos[1]], this.currentPlayer);
    this.swapTurn();
    console.log(this.currentPlayer);
    console.log(this.board);
    debugger

    return [posX, pos[1]];

  }

  // promptMove(reader, callback) {
  //   const game = this;
  //   debugger
  //
  //   this.board.print();
  //   console.log(`Current Turn: ${this.currentPlayer}`);
  //
  //   reader.question('Enter rowIdx: ', rowIdxStr => {
  //     const rowIdx = parseInt(rowIdxStr);
  //     reader.question('Enter colIdx: ', colIdxStr => {
  //       const colIdx = parseInt(colIdxStr);
  //       callback([rowIdx, colIdx]);
  //     });
  //   });
  // }

  // run(reader, gameCompletionCallback) {
  //   this.promptMove(reader, move => {
  //     try {
  //       this.playMove(move);
  //     } catch (e) {
  //       if (e instanceof MoveError) {
  //         console.log(e.msg);
  //       } else {
  //         throw e;
  //       }
  //     }
  //
  //     if (this.isOver()) {
  //       this.board.print();
  //       if (this.winner()) {
  //         console.log(`${this.winner()} has won!`);
  //       } else {
  //         console.log('NO ONE WINS!');
  //       }
  //       gameCompletionCallback();
  //     } else {
  //       // continue loop
  //       this.run(reader, gameCompletionCallback);
  //     }
  //   });
  // }

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
