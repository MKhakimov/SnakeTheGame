const elementMouse = document.getElementById("mouseToMove");
const wrapper = document.getElementById("wrap4All");
const makeObjSnake = (x, y) => {
  return {
    x: x,
    y: y
  }
}
let objSnake= [makeObjSnake(0, 0)];
let isStop = 0;
const keys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
const area = { //высота и ширина в шагах
  WIDTH: 16 ,
  HEIGHT: 12
}
let axi = 'x'; // координата для движения змеи (в начале игры)
let dir = 1;   // направление движения змеи (в начале игры)
let score = 0; // счёт, сколько мышей поймано
const step = 50; // шаг свзязывающий логику и прорисовку)
let lastMove; //
let tick = 0; // сколько движений произошло
let objMouse = {
  x: 3,
  y: 3
};
// elementMouse.style.marginTop = (objMouse.y)*step + "px";
// elementMouse.style.marginLeft = (objMouse.x)*step + "px";
drawMouseMove();
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
    //objSnake.push({x:0, y:0});
    objSnake[0][axis] += vector;
    tick += 1;
  } else { //логическое движение
      let prevTile;
      for (let i=0; i<objSnake.length; i += 1){
        let currTile = Object.assign({}, objSnake[i]);
        if (i===0){ //направление и движение головы + поимка мыши
          objSnake[i][axis] += vector;
        } else { //движение тела перестановкой значений
            objSnake[i] = prevTile;
          }
        prevTile = currTile;
      }
    }
    if ( !!objSnake.indexOf(objSnake[1]));
    drawSnakeMove();
    console.log('SNAKE IN: ', JSON.stringify(objSnake));
    console.log('MOUSE IN: ', JSON.stringify(objMouse));
    if (objSnake[0].x !== area.WIDTH+1 && objSnake[0].y !== area.HEIGHT+1 && objSnake[0].x !== -1 && objSnake[0].y !== -1){
      console.log("snake is moving")
      if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){ // логическая поимка мыши
          objMouse.x = getRandomInt(0, area.WIDTH);
          objMouse.y = getRandomInt(0, area.HEIGHT);
          drawMouseMove();
          score += 1;
          objSnake.push({x:0, y:0});
          console.log('PUSH!');
      }

    }
    else {
      isStop = 1;
      alert("You lose");
    }
}

function drawSnakeMove(){
  let sClass = wrapper.getElementsByClassName('snake');
  while(sClass.length > 0){
    sClass[0].parentNode.removeChild(sClass[0]);
  }
  for (let i=0; i<objSnake.length; i += 1){
    let snakeEl = document.createElement("div");
    snakeEl.className = 'snake';
    wrapper.appendChild(snakeEl);
    snakeEl.setAttribute('style', 'left:' + step*objSnake[i].x + 'px');
    snakeEl.style.top= step*objSnake[i].y + 'px';
  };
};

function drawMouseMove() { // перестановка div мыши при "поимке"
  let sClass = wrapper.getElementsByClassName('mouse');
  while(sClass.length > 0){
    sClass[0].parentNode.removeChild(sClass[0]);
  }
  let mouseEl = document.createElement("div");
  mouseEl.className = 'mouse';
  wrapper.appendChild(mouseEl);
  mouseEl.setAttribute('style', 'left:' + step*objMouse.x + 'px');
  mouseEl.style.top= step*objMouse.y + 'px';
};

function getRandomInt(min, max) { // получение рандомных координат для мыши
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const myControlSnake = function() {
  while(isStop === 0){ // сальтуха
    return controlSnake(axi, dir);
  }
};

let timerId = setInterval(myControlSnake, 1000);

document.addEventListener("keydown", key);

/* linear
                - - - - - > x
               |
               |    (x,y)
               |
             y V                                */
