import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const start = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let valueForTimer = {};
let interval = null;
let chosenDates = 0;

start.disabled = true;

start.addEventListener('click', timerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      alert('Please choose a date in the future');
    } else {
      start.disabled = false;
      chosenDates = selectedDates[0].getTime();
    }
  },
};
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
  valueForTimer = { days, hours, minutes, seconds };
  return;
}
function timerStart() {
  interval = setInterval(() => {
    let time = chosenDates - Date.now();
    if (time < 1000) {
      clearInterval(interval);
      console.log('hello');
    }
    convertMs(time);
    const arrValue = Object.values(valueForTimer).map(elem =>
      elem.toString().padStart(2, '0')
    );
    timerDays.textContent = arrValue[0];
    timerHours.textContent = arrValue[1];
    timerMinutes.textContent = arrValue[2];
    timerSeconds.textContent = arrValue[3];
  }, 1000);
}

flatpickr('#datetime-picker', options);
