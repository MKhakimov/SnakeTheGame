
const elementSnake = document.getElementById("snakeToMove");


function drawSnakeBody() { //добавляет div в html
  let frankenstein = '<div id="snakeToMove'+score+'" class="snake" style="margin-left:' + objSnake[objSnake.length-1].x*step + 'px; margin-top: ' +objSnake[objSnake.length-1].y*step + 'px;"></div>';
  if (score = 1){
    console.log('!!! Adding First Div !!!');
    let div = document.getElementById('mouseToMove');
    div.insertAdjacentHTML('afterend', '<div id="snakeToMove0" class="snake" style="margin-left: 0px; margin-top: 0px;"></div>');
    snakeDivId.push("snakeToMove"+score);
        console.log(snakeDivId);
  } else {
      console.log('!!! Adding New Div !!!');
      let div = document.getElementById('snakeToMove');
      div.insertAdjacentHTML('afterend', frankenstein);
      snakeDivId.push("snakeToMove"+score);
  }
};

function drawSnakeMove() { //прорисовка движения змеи
  for (let i=0; i<objSnake.length; i += 1){
    elementSnake.style.marginLeft = (objSnake[i].x)*step + "px";
    elementSnake.style.marginTop = (objSnake[i].y)*step + "px";
    for (let j=0; j<snakeDivId.length; j += 1){
      let bodyElement = document.getElementById(snakeDivId[j]);
      console.log(bodyElement);
      bodyElement.style.marginLeft = (objSnake[i].x)*step + "px";
      bodyElement.style.marginTop = (objSnake[i].y)*step + "px";
    }
  }
};
function drawSnakeMove() { //прорисовка движения змеи
  for (let i=0; i<objSnake.length; i += 1){
      let bodyElement = document.getElementById("snakeDivId1");
      console.log('ffff  ', bodyElement);
      bodyElement.style.marginLeft = (objSnake[i].x)*step + "px";
      bodyElement.style.marginTop = (objSnake[i].y)*step + "px";
  }
};

// console.log('Оп Бля');
// let elem = document.getElementById("snakeToMove");
// elem.parentNode.removeChild(elem);
// objMouse.x = getRandomInt(-8, 8);
// objMouse.y = getRandomInt(-8, 8);
// mouseEl.setAttribute('style', 'left:' + step*objMouse.x + 'px');
// mouseEl.style.top= 50*objMouse.y + 'px';
//
// // elementMouse.style.marginLeft = JSON.stringify(objMouse.x)*step + "px";
// // elementMouse.style.marginTop = JSON.stringify(objMouse.y)*step + "px";
//
// let mouseEl = document.createElement("div");
// mouseEl.className = 'mouse'
// wrapper.appendChild(mouseEl);
// mouseEl.setAttribute('style', 'left:' + step*objMouse.x + 'px');
// mouseEl.style.top= step*objMouse.y + 'px';
//
//
// let elem = document.getElementById("snakeToMove");
// elem.parentNode.removeChild(elem);
// ----
