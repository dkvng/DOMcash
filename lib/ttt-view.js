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
    debugger
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
    // $l(Object.values($l("li"))[0][8]).append('<article>');
  }
}



module.exports = View;
