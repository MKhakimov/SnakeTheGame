const elementSnake = document.getElementById("snakeToMove");
const elementMouse = document.getElementById("mouseToMove");
elementMouse.style.marginTop = 0 + "px";
elementMouse.style.marginLeft = 0 + "px";
elementSnake.style.marginTop = snakeArr[0] + "px";
elementSnake.style.marginLeft = snakeArr[1] + "px";

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

let z=0;
let objSnake= [makeObjSnake(0, 0)];
let tick = 0;
let objMouse = {
  x: 3,
  y: 3
}

let axi = 'x';
let dir = 1;
let lastMove;

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
  if (tick===0){
    objSnake.push({x:0, y:0});
    objSnake[0][axis] += vector;
    tick += 1;
    } else {
    let prevTile;
    for (let i=0; i<objSnake.length; i += 1){
      let currTile = Object.assign({}, objSnake[i]);
      if (i===0){
        objSnake[i][axis] += vector;
      console.log(JSON.stringify(objSnake[i]));
      console.log(JSON.stringify(objMouse));
        if (objSnake[0].x === objMouse.x && objSnake[0].y === objMouse.y){
            objSnake.push({x:0, y:0});
            console.log('push');
        }
      } else {
        objSnake[i] = prevTile;
      }
      prevTile = currTile;
    }  console.log(JSON.stringify(objSnake));
  }
  console.log(JSON.stringify(objSnake));
}

//function consoleLog(a, b) { console.log(a, b);}

const myConstolSnake = function() {
  return controlSnake(axi, dir);////
};
//let time = setInterval(myConstolSnake, 1500);
//let time = setInterval(controlSnake(axi, dir), 1500);
//let timerId = setInterval(console.log(axi), 1500);

let timerId = setInterval(myConstolSnake, 1500);

//setInterval(() => console.log("woohoo"), 1500)

document.addEventListener("keydown", key);

// linear
        /*      /--------> x
               |
              |   (x,y)
             |
           y\/              */
