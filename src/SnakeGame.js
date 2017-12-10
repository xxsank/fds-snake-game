import {html, render} from 'lit-html';
import {ROWS, COLS} from './config';
import './index.css';

export default class SnakeGame {
  delay = 300;

  constructor(Logic) {
    this.Logic = Logic;
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleTurn = this.handleTurn.bind(this);
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
    this.table = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
    this.logic = new this.Logic();
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
