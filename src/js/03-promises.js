const form = document.querySelector('.form');
form.addEventListener('submit', clickHandler);

function clickHandler(event) {
  event.preventDefault();
  let delayStart = form.elements.delay.value;
  let step = form.elements.step.value;
  let amount = form.elements.amount.value;
  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    let delay = Number(delayStart) + (i - 1) * step;
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
  })
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
