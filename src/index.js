import {html, render} from 'lit-html';

import './index.scss';

const joints = [{x: 10, y: 2}, {x: 9, y: 2}, {x: 8, y: 2}, {x: 8, y: 3}];

class SnakeGame {
  constructor({numOfRows = 20, numOfCols = 30}) {
    this.table = new Array(numOfRows).fill(false).map(() => new Array(numOfCols).fill(false));
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown(e) {
    // console.log(`keydown: ${e.key}`);
  }

  init() {
    document.addEventListener('keydown', this.handleKeydown);
    this.draw();
  }

  cleanup() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  draw() {
    render(this.template(), document.querySelector('#game'));
  }

  applyJoints(joints) {
    for (let r of table) {
      r.fill(false);
    }

    for (let j of joints) {
      table[j.y][j.x] = true;
    }

    return table;
  }

  template() {
    return html`<div>
      ${this.table.map(cols => html`
        <div class="row">
          ${cols.map(cell => html`<div class="cell ${cell ? 'filled' : 'empty'}"></div>`)}
        </div>
      `)}
    </div>`;
  }
}

const game = new SnakeGame({});
game.init();

if (module.hot) {
  module.hot.dispose(() => {
    game.cleanup();
  })
}
