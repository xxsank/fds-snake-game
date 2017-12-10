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
    if (this._checkIfEnds(newHead)) {
      return false;
    } else if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
      this._pickNewFruit();
    } else {
      this.joints.pop();
    }
    this.joints.unshift(newHead);
    return true;
  }
  _checkIfEnds(newHead) {
    const boundaryCond = (
      newHead.x < 0 ||
      newHead.x >= COLS ||
      newHead.y < 0 ||
      newHead.y >= ROWS
    );
    const hitMyselfCond = this.joints.some(j => (
      newHead.x === j.x && newHead.y === j.y
    ));
    return boundaryCond || hitMyselfCond;
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
