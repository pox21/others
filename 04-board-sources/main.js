const board = document.querySelector('#board');
const colors = [ '#51C0C0', '#8e44ad', '#95BFE8', '#3498db', '#471e93', '#2ecc71', '#A0E879'];

const SQUARES_NUMBER = 630;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('mouseover', setColor);
  square.addEventListener('mouseleave', removeColor);

  board.append(square);
};

function setColor({ target }) {
  const el = target;
  const color = colors[getRandom(colors.length)];
  el.style.backgroundColor = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 15px ${color}`;
}

function removeColor({ target }) {
  const el = target;
  el.style.backgroundColor = '#1d1d1d';
  el.style.boxShadow = `0 0 2px #000`;
}

function getRandom(num) {
  return Math.floor(Math.random() * num);
}