// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

let bigResults = [];
let smallResults = [];

function doTask(results) {
  // if (results.length === 5) throw Error('My Bad');
  results.push(Date.now());
  console.log(results.length);
  return results;
}

function isEnough(enough, results) {
  return results.length >= enough;
}

function chunk(job) {
  let { task, stop } = job;
  return new Promise((resolve, reject) => {
    task();
    if (!stop()) {
      setTimeout(() => chunk(job), 0);
    }
  }).catch((e) => { job.reject(e); });
}

function doAsyncJob(task, stopWhenTrue) {
  return new Promise((resolve, reject) => {
    let job = {
      task,
      resolve,
      reject,
      stop: () => {
        let shouldStop = stopWhenTrue();
        if (shouldStop) resolve();
        return shouldStop;
      }
    };
    chunk(job);
  });
}

doAsyncJob(() => doTask(bigResults), () => isEnough(30, bigResults))
  .then(() => console.log('isEnough(30) Done!'))
  .catch((e) => { console.log('oops', e.message); });

doAsyncJob(() => doTask(smallResults), () => isEnough(10, smallResults))
  .then(() => console.log('isEnough(10) Done!'))
  .catch((e) => { console.log('oops', e.message); });

module.exports = {
  chunk,
  doTask,
  isEnough,
  doAsyncJob,
  bigResults,
  smallResults
};
