const elementSnake = document.getElementById("snakeToMove");
const elementMouse = document.getElementById("mouseToMove");
console.log(elementMouse);


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
const area = { //высотка и ширина в шагах
  WIDTH: 6 ,
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
}
moveMouse();
elementMouse.style.marginTop = (objMouse.x)*step + "px";
elementMouse.style.marginLeft = (objMouse.y)*step + "px";


function key(b){
  switch(b.keyCode){
    case keys.LEFT:
      console.log('case1');
      if (lastMove !== 'right'){
          console.log('case2');
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
}

function controlSnake(axis, vector){
  console.log('go!');
  if (tick===0){ //начало, логическое добавление головы
    objSnake.push({x:0, y:0});
    objSnake[0][axis] += vector;
    tick += 1;
  } else { //логическое движение
    let prevTile;
    for (let i=0; i<objSnake.length; i += 1){
      let currTile = Object.assign({}, objSnake[i]);
      if (i===0){ //направление и движение головы
        objSnake[i][axis] += vector;
      console.log(JSON.stringify(objSnake[i]));
      console.log(JSON.stringify(objMouse));
        if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){
            moveMouse();
            elementMouse.style.marginTop = (objMouse.x)*step + "px";
            elementMouse.style.marginLeft = (objMouse.y)*step + "px";
            console.log('mouse now in ', JSON.stringify(objMouse));
            objSnake.push({x:0, y:0});
            console.log('push');
        }
      } else { //движение тела перестановкой значений
        objSnake[i] = prevTile;
      }
      prevTile = currTile;
    }  console.log(JSON.stringify(objSnake));
  }
  console.log(JSON.stringify(objSnake));
  if (objSnake[0].x !== area.WIDTH && objSnake[0].y !== (area.HEIGHT) && objSnake[0].x !== area.WIDTH*(-1) && objSnake[0].y !== (area.HEIGHT*-1)){
    elementSnake.style.marginLeft = (objSnake[0].x)*step + "px";
    elementSnake.style.marginTop = (objSnake[0].y)*step + "px";
  }
  else {
    alert("You lose");
  }
}

const myConstolSnake = function() {
  return controlSnake(axi, dir);
};


let timerId = setInterval(myConstolSnake, 1000);

function moveMouse() {
  console.log('Оп Бля');
    objMouse.x = getRandomInt(-8 , 8);
    elementMouse.style.marginLeft = objMouse[0] + "px";
    objMouse.y = getRandomInt(-6, 6);
    elementMouse.style.marginTop = objMouse[1] + "px";
}

function getRandomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
document.addEventListener("keydown", key);

// linear
        /*      /--------> x
               |
              |   (x,y)
             |
           y\/              */
