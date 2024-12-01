function setCustomTimeout(timeInMilliseconds) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Timer is done and this is the custom message passed');
    }, timeInMilliseconds);
  });
  return promise;
}

setCustomTimeout(10000).then((data) => {
  console.log('promise is resolved');
  console.log('data passed from the promise is', data);
});
