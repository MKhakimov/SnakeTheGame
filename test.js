const elementSnake = document.getElementById("snakeToMove");
const elementMouse = document.getElementById("mouseToMove");

const makeObjSnake = (x, y) => {
  return {
    x: x,
    y: y
  }
}
const keys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
const area = { //высота и ширина в шагах
  WIDTH: 8 ,
  HEIGHT: 8
}
let snakeDivId = [];
let score = 0;
let step = 50;
let axi = 'x';
let dir = 1;
let lastMove;
let z=0;
let objSnake= [makeObjSnake(0, 0)];
let tick = 0;
let objMouse = {
  x: 3,
  y: 3
};
//moveMouse();
elementMouse.style.marginTop = (objMouse.y)*step + "px";
elementMouse.style.marginLeft = (objMouse.x)*step + "px";


function key(b){
  switch(b.keyCode){
    case keys.LEFT:
      if (lastMove !== 'right'){
        lastMove = 'left';
        axi = 'x';
        dir = -1;
      }
      break;
    case keys.UP:
      if (lastMove !== 'down'){
        lastMove = 'up';
        axi = 'y';
        dir = -1;
      }
      break;
    case keys.RIGHT:
      if (lastMove !== 'left'){
        lastMove = 'right';
        axi = 'x';
        dir = 1;
      }
      break;
    case keys.DOWN:
      if (lastMove !== 'up'){
        lastMove = 'down';
        axi = 'y';
        dir = 1;
      }
    break;
  }
};

function controlSnake(axis, vector){
  if (tick===0){ //начало, логическое добавление головы
    objSnake.push({x:0, y:0});
    objSnake[0][axis] += vector;
    tick += 1;
  } else { //логическое движение
    let prevTile;
    for (let i=0; i<objSnake.length; i += 1){
      let currTile = Object.assign({}, objSnake[i]);
      if (i===0){ //направление и движение головы + поимка мыши
        objSnake[i][axis] += vector;
        console.log('SNAKE IN: ', JSON.stringify(objSnake));
        console.log('MOUSE IN: ', JSON.stringify(objMouse));
        if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){
            drawMouseMove();
            score += 1;
            objSnake.push({x:0, y:0});
            drawSnakeBody();
            console.log('PUSH!');
        }
      } else { //движение тела перестановкой значений
          objSnake[i] = prevTile;
          }
      prevTile = currTile;
    }
    if (objSnake[0].x !== area.WIDTH && objSnake[0].y !== (area.HEIGHT) && objSnake[0].x !== area.WIDTH*(-1) && objSnake[0].y !== (area.HEIGHT*-1)){
      drawSnakeMove();
    }
    else {
      alert("You lose");
    }
  }
};
const myControlSnake = function() {
  return controlSnake(axi, dir);
};

let timerId = setInterval(myControlSnake, 1000);

function drawSnakeBody() {
 console.log('+divasdasd');
 let frankenstein = '<div id="snakeToMove'+score+'" class="snake" style="margin-left:' + objSnake[objSnake.length-1].x*step + 'px; margin-top: ' +objSnake[objSnake.length-1].y*step + 'px;"></div>';
 let div = document.getElementById('snakeToMove');
 div.insertAdjacentHTML('afterend', frankenstein);
 snakeDivId.push("snakeToMove"+score);
};

function drawSnakeMove() {
  for (let i=0; i<objSnake.length; i += 1){
    elementSnake.style.marginLeft = (objSnake[i].x)*step + "px";
    elementSnake.style.marginTop = (objSnake[i].y)*step + "px";
    for (let j=0; i<snakeDivId.length; i += 1){
      let bodyElement = document.getElementById(snakeDivId.j);
      bodyElement.style.marginLeft = (objSnake[j].x)*step + "px";
      bodyElement.style.marginTop = (objSnake[j].y)*step + "px";
    }
  }
};
function drawMouseMove() {
  console.log('Оп Бля');
  objMouse.x = getRandomInt(-8 , 8);
  objMouse.y = getRandomInt(-8, 8);
  elementMouse.style.marginLeft = JSON.stringify(objMouse.x)*step + "px";
  elementMouse.style.marginTop = JSON.stringify(objMouse.y)*step + "px";
};

function getRandomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
document.addEventListener("keydown", key);

// linear
        /*      /--------> x
               |
              |   (x,y)
             |
           y\/              */
