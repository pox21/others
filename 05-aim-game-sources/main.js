const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const circleColors = [ '#51C0C0', '#8e44ad', '#95BFE8', '#3498db', '#471e93', '#2ecc71', '#A0E879'];

let score = 0;
let time = 0;

startBtn.addEventListener('click', (e) => {
  e.preventDefault();

  screens[0].classList.add('up')
});

timeList.addEventListener('click', ({target}) => {
  if (target.classList.contains('time-btn')) {
    time = parseInt(target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', ({target}) => {
  if(target.classList.contains('circle')) {
    score++;
    target.remove();
    createRandCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandCircle();
  setTime(time);
};

function decreaseTime() {

  if (time <= 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
};

function setTime(val) {
  timeEl.textContent = `00:${val}`;
};

function finishGame() {
  timeEl.parentNode.style.opacity = '0';
  board.innerHTML = `<div><h1>Finish Game</h1> <h2>счет - <span class="primary">${score}</span></h2><div><a class="start" id="restart">Restart</a></div>`;
  document.querySelector('#restart').addEventListener('click', () => {
    window.location.reload();
  });
};

function createRandCircle() {
  const circle = document.createElement('div');
  const size = getRandom(8, 25);

  const { width, height } = board.getBoundingClientRect();

  const x = getRandom(0, width - size);
  const y = getRandom(0, height - size);

  circle.classList.add('circle')

  
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  circle.style.background = `radial-gradient(circle, ${circleColors[getRandom(0, circleColors.length)]} 0%, ${circleColors[getRandom(0, circleColors.length)]} 47%, ${circleColors[getRandom(0, circleColors.length)]} 100%)`;
  console.log(`${circleColors[getRandom(0, circleColors.length)]}`)

  board.append(circle);
  setTimeout(() => {
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
  }, 500);
  
};

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}