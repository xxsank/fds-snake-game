import {ROWS, COLS} from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
  ];
  // 먹이의 좌표
  this.fruit = {x: 3, y: 5};
  // 누를때마다 저장될 좌표 변환
}

let to = {};
let bo = {};
let ri = {};
let le = {};

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  // 위버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y-1});
  to = this.joints.pop();
  console.log(to);
  
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  // 아래버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y+1});
  bo = this.joints.pop();
  console.log(bo);
  
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  // 왼쪽버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x-1 , y : this.joints[0].y});
  le = this.joints.pop();
  console.log(le);
  
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  // 오른쪽버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x+1 , y : this.joints[0].y});
  ri = this.joints.pop();
  console.log(ri);  
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  // console.log(this.joints[0]);
  
  if(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y){
    this.fruit = {x: Math.trunc(Math.random()*30), y: Math.trunc(Math.random()*20)};
    console.log(this.joints.slice(-1)[0]);
    
    // 위 버튼 툴렀을때
    if(this.joints.slice(-1)[0].y === to.y-1){
      this.joints.push(to);
      
    }
    // 아래 버튼 눌렀을때
    else if(this.joints.slice(-1)[0].y === bo.y+1 ){
      this.joints.push(bo);
    }
      
    // 왼쪽 버튼 눌럿을때
    else if(this.joints.slice(-1)[0].x === le.x-1){
      this.joints.push(le);
    }

    // 오른쪽 버튼 눌렀을때
    else if(this.joints.slice(-1)[0].x === ri.x+1){
      this.joints.push(ri);
    }


    
    
  }

  return true;
}

export default SnakeGameLogic;
