/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if(typeof(string) === "string") {
      return this.nodes.forEach((node) => node.innerHTML = string);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    return this.html("");
  }

  append(arg){
    if(typeof(arg) === "string") {
      this.nodes.forEach((node) => node.innerHTML += arg);
    } else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach((node) => {
        arg.nodes.forEach((node2) => {
          node.innerHTML += node2.outerHTML;
        });
      });
    } else {
      this.nodes.forEach((node) => {
        arg.nodes.forEach((node2) => {
          node.innerHTML += $l(node2).outerHTML;
        });
      });
    }
  }

  attr(...args) {
    if (args.length === 2) {
      this.nodes.forEach((node => node.setAttribute(args[0], args[1])));
    } else {
      return this.nodes[0].getAttribute(args[0]);
    }
  }

  addClass(className) {
    this.nodes.forEach ((node) => {
      node.classList += " " + className;
    });
  }

  removeClass(className) {
    this.nodes.forEach ((node) => {
      if (className === undefined){
        node.classList = "";
      } else {
      node.classList.remove(className);
      }
    });
  }

  children() {
    let list = [];

    this.nodes.forEach ((node) => {
      list.push(node.children);
    });

    return $l(list);
  }

  parent() {
    let list = [];

    this.nodes.forEach ((node) => {
      if (!(list.includes(node))){
        list.push(node.parentElement);
      }
    });
    return $l(list);
  }

  find(selector) {
    const selected = $l(document.querySelectorAll(selector));
    return selected.children();
  }

  remove() {
    this.empty();
    this.nodes.forEach ((node) => {
      node.remove();
    });
  }

  on(eventName, callback) {
    this.nodes.forEach((node) => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqlevents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.nodes.forEach((node) => {
      const eventKey = `jqlevents-${eventName}`;

      if (node[eventKey]) {
        node[eventKey].forEach((callback) => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

}


module.exports = DOMNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__ (/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");

const docReadyQueue = [];
let docReady = false;

$l = (arg) => {
  switch (typeof arg) {
    case "object":
    if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    }
    case "string":
      const nodes = document.querySelectorAll(arg);
      return new DOMNodeCollection(Array.from(nodes));
    case "function":
      if (!docReady) {
        docReadyQueue.push(arg);
      } else {
        arg();
      }
  }
};

$l.extend = (base, ...addObjects) => {
  addObjects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      base[key] = obj[key];
    });
  });
  return base;
};

$l.ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  xhr.open(options.method, options.url, true);
  //
  // if (options.method === "GET") {
  //   options.url += `?${toQueryString(options.data)}`;
  // }

  xhr.onload = e => {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
};


document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyQueue.forEach((func) => func());
});


window.$l = $l;




// game file

const View = __webpack_require__(/*! ./ttt-view.js */ "./lib/ttt-view.js");
const Game = __webpack_require__(/*! ../solution/game.js */ "./solution/game.js");

$l( () => {
  const newGame = new Game();
  const newView = new View(newGame, $l('figure'));
  newView.setupBoard();

  $l("li").on("click", (e) => {
    // if () {
    //
    // }

    if (newView.game.isOver()) {

    } else {

      const pos = newView.bindEvents($l(e.target).attr('pos') || $l(e.target.parentElement).attr('pos'));
      newView.makeMove($l(`[pos="${pos}"]`));
      if (newView.game.isOver()) {
        newView.game.board.fourMarks.forEach((pos) => {
          $l(`[pos="${pos}"]`).addClass("won");
        });
        $l('li').addClass('no-cursor');
        $l('li').addClass('no-hover');
      }
    }
  });

  $l(".reset-button").on("click", (e) => {
    $l('figure').empty();
    const newGame = new Game();
    const newView = new View(newGame, $l('figure'));
    newView.setupBoard();

    $l("li").on("click", (e) => {

      if (newView.game.isOver()) {

      } else {
        const pos = newView.bindEvents($l(e.target).attr('pos') || $l(e.target.parentElement).attr('pos'));
        newView.makeMove($l(`[pos="${pos}"]`));
        if (newView.game.isOver()) {
          newView.game.board.fourMarks.forEach((pos) => {
            $l(`[pos="${pos}"]`).addClass("won");
          });
          $l('li').addClass('no-cursor');
          $l('li').addClass('no-hover');
        }
      }
    });
  });

});


/***/ }),

