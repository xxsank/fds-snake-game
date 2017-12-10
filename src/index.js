import {html, render} from 'lit-html';

import './index.css';

class SnakeGameLogic {
  numOfRows = 20;
  numOfCols = 30;
  fruit = {x: 10, y: 10};
  joints = [{x: 0, y: 0}];
  direction = 'right';
  up() {
    this.direction = 'up';
  }
  down() {
    this.direction = 'down';
  }
  left() {
    this.direction = 'left';
  }
  right() {
    this.direction = 'right';
  }
  nextState() {
    const newHead = Object.assign({}, this.joints[0]);
    switch (this.direction) {
      case 'up':
        newHead.y--;
        break;
      case 'down':
        newHead.y++;
        break;
      case 'right':
        newHead.x++;
        break;
      case 'left':
        newHead.x--;
        break;
    }
    this.joints.pop();
    this.joints.unshift(newHead);
  }
  checkIfEnds() {
    return this.joints.some(j => (
      j.x < 0 || j.x >= this.numOfCols || j.y < 0 || j.y >= this.numOfRows
    ));
  }
}

class SnakeGame {
  delay = 300;

  constructor(logic) {
    const numOfRows = logic.numOfRows || 20;
    const numOfCols = logic.numOfCols || 30;
    this.table = new Array(numOfRows).fill(null).map(() => new Array(numOfCols).fill(null));
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleTurn = this.handleTurn.bind(this);
    this.logic = logic;
  }

  handleKeydown(e) {
    // console.log(`keydown: ${e.key}`);
    switch (e.key) {
      case 'ArrowUp':
        this.logic.up && this.logic.up();
        this.handleTurn();
        break;
      case 'ArrowDown':
        this.logic.up && this.logic.down();
        this.handleTurn();
        break;
      case 'ArrowLeft':
        this.logic.up && this.logic.left();
        this.handleTurn();
        break;
      case 'ArrowRight':
        this.logic.up && this.logic.right();
        this.handleTurn();
        break;
    }
  }

  handleTurn() {
    clearTimeout(this.timeoutID);
    this.logic.nextState && this.logic.nextState();
    this.logic.joints && this.applyJoints(this.logic.joints);
    if (this.logic.checkIfEnds && this.logic.checkIfEnds()) {
      // alert('게임끝'); // TODO: 끝난 상태
      this.cleanup();
    } else {
      this.draw();
      this.timeoutID = setTimeout(this.handleTurn, this.delay);
    }
  }

  init() {
    document.addEventListener('keydown', this.handleKeydown);
    this.intervalID = setInterval(() => {
      this.delay *= 0.999;
    }, 100);
    this.handleTurn();
  }

  cleanup() {
    document.removeEventListener('keydown', this.handleKeydown);
    clearTimeout(this.timeoutID);
    clearInterval(this.intervalID);
    this.logic.cleanup && this.logic.cleanup();
  }

  draw() {
    render(this.template(), document.querySelector('#game'));
  }

  applyJoints(joints) {
    for (let r of this.table) {
      r.fill(false);
    }

    for (let j of joints) {
      if (
        j.y < this.table.length
        && this.table[j.y]
        && j.x < this.table[j.y].length
      ) {
        this.table[j.y][j.x] = 'joint';
      }
    }

    return this.table;
  }

  template() {
    return html`<div>
      ${this.table.map(cols => html`
        <div class="row">
          ${cols.map(cell => html`<div class="cell ${cell === 'joint' ? 'joint' : cell === 'fruit' ? 'fruit' : ''}"></div>`)}
        </div>
      `)}
    </div>`;
  }
}

const game = new SnakeGame(new SnakeGameLogic());
game.init();

if (module.hot) {
  module.hot.dispose(() => {
    game.cleanup();
  })
}

export default game;
