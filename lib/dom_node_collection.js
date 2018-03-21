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