/***/ "./lib/ttt-view.js":
/*!*************************!*\
  !*** ./lib/ttt-view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents(pos) {
    const posArr = pos.split(",");
    return this.game.playMove([Number(posArr[0]), Number(posArr[1])]);
  }

  makeMove($square) {
    $square.append(`<main class=${this.game.currentPlayer}>`);
  }

  setupBoard() {
    const board = this.game.board;
    $l('figure').append('<ul>');
    for (let i = 0; i < 42; i++) {
      $l('ul').append('<li>');
    }

    $l('li').append('<article>')

    $l(Object.values($l("li"))[0][0]).attr('pos', [0, 0]);
    $l(Object.values($l("li"))[0][1]).attr('pos', [0, 1]);
    $l(Object.values($l("li"))[0][2]).attr('pos', [0, 2]);
    $l(Object.values($l("li"))[0][3]).attr('pos', [0, 3]);
    $l(Object.values($l("li"))[0][4]).attr('pos', [0, 4]);
    $l(Object.values($l("li"))[0][5]).attr('pos', [0, 5]);
    $l(Object.values($l("li"))[0][6]).attr('pos', [0, 6]);

    $l(Object.values($l("li"))[0][7]).attr('pos', [1, 0]);
    $l(Object.values($l("li"))[0][8]).attr('pos', [1, 1]);
    $l(Object.values($l("li"))[0][9]).attr('pos', [1, 2]);
    $l(Object.values($l("li"))[0][10]).attr('pos', [1, 3]);
    $l(Object.values($l("li"))[0][11]).attr('pos', [1, 4]);
    $l(Object.values($l("li"))[0][12]).attr('pos', [1, 5]);
    $l(Object.values($l("li"))[0][13]).attr('pos', [1, 6]);

    $l(Object.values($l("li"))[0][14]).attr('pos', [2, 0]);
    $l(Object.values($l("li"))[0][15]).attr('pos', [2, 1]);
    $l(Object.values($l("li"))[0][16]).attr('pos', [2, 2]);
    $l(Object.values($l("li"))[0][17]).attr('pos', [2, 3]);
    $l(Object.values($l("li"))[0][18]).attr('pos', [2, 4]);
    $l(Object.values($l("li"))[0][19]).attr('pos', [2, 5]);
    $l(Object.values($l("li"))[0][20]).attr('pos', [2, 6]);

    $l(Object.values($l("li"))[0][21]).attr('pos', [3, 0]);
    $l(Object.values($l("li"))[0][22]).attr('pos', [3, 1]);
    $l(Object.values($l("li"))[0][23]).attr('pos', [3, 2]);
    $l(Object.values($l("li"))[0][24]).attr('pos', [3, 3]);
    $l(Object.values($l("li"))[0][25]).attr('pos', [3, 4]);
    $l(Object.values($l("li"))[0][26]).attr('pos', [3, 5]);
    $l(Object.values($l("li"))[0][27]).attr('pos', [3, 6]);

    $l(Object.values($l("li"))[0][28]).attr('pos', [4, 0]);
    $l(Object.values($l("li"))[0][29]).attr('pos', [4, 1]);
    $l(Object.values($l("li"))[0][30]).attr('pos', [4, 2]);
    $l(Object.values($l("li"))[0][31]).attr('pos', [4, 3]);
    $l(Object.values($l("li"))[0][32]).attr('pos', [4, 4]);
    $l(Object.values($l("li"))[0][33]).attr('pos', [4, 5]);
    $l(Object.values($l("li"))[0][34]).attr('pos', [4, 6]);

    $l(Object.values($l("li"))[0][35]).attr('pos', [5, 0]);
    $l(Object.values($l("li"))[0][36]).attr('pos', [5, 1]);
    $l(Object.values($l("li"))[0][37]).attr('pos', [5, 2]);
    $l(Object.values($l("li"))[0][38]).attr('pos', [5, 3]);
    $l(Object.values($l("li"))[0][39]).attr('pos', [5, 4]);
    $l(Object.values($l("li"))[0][40]).attr('pos', [5, 5]);
    $l(Object.values($l("li"))[0][41]).attr('pos', [5, 6]);

    $l('li').addClass('square');
  }
}



module.exports = View;


/***/ }),

/***/ "./solution/board.js":
/*!***************************!*\
  !*** ./solution/board.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MoveError = __webpack_require__(/*! ./moveError */ "./solution/moveError.js");

class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      throw new MoveError("Is not valid position!");
    }
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


/***/ }),

/***/ "./solution/game.js":
/*!**************************!*\
  !*** ./solution/game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./board */ "./solution/board.js");
const MoveError = __webpack_require__(/*! ./moveError */ "./solution/moveError.js");

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
    }

    while (posX > 0 && this.board.grid[posX][[pos[1]]] !== null) {
      posX -= 1;
    }

    this.board.placeMark([posX, pos[1]], this.currentPlayer);
    this.swapTurn();
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


/***/ }),

/***/ "./solution/moveError.js":
/*!*******************************!*\
  !*** ./solution/moveError.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const MoveError = function (msg) {
  this.msg = msg;
};

module.exports = MoveError;


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map