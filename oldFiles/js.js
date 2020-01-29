const elementSnake = document.getElementById("snakeToMove");
const elementMouse = document.getElementById("mouseToMove");
//console.log(elementSnake);
const step = 50;
const amtSteps = [8, 6]; //размерность поля в шагах
const edgeX = [0, step*amtSteps[0]]; // -400 400
const edgeY = [0, step*amtSteps[1]]; // -300 300
let score = 0;

let whereMouse = [4, 3];
const makeTile = (x, y, isHead = false) => {
  return {
    x: x,
    y: y,
    isHead: isHead
  };
}

//console.log(makeTile(0, 0, true))
// const head = {
//   x: 0,
//   y: 0,
//   isHead: true
// };
let snakeArr = [makeTile(0,0, true)];
//               x,y
/*const keys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}*/

elementMouse.style.marginTop = 0 + "px";
elementMouse.style.marginLeft = 0 + "px";
elementSnake.style.marginTop = snakeArr[0] + "px";
elementSnake.style.marginLeft = snakeArr[1] + "px";
function moveDiv(){ //должна двигать div исходя из значений в snakeArr

}

function moveSnake(axis, vector){
  //console.log("moveSnake get: ",axis, vector);
  if (snakeArr[0][axis] !== 0 && snakeArr[0][axis] !== edgeX[1]){
    snakeArr[0][axis] += 1*(vector);
  //  console.log(snakeArr[0][axis]);
    for (let i=1; i < snakeArr.length; i+=1){
      snakeArr[i][axis] += 1;
    }
  }
}

function keysDo(e){
  switch(e.keyCode){
      case keys.LEFT:
        moveSnake(1, -1);
        break;
      case keys.UP:
        moveSnake(0, -1);
        break;
      case keys.RIGHT:
        moveSnake(1, 1);
        break;
      case keys.DOWN:
        moveSnake(0, 1);
        break;
  }


  if (elementSnake.style.marginLeft === elementMouse.style.marginLeft
  && elementSnake.style.marginTop === elementMouse.style.marginTop){
    score += 1;
    snakeArr.push([snakeArr[0][0]-1,snakeArr[0][1]-1, false]); //как то сделать -1 по содержимому
    elementSnake.innerHTML = score;
    //addSnakeDiv();
    //console.log(elementSnake);
    moveMouse();
  }
}

function moveMouse() {
  //console.log('Оп Бля');
  /*if (whereMouse[1] != resolution[1] && whereMouse[0] != resolution[0] &&
  whereMouse[1] !== 0 && whereMouse[0] !== 0){*/
    whereMouse[0] = getRandomInt(-8 , 8)*step;
    elementMouse.style.marginLeft = whereMouse[0] + "px";
    whereMouse[1] = getRandomInt(-6, 6)*step;
    elementMouse.style.marginTop = whereMouse[1] + "px";
}

function getRandomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


function createSnakeBody() {
//  console.log('+divasdasd');
//  console.log(window);
  let wrapper = document.getElementById("wrap4All");
  wrapper.innerHTML += '<div class="element">Body</div>';
  // document.body.append(wrapper);
}
createSnakeBody();

document.addEventListener("keydown", keysDo);
