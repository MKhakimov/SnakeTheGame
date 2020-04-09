const elementMouse = document.getElementById("mouseToMove");
const wrapper = document.getElementById("wrap4All");
const step = 50; // шаг свзязывающий логику и прорисовку)
let axi = 'x'; // координата для движения змеи (в начале игры)
let dir = 1;   // направление движения змеи (в начале игры)
let score = 0; // счёт, сколько мышей поймано
let lastMove; //
let tick = 0; // сколько движений произошло
let isStop = 0;
let objMouse = {
  x: 3,
  y: 3
};

const isEllInObj = (ell, obj, from) => { // проверка коллизии
  s = JSON.stringify(obj).slice(from*13)
  if (s.includes(JSON.stringify(ell))){
    return 1;
  } else {
      return 0;
    }
};

const makeObjSnake = (x, y) => {
  return {
    x: x,
    y: y
  }
}
let objSnake= [makeObjSnake(0, 0)];
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

let drowObj = (obj, place, size, className) => {
  let byClass = place.getElementsByClassName('className');
  while(byClass.length > 0){
    byClass[0].parentNode.removeChild(byClass[0]);
  }
  for (let i=0; i<obj.length; i += 1){
    let objEl = document.createElement("div");
    objEl.className = 'className';
    place.appendChild(objEl);
    objEl.setAttribute('style', 'left:' + size*obj[i].x + 'px');
    objEl.style.top= size*obj[i].y + 'px';
  }
};
// drowObj(objSnake, wrapper, step, 'snake');
// drowObj(objMouse, wrapper, step, 'mouse');
// drawMouseMove();
drowObj(objMouse, wrapper, step, 'mouse');

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
    // drawSnakeMove();
    drowObj(objSnake, wrapper, step, 'snake');
    console.log('SNAKE IN: ', JSON.stringify(objSnake));
    console.log('MOUSE IN: ', JSON.stringify(objMouse));
    if (isEllInObj(objSnake[0], objSnake, 1)){
      isStop = 1;
      alert("You lose! Snake eat itselves!");
    } else {
    if (objSnake[0].x !== area.WIDTH+1 && objSnake[0].y !== area.HEIGHT+1 && objSnake[0].x !== -1 && objSnake[0].y !== -1){
      // drawSnakeMove();
      console.log("snake is moving")
      if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){ // логическая поимка мыши
        do {
          objMouse.x = getRandomInt(0, area.WIDTH);
          objMouse.y = getRandomInt(0, area.HEIGHT);
        } while (isEllInObj(objMouse, objSnake, 0));
          // drawMouseMove();
          drowObj(objMouse, wrapper, step, 'mouse');
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
}
// const wrapper = document.getElementById("wrap4All");


//
// function drawSnakeMove(){
//   let sClass = wrapper.getElementsByClassName('snake');
//   while(sClass.length > 0){
//     sClass[0].parentNode.removeChild(sClass[0]);
//   }
//   for (let i=0; i<objSnake.length; i += 1){
//     let snakeEl = document.createElement("div");
//     snakeEl.className = 'snake';
//     wrapper.appendChild(snakeEl);
//     snakeEl.setAttribute('style', 'left:' + step*objSnake[i].x + 'px');
//     snakeEl.style.top= step*objSnake[i].y + 'px';
//   };
// };
//
// function drawMouseMove() { // перестановка div мыши при "поимке"
//   let sClass = wrapper.getElementsByClassName('mouse');
//   while(sClass.length > 0){
//     sClass[0].parentNode.removeChild(sClass[0]);
//   }
//   let mouseEl = document.createElement("div");
//   mouseEl.className = 'mouse';
//   wrapper.appendChild(mouseEl);
//   mouseEl.setAttribute('style', 'left:' + step*objMouse.x + 'px');
//   mouseEl.style.top= step*objMouse.y + 'px';
// };

function getRandomInt(min, max) { // получение рандомных координат для мыши
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const myControlSnake = function() {
  while(isStop === 0){ // сальтуха
    return controlSnake(axi, dir);
  }
};

let timerId = setInterval(myControlSnake, 1000/2);

document.addEventListener("keydown", key);

/* linear
                - - - - - > x
               |
               |    (x,y)
               |
             y V                                */
