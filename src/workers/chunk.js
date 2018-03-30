// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

function chunk(task, isDone) {
  task();
  if (!isDone()) {
    setTimeout(() => chunk(task, isDone), 0);
    return;
  }
  console.log('Done!');
}

let results = [];

function doTask() {
  results.push(Date.now());
  console.log(results.length);
  return results;
}

function bigEnough() {
  return results.length >= 3000;
}

function smallEnough() {
  return results.length >= 300;
}

function makeAsyncJob(task, stopWhenTrue) {
  let resolveJob;
  let rejectJob;
  let promise = new Promise((resolve, reject) => {
    resolveJob = resolve;
    rejectJob = reject;
  });
  return {
    promise,
    task,
    stop: () => {
      let shouldStop = stopWhenTrue();
      if (shouldStop) resolveJob();
      return shouldStop;
    }
  };
}

// chunk(doTask, bigEnough).then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));
// let job = makeAsyncJob(doTask, bigEnough);
// job.promise.then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));
// chunk(job.task, job.stop);
// job.promise.then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));

module.exports = {
  chunk,
  doTask,
  bigEnough,
  results,
  makeAsyncJob
};
