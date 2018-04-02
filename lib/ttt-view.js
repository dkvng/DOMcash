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
    if (this.game.currentPlayer ==='p1') {
      $l('article').removeClass('yellow');
      $l('article').addClass('red');
    } else {
      $l('article').removeClass('red');
      $l('article').addClass('yellow');
    }
  }

  setupBoard() {
    const board = this.game.board;
    $l('figure').append('<ul>');
    for (let i = 0; i < 42; i++) {
      $l('ul').append('<li>');
    }

    $l('li').append('<article>');
    $l('article').addClass('red');

    let total = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        $l(Object.values($l("li"))[0][total]).attr('pos', [i, j]);
        total += 1;
      }
    }

    $l('li').addClass('square');
  }
}



module.exports = View;
