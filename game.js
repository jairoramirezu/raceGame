const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const bestTime = document.querySelector('#best');
const result = document.querySelector('#result');
const playerPosition = {
  x: undefined,
  y: undefined
}
const giftsPosition = {
  x: undefined,
  y: undefined
}
let bombPosition = []
let canvasSize;
let canvasElement;
let lvl = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;
const recordTime = localStorage.getItem('record_time');

const map={
  render:function () {
    if(lvl == maps.length){
      gameWin();
    }

    if (!timeStart) {
      timeStart = Date.now();
      timeInterval = setInterval(showTime, 100);
      showRecord();
    }

    const Map = maps[lvl]
      .match(/[IXO-]+/g)
      .map(item => item.split(""));

    showLives();
    game.font = canvasElement + "px 'Karla'";
    game.textAlign = "end";

    bombPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    Map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const rowI = canvasElement * (rowIndex + 1)
      const colI = canvasElement * (colIndex + 1)

      if (col === 'O' && !playerPosition.x && !playerPosition.y) {
          playerPosition.y = rowI,
          playerPosition.x = colI
      } else if (col === 'I') {
        giftsPosition.y = rowI,
        giftsPosition.x = colI
      } else if (col === 'X') {
        bombPosition.push({
          x: colI,
          y:rowI
        })
      }
      game.fillText(emojis[col], colI, rowI)
      })
    })
    movePlayer();
  }
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftsPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftsPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  const bombCollision = bombPosition.find(bomb => {
    const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
    const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
    return bombCollisionX && bombCollisionY;
  })

  giftCollision ? lvlUp() : '';
  bombCollision ? lvlFail() : '';

  game.fillText(emojis['PLAYER'],
  playerPosition.x,
  playerPosition.y
  )
}

function lvlUp() {
  lvl++;
  startGame();
}

function lvlFail() {
  lives --;
  if (lives <= 0) {
    lvl = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  clearInterval(timeInterval);
  alert('Terminaste el juego')

  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      bestTime.innerHTML = recordTime;
      result.innerHTML = 'Superaste el record =)';
    } else {
      result.innerHTML = 'Lo siento, no superaste el record =('
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    result.innerHTML = 'Primera vez? Trata de superar el tiempo!';
  }
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);
  spanLives.innerHTML = '';
  heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  bestTime.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    window.innerHeight > window.innerWidth
    ? canvasSize = window.innerWidth * 0.7
    : canvasSize = window.innerHeight * 0.7;

    canvasSize = Number(canvasSize.toFixed(1));

    canvas.setAttribute("height", canvasSize);
    canvas.setAttribute("width", canvasSize);
    canvasElement = canvasSize / 10.2;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    // solve problem in case you do resize to not start in the very first move
    //  check code https://codepen.io/Miguel-Mora/pen/YzabKMj
    startGame()
}

function startGame() {
    map.render();
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.code === 'ArrowDown') moveDown();
  else if (event.code === 'ArrowUp') moveUp();
  else if (event.code === 'ArrowRight') moveRight();
  else if (event.code === 'ArrowLeft') moveLeft();
}

function moveUp() {
  playerPosition.y - canvasElement < canvasElement
  ? ''
  : playerPosition.y -= canvasElement;
  startGame();
}
function moveLeft() {
  playerPosition.x - canvasElement < canvasElement
  ? ''
  : playerPosition.x -= canvasElement;
  startGame();
}
function moveRight() {
  playerPosition.x + canvasElement > canvasSize
  ? ''
  : playerPosition.x += canvasElement;
  startGame();
}
function moveDown() {
  playerPosition.y + canvasElement > canvasSize
  ? ''
  : playerPosition.y += canvasElement;
  startGame();
}