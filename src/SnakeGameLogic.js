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
  this.to = {};
  this.bo = {};
  this.ri = {};
  this.le = {};
  
  this.clickIdx = 4;
  this.newHead = {};
}


SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  this.clickIdx = 1;
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.clickIdx = 2;
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.clickIdx = 3;
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');  
  this.clickIdx = 4;
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  console.log(this.joints);
  // 방향 조작 로직
  if(this.clickIdx === 4){
    this.joints.unshift({x :this.joints[0].x+1 , y : this.joints[0].y});
    this.ri = this.joints.pop();
  }

  else if(this.clickIdx === 3){
    this.joints.unshift({x :this.joints[0].x-1 , y : this.joints[0].y});
    this.le = this.joints.pop();
  }

  else if(this.clickIdx === 2){
    this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y+1});
    this.bo = this.joints.pop();
  }

  else if(this.clickIdx === 1){
    this.joints.unshift({x :this.joints[0].x , y : this.joints[0].y-1});
    this.to = this.joints.pop();
  }

  // 게임이 끝났을 때 로직  
    //  벽면에 부딪혔을때 끝나는 로직
  if(this.joints[0].y === 20 || this.joints[0].y === -1) return false;
  if(this.joints[0].x === 30 || this.joints[0].x === -1) return false;

  // this.newHead = this.joints[0];
  // 몸을 부딪혔을때 끝나는 로직
  
  for(let i = 1 ; i<this.joints.length; i++){
      if(this.joints[0].x === this.joints[i].x && this.joints[0].y === this.joints[i].y){
        return false;
      }
  }

  // this.newHead = this.joints[0];
  // return this.joints.some((item,index.) => item.x === this.newHead.x && item.y === this.newHead.y);

  // 과일을먹고 꼬리가 추가되는 로직
  if(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y){
    // 과일을 먹으면 랜덤으로 다른위치에 생성하는 코드
    this.fruit = {x: Math.trunc(Math.random()*30), y: Math.trunc(Math.random()*20)};
    
    // 위 버튼 툴렀을때
    if(this.clickIdx === 1){
      this.joints.push(this.to);
    }
    // 아래 버튼 눌렀을때
    else if(this.clickIdx === 2){
      this.joints.push(this.bo);
    }
      
    // 왼쪽 버튼 눌럿을때
    else if(this.clickIdx === 3){
      this.joints.push(this.le);
    }

    // 오른쪽 버튼 눌렀을때
    else if(this.clickIdx === 4){
      this.joints.push(this.ri);
    }
  }

  return true;
}

export default SnakeGameLogic;
