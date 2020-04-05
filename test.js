const elementSnake = document.getElementById("snakeToMove");
const elementMouse = document.getElementById("mouseToMove");
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
  WIDTH: 8 ,
  HEIGHT: 8
}
let axi = 'x'; // координата для движения змеи в начале игры
let dir = 1;   // направление движения змеи в начале игры
let score = 0; // счёт, сколько мышей поймано
let step = 50; // шаг свзязывающий логику и прорисовку
let lastMove; //
let tick = 0; // сколько движений произошло
let objMouse = {
  x: 3,
  y: 3
};
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
    //drawSnakeMove();
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
    if (objSnake[0].x !== area.WIDTH && objSnake[0].y !== (area.HEIGHT) && objSnake[0].x !== area.WIDTH*(-1) && objSnake[0].y !== (area.HEIGHT*-1)){
      //drawSnakeMove();
      console.log("snake is moving")
    }
    else {
      // alert("You lose");
    }
    if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){ // логическая поимка мыши
        drawMouseMove();
        score += 1;
        objSnake.push({x:0, y:0});
        //drawSnakeBody();
        console.log('PUSH!');
    }
  }
  console.log('SNAKE IN: ', JSON.stringify(objSnake));
  console.log('MOUSE IN: ', JSON.stringify(objMouse));
};

// function drawSnakeBody() { //добавляет div в html
//   let frankenstein = '<div id="snakeToMove'+score+'" class="snake" style="margin-left:' + objSnake[objSnake.length-1].x*step + 'px; margin-top: ' +objSnake[objSnake.length-1].y*step + 'px;"></div>';
//   if (score = 1){
//     console.log('!!! Adding First Div !!!');
//     let div = document.getElementById('mouseToMove');
//     div.insertAdjacentHTML('afterend', '<div id="snakeToMove0" class="snake" style="margin-left: 0px; margin-top: 0px;"></div>');
//     snakeDivId.push("snakeToMove"+score);
//         console.log(snakeDivId);
//   } else {
//       console.log('!!! Adding New Div !!!');
//       let div = document.getElementById('snakeToMove');
//       div.insertAdjacentHTML('afterend', frankenstein);
//       snakeDivId.push("snakeToMove"+score);
//   }
// };

// function drawSnakeMove() { //прорисовка движения змеи
//   for (let i=0; i<objSnake.length; i += 1){
//     elementSnake.style.marginLeft = (objSnake[i].x)*step + "px";
//     elementSnake.style.marginTop = (objSnake[i].y)*step + "px";
//     for (let j=0; j<snakeDivId.length; j += 1){
//       let bodyElement = document.getElementById(snakeDivId[j]);
//       console.log(bodyElement);
//       bodyElement.style.marginLeft = (objSnake[i].x)*step + "px";
//       bodyElement.style.marginTop = (objSnake[i].y)*step + "px";
//     }
//   }
// };
// function drawSnakeMove() { //прорисовка движения змеи
//   for (let i=0; i<objSnake.length; i += 1){
//       let bodyElement = document.getElementById("snakeDivId1");
//       console.log('ffff  ', bodyElement);
//       bodyElement.style.marginLeft = (objSnake[i].x)*step + "px";
//       bodyElement.style.marginTop = (objSnake[i].y)*step + "px";
//   }
// };

function drawMouseMove() { // перестановка div мыши при "поимке"
  console.log('Оп Бля');
  objMouse.x = getRandomInt(-8 , 8);
  objMouse.y = getRandomInt(-8, 8);
  elementMouse.style.marginLeft = JSON.stringify(objMouse.x)*step + "px";
  elementMouse.style.marginTop = JSON.stringify(objMouse.y)*step + "px";
};

function getRandomInt(min, max) { // получение рандомных координат для мыши
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const myControlSnake = function() { // сальтуха
  return controlSnake(axi, dir);
};
let timerId = setInterval(myControlSnake, 1000);

document.addEventListener("keydown", key);

/* linear
                - - - - - > x
               |
               |    (x,y)
               |
             y V                                */
