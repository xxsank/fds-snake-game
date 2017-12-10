import {ROWS, COLS} from './config';

export default class SnakeGameLogic {
  constructor() {
    this._pickNewFruit();
  }
  joints = [{x: 0, y: 0}];
  _direction = 'right';
  up() {
    this._direction = 'up';
  }
  down() {
    this._direction = 'down';
  }
  left() {
    this._direction = 'left';
  }
  right() {
    this._direction = 'right';
  }
  nextState() {
    const newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y
    };
    switch (this._direction) {
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
    if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
      this._pickNewFruit();
    } else {
      this.joints.pop();
    }
    this.joints.unshift(newHead);
  }
  checkIfEnds() {
    return this.joints.some(j => (
      j.x < 0 || j.x >= COLS || j.y < 0 || j.y >= ROWS
    )) || this._checkIfDuplicateExists();
  }
  _checkIfDuplicateExists() {
    for (let i = 0; i < this.joints.length; i++) {
      for (let j = i + 1; j < this.joints.length; j++) {
        if (this.joints[i].x === this.joints[j].x && this.joints[i].y === this.joints[j].y) {
          return true;
        }
      }
    }
    return false;
  }
  _pickNewFruit() {
    let fruit = {}
    do {
      fruit.x = Math.floor(Math.random() * COLS);
      fruit.y = Math.floor(Math.random() * ROWS);
    } while (this.joints.some(j => j.x === fruit.x && j.y === fruit.y))
    this.fruit = fruit;
  }
}
