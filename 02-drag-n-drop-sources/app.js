(() => {
// const item = document.querySelector('.item'); 
const placeholders = document.querySelectorAll('.placeholder');

const block = document.querySelector('.block');

let item;

block.addEventListener('mousedown', ({ target }) => {
  if (target.closest('.item')) {
    const elem = target.closest('.item');
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
    item = elem;
    
  }
  
});

// item.addEventListener('dragstart', dragStart);
// item.addEventListener('dragend', dragEnd);

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver);
  placeholder.addEventListener('dragenter', dragEnter);
  placeholder.addEventListener('dragleave', dragLeave);
  placeholder.addEventListener('drop', dragDrop);
};

function dragStart({ target }) {
  target.classList.add('hold');
  setTimeout(() => target.classList.add('hide'), 0);
};

function dragEnd({ target }) {
  target.classList.remove('hide', 'hold')
};

function dragOver(e) {
  e.preventDefault();
}
function dragEnter({ target }) {
  target.classList.add('hover')
}
function dragLeave({ target }) {
  target.classList.remove('hover')
}
function dragDrop({ target }) {
  target.classList.remove('hover')
  target.append(item);
}
})();