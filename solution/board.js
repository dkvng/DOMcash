const MoveError = require("./moveError");

class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      debugger
      throw new MoveError('Is not valid position!');
    }
    debugger
    return (this.grid[pos[0]][pos[1]] === null);
  }

  isOver() {
    if (this.winner() !== null) {
      return true;
    }

    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      for (let colIdx = 0; colIdx < 7; colIdx++) {
        if (this.isEmptyPos([rowIdx, colIdx])) {
          return false;
        }
      }
    }

    return true;
  }

  placeMark(pos, mark) {
    debugger
    if (!this.isEmptyPos(pos)) {

      debugger

      throw new MoveError('Is not an empty position!');
    }
    this.grid[pos[0]][pos[1]] = mark;
  }

  print() {
    const strs = [];
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const marks = [];
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        marks.push(
          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
        );
      }
      strs.push(`${marks.join('|')}\n`);
    }

    console.log(strs.join('-----\n'));
  }

  winner() {
    const posSeqs = [
      // horizontals
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // verticals
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]]
    ];

    for (let i = 0; i < posSeqs.length; i++) {
      const winner = this.winnerHelper(posSeqs[i]);
      if (winner !== null) {
        return winner;
      }
    }

    return null;
  }


// until out of bounds do {
//   if (pos) {
//
//   }
// }
//
// const posSeqs = [
//   // horizontals
//   [[0, 0], [0, 1], [0, 2], [0, 3]],
//   // verticals
//   [[0, 0], [1, 0], [2, 0], [3, 0]],
//   // diagonals
//   [[0, 0], [1, 1], [2, 2], [3, 3]],
//   [[3, 0], [2, 1], [1, 2], [0, 3]]
// ];
//
// for (var i = 0; i < array.length; i++) {
//   array[i]
// }
//
//
//
//   if (board[pos[0]][pos[1]] == board[pos[0] + 1][pos[1] + 1]) {
//
//   } else if (board[pos[0]][pos[1]] == board[pos[0] + 1][pos[1]]) {
//
//   } else if (board[pos[0]][pos[1]] == board[pos[0] + 1][pos[1]]) {
//
//   }

  winnerHelper(posSeq) {
    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
      const targetMark = Board.marks[markIdx];
      let winner = true;
      for (let posIdx = 0; posIdx < 3; posIdx++) {
        const pos = posSeq[posIdx];
        const mark = this.grid[pos[0]][pos[1]];

        if (mark != targetMark) {
          winner = false;
        }
      }

      if (winner) {
        return targetMark;
      }
    }

    return null;
  }

  static isValidPos(pos) {
    debugger

    return (0 <= pos[0]) &&
    (pos[0] < 6) &&
    (0 <= pos[1]) &&
    (pos[1] < 7);
  }

  static makeGrid() {
    const grid = [];

    for (let i = 0; i < 6; i++) {
      grid.push([]);
      for (let j = 0; j < 7; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }
}

Board.marks = ['x', 'o'];

module.exports = Board;
