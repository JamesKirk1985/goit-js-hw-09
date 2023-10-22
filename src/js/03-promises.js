const form = document.querySelector('.form');
form.addEventListener('submit', clickHandler);

function clickHandler(event) {
  event.preventDefault();
  delay = form.elements.delay.value;
  step = form.elements.step.value;
  amount = form.elements.amount.value;
  for (let i = 1; i <= amount; i += 1) {
    position = i;
    delay = Number(delay) + i * step;
    createPromise(position, delay);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
