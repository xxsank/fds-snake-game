import {html, render} from 'lit-html';
import throttle from 'lodash.throttle';
import {ROWS, COLS, DIFFICULTY} from './config';
import SnakeGameLogic from './SnakeGameLogic';

import './index.css';

export default class SnakeGame {
  delay = 300;
  gameState = null;
  constructor() {
    this.handleKeydown = throttle(this.handleKeydown.bind(this), 100);
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
    const proceed = this.logic.nextState && this.logic.nextState();
    if (!proceed) {
      this.gameState = 'end';
      this.cleanup();
    } else {
      this.updateTable();
      this.timeoutID = setTimeout(this.handleTurn, this.delay);
    }
    this.draw();
  }

  init() {
    this.table = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
    this.logic = new SnakeGameLogic();
    document.addEventListener('keydown', this.handleKeydown);
    this.intervalID = setInterval(() => {
      this.delay *= 0.999 ** DIFFICULTY;
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
    render(this.template(), document.querySelector('#root'));
  }

  updateTable() {
    const {joints, fruit} = this.logic;

    if (!joints || !fruit) return;

    for (let r of this.table) {
      r.fill(null);
    }

    this.table[fruit.y][fruit.x] = 'fruit';

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
    return html`<div class="game ${this.gameState === 'end' ? 'end' : ''}">
      ${this.table.map(cols => html`
        <div class="row">
          ${cols.map(cell => html`<div class="cell ${cell === 'joint' ? 'joint' : cell === 'fruit' ? 'fruit' : ''}"></div>`)}
        </div>`)}
      <p>
        현재 길이: ${this.logic.joints.length}
      </p>
      ${this.gameState === 'end' ? html`<p>
        게임 끝
      </p>` : null}
    </div>`;
  }
}
