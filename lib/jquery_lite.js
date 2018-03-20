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

  on(action, callback) {
    this.nodes.forEach((node) => {
      node.addEventListener(action, callback);
      const eventName = `jqlevents-${eventName}`;
      if (typeof node[eventName] === "undefined") {
        node[eventName] = [];
      }
      node[eventName].push(callback);
    });
  }

  off(action) {
    this.nodes.forEach((node) => {
      const eventName = `jqlevents-${eventName}`;

      if (node[eventName]) {
        node[eventName].forEach((callback) => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventName] = [];
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
  console.log("swag")
  const newGame = new Game();
  const newView = new View(newGame, $l('figure'));
  newView.setupBoard();

  $l("li").on("click", (e) => {
    console.log("onclick");

    newView.bindEvents($l(e.target).attr('pos'));
    newView.makeMove($l(e.target));
    if (newView.game.isOver()) {
      alert(`${newView.game.winner} wins!`);
    }
    // let pos = $(e.target).data('pos');
    // newView.bindEvents(pos);
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
    this.game.playMove(pos);
  }

  makeMove($square) {
    console.log("makeMove");
    $square.append(`${this.game.currentPlayer}`);
  }

  setupBoard() {
    const board = this.game.board;
    $l('figure').append('<ul>');
    for (let i = 0; i < 9; i++) {
      $l('ul').append('<li>');
    }

    $l(Object.values($l("li"))[0][0]).attr('pos', [0, 0]);
    $l(Object.values($l("li"))[0][1]).attr('pos', [0, 1]);
    $l(Object.values($l("li"))[0][2]).attr('pos', [0, 2]);
    $l(Object.values($l("li"))[0][3]).attr('pos', [1, 0]);
    $l(Object.values($l("li"))[0][4]).attr('pos', [1, 1]);
    $l(Object.values($l("li"))[0][5]).attr('pos', [1, 2]);
    $l(Object.values($l("li"))[0][6]).attr('pos', [2, 0]);
    $l(Object.values($l("li"))[0][7]).attr('pos', [2, 1]);
    $l(Object.values($l("li"))[0][8]).attr('pos', [2, 2]);

    $l('li').addClass('square');
    $l(Object.values($l("li"))[0][8]).append('<article>');
    $l('article').addClass('clear');
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
      throw new MoveError('Is not valid position!');
    }

    return (this.grid[pos[0]][pos[1]] === null);
  }

  isOver() {
    if (this.winner() != null) {
      return true;
    }

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        if (this.isEmptyPos([rowIdx, colIdx])) {
          return false;
        }
      }
    }

    return true;
  }

  placeMark(pos, mark) {
    if (!this.isEmptyPos(pos)) {
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
    return (0 <= pos[0]) &&
    (pos[0] < 3) &&
    (0 <= pos[1]) &&
    (pos[1] < 3);
  }

  static makeGrid() {
    const grid = [];

    for (let i = 0; i < 3; i++) {
      grid.push([]);
      for (let j = 0; j < 3; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }
}

Board.marks = ['x', 'o'];

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
    this.board.placeMark(pos, this.currentPlayer);
    this.swapTurn();
    console.log(this.currentPlayer);

  }

  promptMove(reader, callback) {
    const game = this;

    this.board.print();
    console.log(`Current Turn: ${this.currentPlayer}`);

    reader.question('Enter rowIdx: ', rowIdxStr => {
      const rowIdx = parseInt(rowIdxStr);
      reader.question('Enter colIdx: ', colIdxStr => {
        const colIdx = parseInt(colIdxStr);
        callback([rowIdx, colIdx]);
      });
    });
  }

  run(reader, gameCompletionCallback) {
    this.promptMove(reader, move => {
      try {
        this.playMove(move);
      } catch (e) {
        if (e instanceof MoveError) {
          console.log(e.msg);
        } else {
          throw e;
        }
      }

      if (this.isOver()) {
        this.board.print();
        if (this.winner()) {
          console.log(`${this.winner()} has won!`);
        } else {
          console.log('NO ONE WINS!');
        }
        gameCompletionCallback();
      } else {
        // continue loop
        this.run(reader, gameCompletionCallback);
      }
    });
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

const MoveError = function (msg) { this.msg = msg; };

// MoveError really should be a child class of the built in Error object provided
// by Javascript, but since we haven't covered inheritance yet, we'll just
// let it be a vanilla Object for now!

module.exports = MoveError;


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map