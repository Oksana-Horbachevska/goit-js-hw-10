import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputElem = document.querySelector('.data-input');
const buttonElem = document.querySelector('[data-start]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');

let intervalId;
// let userData = new Date('2025-05-15T22:03:00');
let userData = null;

buttonElem.addEventListener('click', () => {
  buttonElem.disabled = true;
  inputElem.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const diff = userData - currentTime;
    const timeObj = convertMs(diff);
    const timeStr = timeToStr(diff);
    fieldDays.textContent = timeStr[0];
    fieldHours.textContent = timeStr[1];
    fieldMinutes.textContent = timeStr[2];
    fieldSeconds.textContent = timeStr[3];

    if (diff < 1000) {
      clearInterval(intervalId);
      inputElem.disabled = false;
      buttonElem.disabled = true;
    }
  }, 1000);
});

// ==================функція для підрахунку значень часу ====================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ==================функція для перетворення значень в рядок ====================
function timeToStr(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  let d = days.toString().padStart(2, '0');
  let h = hours.toString().padStart(2, '0');
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  let arr = [d, h, m, s];
  return arr;
}

// ==================ІНІЦІАЛІЗАЦІЯ БІБЛІОТЕКИ flatpickr ====================
const options = {
  enableTime: true, // Дозволити вибір часу
  time_24hr: true, // 24-годинний формат
  defaultDate: new Date(), // Поточна дата і час як початкова
  minuteIncrement: 1, // Крок вибору хвилин
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] <= now) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
      });
      // alert('Please choose a date in the future');
      buttonElem.disabled = true;
    } else {
      userData = selectedDates[0];
      buttonElem.disabled = false;
    }
    console.log('Обрано дату:', selectedDates[0]); // Об'єкт Date
  },
};

flatpickr('#datetime-picker', options);
