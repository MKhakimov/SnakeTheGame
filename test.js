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
            moveMouse();
            objSnake.push({x:0, y:0});
            console.log('PUSH!');
        }
      } else { //движение тела перестановкой значений
          objSnake[i] = prevTile;
          }
      prevTile = currTile;
    }
    if (objSnake[0].x !== area.WIDTH && objSnake[0].y !== (area.HEIGHT) && objSnake[0].x !== area.WIDTH*(-1) && objSnake[0].y !== (area.HEIGHT*-1)){
      elementSnake.style.marginLeft = (objSnake[0].x)*step + "px";
      elementSnake.style.marginTop = (objSnake[0].y)*step + "px";
    }
    else {
      alert("You lose");
    }
  }
};
const myConstolSnake = function() {
  return controlSnake(axi, dir);
};

let timerId = setInterval(myConstolSnake, 1000);

function moveMouse() {
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
