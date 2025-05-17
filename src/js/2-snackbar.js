import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

// ===============функція створення промісу =================

function createPromise(value, isActive, delay) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (isActive) {
        res(value);
      } else {
        rej(value);
      }
    }, delay);
  });
  return promise;
}

// =============== основний код =================

formElem.addEventListener('submit', e => {
  e.preventDefault();

  const delay = e.target.elements.delay.value;

  const isActive = e.target.elements.state.value === 'fulfilled';

  const promise = createPromise(delay, isActive, delay);
  promise
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        messageColor: '#ffffff',
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
      });
    })
    .finally(() => {
      e.target.reset();
    });
});
