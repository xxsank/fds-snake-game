export default class SnakeGameLogic {
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
