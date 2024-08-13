import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button');
const dateTimePicker = document.querySelector('#datetime-picker');
startButton.disabled = true;

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future!',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', startTimer);

function startTimer(event) {
  event.preventDefault();

  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: '',
        message: 'Timer is ower!',
      });
      dateTimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerInterface(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerInterface(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
}

function convertMs(ms) {
  //Number of miliseconds
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // days
  const days = Math.floor(ms / day);
  // hours
  const hours = Math.floor((ms % day) / hour);
  // minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}