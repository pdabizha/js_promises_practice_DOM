'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  document.addEventListener('click', () => {
    hasLeftClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    hasRightClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((error) => showMessage(error.message, 'error'));

secondPromise.then((message) => showMessage(message, 'success'));
thirdPromise.then((message) => showMessage(message, 'success'));

function showMessage(text, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = text;

  const body = document.querySelector('body');

  body.appendChild(div);
}
