class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents(pos) {
    const posArr = pos.split(",");
    this.game.playMove([Number(posArr[0]), Number(posArr[1])]);
  }

  makeMove($square) {
    debugger
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
