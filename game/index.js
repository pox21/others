function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// массив путей к картинкам
const imgSrc = [
  'img/1.jpeg',
  'img/2.jpeg',
  'img/3.jpeg',
  'img/4.jpeg',
  'img/5.jpeg',
  'img/6.jpeg',
  'img/7.jpeg',
  'img/8.jpeg',
];

const arrElements = [];
const activeCards = [];

const timerEl = document.querySelector('.time');
const form = document.querySelector('.form');
const input = document.querySelector('.label__input');

const app = document.getElementById('app');

const substrate = document.querySelector('.substrate');
const gameRestart = document.querySelector('.game-restart');

let cardElements;

let time = 59;

let gameTime;

gameRestart.addEventListener('click', () => {
  document.location.reload();
});

// создание карточки с картинкой
const createCard = (id, imgSrc) => {
  
  const li = `
      <li class="card" data-id="${id}">
        <div class="card__item card__front"></div>
        <img class="card__item card__back" src="${imgSrc}">
      </li>
  `;
  return li;
};

// цикл для вывод карточек на страницу
// количество итераций зависит от длинны массива путей к картинкам

const satrtGame = (gameCards) => {
  
  // генерируем парные карточки 
  let cardNum = 0;
  for (let i = 0; i < gameCards; i++) {
      arrElements.push(createCard(cardNum, imgSrc[cardNum]));
      arrElements.push(createCard(cardNum, imgSrc[cardNum]));
      cardNum++;
      if (cardNum > 7) {
        cardNum = 0;
      }
  }
  

  gameTime = setInterval(() => {
    if (time < 0) {
      clearInterval(gameTime);
      substrate.insertAdjacentHTML('afterbegin' ,'<h2 class="game-over">Время вышло :( </h2>');
      substrate.classList.remove('visually-hidden');
      return true
    } else if(time > 10) {
      timerEl.textContent = `00:${time--}`;
    } else {
      timerEl.textContent = `00:0${time--}`;
    }
  }, 1000);
  
  shuffle(arrElements).forEach(el => app.insertAdjacentHTML('afterbegin', el));

  cardElements = document.querySelectorAll('.card');

  cardElements.forEach(card => {
    card.addEventListener('click', cardItem); 
    card.addEventListener('click', cardsRender);
    //const newArr = cardElements.filter(card => card.classList.contains('active'));
    
  });
};

const endGame = () => {
  for (const card of cardElements) {
    if (!card.classList.contains('active')) {
      return false;
    }
  }
  return true
};

const cardItem = ({target}) => {
  if (!target.closest('.card').classList.contains('active')) {
    target.closest('.card').classList.add('active');
    activeCards.push(target.closest('.active'));
  }
};

const cardsRender = () => {
  if (activeCards.length > 1) {
    if (+activeCards[0].dataset.id === +activeCards[1].dataset.id) {
       activeCards.forEach(el => {
         el.removeEventListener('click', cardItem);
         el.removeEventListener('click', cardsRender);
       });
      activeCards.splice('');
    } else {
      setTimeout(() => {
        activeCards.forEach(el => el.classList.remove('active'));
        activeCards.splice('');
      }, 400);
      
    }
  }
  if (endGame()) {
    clearInterval(gameTime);
    setTimeout(() => {
      substrate.insertAdjacentHTML('afterbegin' ,'<h2 class="game-over">Вы выиграли!</h2>');
      substrate.classList.remove('visually-hidden');
    }, 500);
  }
  
};


form.addEventListener('submit', e => {
  e.preventDefault();
  if (+input.value >= 2 && !(+input.value & 1) && +input.value <= 10) {
    let cardElements = 0;
    switch(+input.value) {
      case 2:
        cardElements = 2;
        app.classList.add('cards--4x4');
        break;
      case 4:
        cardElements = 8;
        app.classList.add('cards--4x4');
        break;
      case 6:
        cardElements = 18;
        app.classList.add('cards--6x6');
        break;
      case 8:
        cardElements = 32;
        app.classList.add('cards--8x8');
        break;
      case 10:
        cardElements = 50;
        app.classList.add('cards--10x10');
        break;
    }
    satrtGame(Number(cardElements));
    form.classList.add('visually-hidden');
  } else {
    input.classList.add('label__input--error');
    input.value = '';

  }
});
