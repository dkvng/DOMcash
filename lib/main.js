const DOMNodeCollection = require ('./dom_node_collection.js');

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

const View = require("./ttt-view.js");
const Game = require("../solution/game.js");

$l( () => {
  const newGame = new Game();
  const newView = new View(newGame, $l('figure'));
  newView.setupBoard();

  $l("li").on("click", (e) => {
    const pos = newView.bindEvents($l(e.target).attr('pos'));
    newView.makeMove($l(`[pos="${pos}"]`));
    if (newView.game.isOver()) {
      alert(`${newView.game.winner} wins!`);
    }
  });
});
