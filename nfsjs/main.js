'use strict';

const HEIGHT_EL = 80;
const fibo = (n) => n <= 2 ? 1 : fibo(n-1) + fibo(n-2);

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');
car.classList.add('car');

const sound = new Audio('audio.mp3');
const dtp = new Audio('audiodtp.mp3');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 7,
  traffic: 3,
};

function getQuantityElems(heightEl) {
  return gameArea.offsetHeight / heightEl;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(line => {
    line.y += setting.speed;
    line.style.top = line.y + 'px'; 
    if (line.y >= document.documentElement.clientHeight) {
      line. y = -HEIGHT_EL;
    }
  });
}

function moveEnemy(){
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(item => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (carRect.top <= enemyRect.bottom && 
      carRect.right >= enemyRect.left && 
      carRect.left <= enemyRect.right && 
      carRect.bottom >= enemyRect.top) {
      sound.pause();
      dtp.play();
      setting.start = false;
      start.classList.remove('hide');
      start.textContent = 'GO restart !';
      score.style.top = start.offsetHeight + 'px';
    }

    item.y += setting.speed / 3;
    item.style.top = item.y + 'px';

    if (item.y >= gameArea.offsetHeight) {
      item.y =  -HEIGHT_EL * setting.traffic;
      item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
    }
  });

  
}

function playGame() {
  
  if (setting.start) {

    setting.score += setting.speed - 5;
    score.innerHTML = 'SCORE<br>' + setting.score;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 15) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth - 15)) {
      setting.x += setting.speed;
    }

    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 15)) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 15) {
      setting.y -= setting.speed;
    }

    car.style.top = setting.y + 'px';
    car.style.left = setting.x + 'px';
    requestAnimationFrame(playGame);
  }
}

const getRandom = (num) => Math.floor(Math.random() * num + 1);
 
function startGame() {
  start.classList.add('hide');

  gameArea.innerHTML = '';
  score.style.top = 0;
  sound.play();
  sound.loop = true;


  for(let i = 0; i < getQuantityElems(HEIGHT_EL); i++){
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.height = (HEIGHT_EL / 2) + 'px';
    line.style.top = (i * HEIGHT_EL) + 'px';

    line.y = i * HEIGHT_EL;
    gameArea.append(line);
  }

  for (let i = 0; i < getQuantityElems(HEIGHT_EL * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -HEIGHT_EL * setting.traffic * (i + 1);
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
    enemy.style.background = `url('image/enemy${getRandom(7)}.png') center / cover no-repeat transparent`;
    gameArea.append(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.append(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px';
  car.style.top = 'auto';
  car.style.bottom = '10px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  
  requestAnimationFrame(playGame);
}

function startRun(e) {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    keys[e.key] = true;
  }
} 
function stopRun(e) {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    keys[e.key] = false;
  }
  
}

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

