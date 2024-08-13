import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', createUserPromiseFoo);

function createUserPromiseFoo(event) {
  event.preventDefault();
  const userDelay = event.target.elements[0].value;
  const isPromiseFulfilled = event.target.elements[2].checked;

  const userPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isPromiseFulfilled) {
        resolve(userDelay);
      } else {
        reject(userDelay);
      }
    }, userDelay);
  });

  userPromise
    .then(userDelay =>
      iziToast.success({
        title: '',
        message: `Fulfilled promise in ${userDelay}ms`,
      })
    )
    .catch(userDelay =>
      iziToast.error({
        title: '',
        message: `Rejected promise in ${userDelay}ms`,
      })
    );

  form.reset();
}