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

let clickIdx = 4;

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  // 위버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y-1});
  to = this.joints.pop();
  clickIdx = 1;
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  // 아래버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y+1});
  bo = this.joints.pop();
  clickIdx = 2;
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  // 왼쪽버튼을 눌렀을때 동작할 좌표변환
  this.joints.unshift({x :this.joints[0].x-1 , y : this.joints[0].y});
  le = this.joints.pop();
  clickIdx = 3;
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  // 오른쪽버튼을 눌렀을때 동작할 좌표변환
  // this.joints.unshift({x :this.joints[0].x+1 , y : this.joints[0].y});
  // ri = this.joints.pop();
  clickIdx = 4;
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);


  if(clickIdx) 
  if(clickIdx === 4){
    this.joints.unshift({x :this.joints[0].x+1 , y : this.joints[0].y});
    ri = this.joints.pop();
  }











 
  // 게임이 끝났을 때 로직  
    //  벽면에 부딪혔을때 끝나는 로직
  if(this.joints[0].y === 20 || this.joints[0].y === -1) return false;
  if(this.joints[0].x === 30 || this.joints[0].x === -1) return false;

  console.log(this.joints[0]);
  console.log(this.joints[1]);
  console.log(this.joints[2]);

  // 몸을 부딪혔을때 끝나는 로직
  for(let i = 1 ; i<this.joints.length; i++){
    console.log(this.joints[i].x);
      if(this.joints[0].x === this.joints[i].x && this.joints[0].y === this.joints[i].y){
        return false;
      }
  }

  // 과일을먹고 꼬리가 추가되는 로직
  if(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y){

    this.fruit = {x: Math.trunc(Math.random()*30), y: Math.trunc(Math.random()*20)};
    
    // 위 버튼 툴렀을때
    if(clickIdx === 1){
      this.joints.push(to);
      
    }
    // 아래 버튼 눌렀을때
    else if(clickIdx === 2){
      this.joints.push(bo);
    }
      
    // 왼쪽 버튼 눌럿을때
    else if(clickIdx === 3){
      this.joints.push(le);
    }

    // 오른쪽 버튼 눌렀을때
    else if(clickIdx === 4){
      this.joints.push(ri);
    }
  }

  return true;
}

export default SnakeGameLogic;
