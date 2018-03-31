const MoveError = require("./moveError");

class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      debugger;
      throw new MoveError("Is not valid position!");
    }
    debugger;
    return this.grid[pos[0]][pos[1]] === null;
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
    debugger;
    if (!this.isEmptyPos(pos)) {
      throw new MoveError("Is not an empty position!");
    }

    this.grid[pos[0]][pos[1]] = mark;
  }

  winner() {
    return this.verticalWin() ||
    this.horizontalWin() ||
    this.leftDiagonalWin() ||
    this.rightDiagonalWin();
  }

  leftDiagonalWin() {
    for (var col = 0; col < this.grid.length - 3; col++) {
      for (var row = 0; row < this.grid[0].length - 3; row++) {
        let posX = col;
        let posY = row;
        let marks = [];
        while (
          this.grid[posX][posY] === this.grid[posX + 1][posY + 1] &&
          Board.marks.includes(this.grid[posX][posY])
        ) {
          debugger;
          marks.push([posX, posY]);
          if (marks.length === 3) {
            marks.push([posX + 1, posY + 1]);
            this.fourMarks = marks;
            return true;
          }
          if (posX + 1 < this.grid.length && posY + 1 < this.grid[0].length) {
            posY += 1;
            posX += 1;
          }
        }
      }
    }
    return null;
  }

  rightDiagonalWin() {
    for (var col = 0; col < this.grid.length - 3; col++) {
      for (var row = 3; row < this.grid[0].length; row++) {

        let posX = col;
        let posY = row;
        let marks = [];

        while (
          this.grid[posX][posY] === this.grid[posX + 1][posY - 1] &&
          Board.marks.includes(this.grid[posX][posY])
        ) {
          debugger;
          marks.push([posX, posY]);
          if (marks.length === 3) {
            marks.push([posX + 1, posY - 1]);
            this.fourMarks = marks;
            return true;
          }
          if (posX + 1 < this.grid.length && posY -1 > 0) {
            posY -= 1;
            posX += 1;
          }
        }
      }
    }
    return null;
  }

  horizontalWin() {
    for (var col = 0; col < this.grid.length; col++) {
      for (var row = 0; row < this.grid[0].length - 3; row++) {
        let posX = col;
        let posY = row;
        let marks = [];
        while (
          this.grid[posX][posY] === this.grid[posX][posY + 1] &&
          Board.marks.includes(this.grid[posX][posY])
        ) {
          marks.push([posX, posY]);
          if (marks.length === 3) {
            marks.push([posX, posY + 1]);
            this.fourMarks = marks;
            return true;
          }
          if (posY + 1 < this.grid[0].length) {
            posY += 1;
          }
        }
      }
    }
    return null;
  }

  verticalWin() {
    for (var col = 0; col < this.grid.length - 3; col++) {
      for (var row = 0; row < this.grid[0].length; row++) {
        let posX = col;
        let posY = row;
        let marks = [];
        while (
          this.grid[posX][posY] === this.grid[posX + 1][posY] &&
          Board.marks.includes(this.grid[posX][posY])
        ) {
          marks.push([posX, posY]);
          if (marks.length === 3) {
            marks.push([posX + 1, posY]);

            this.fourMarks = marks;
            return true;
          }
          if (posX + 1 < this.grid[0].length) {
            posX += 1;
          }
        }
      }
    }
    return null;
  }

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
    return 0 <= pos[0] && pos[0] < 6 && 0 <= pos[1] && pos[1] < 7;
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

Board.marks = ["p1", "p2"];

module.exports = Board;
