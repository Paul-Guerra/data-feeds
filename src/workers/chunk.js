// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

function chunk(job) {
  let { task, stop } = job;
  task();
  if (!stop()) {
    setTimeout(() => chunk(job), 0);
  }
}

let results = [];

function doTask() {
  results.push(Date.now());
  if (results.length === 5) throw Error('My Bad');
  // console.log(results.length);
  return results;
}

function bigEnough() {
  return results.length >= 10;
}

function smallEnough() {
  return results.length >= 300;
}

function doAsyncJob(task, stopWhenTrue) {
  let resolveJob;

  let job = {
    task,
    stop: () => {
      let shouldStop = stopWhenTrue();
      if (shouldStop) resolveJob();
      return shouldStop;
    }
  };

  return new Promise((resolve, reject) => {
    resolveJob = resolve;
    chunk(job);
  }).catch(e => console.log('oops', e.message));
}


// chunk(doTask, bigEnough).then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));
// let job = makeAsyncJob(doTask, bigEnough);
// job.promise.then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));
// chunk(job);
// job.promise.then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));

// doAsyncJob(doTask, bigEnough).then(() => console.log('bigEnough Done!')).catch(() => console.log('big oops'));


module.exports = {
  chunk,
  doTask,
  bigEnough,
  results,
  doAsyncJob
};
