// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

export function chunk(job) {
  let { task, stop, wait } = job;
  return new Promise((resolve) => {
    task();
    if (!stop()) {
      setTimeout(() => chunk(job), wait);
    }
    resolve();
  }).catch(job.reject);
}

export function createJob(options) {
  let {
    task, stopWhenTrue, wait, resolve, reject
  } = options;
  return {
    task,
    stop: () => {
      let shouldStop = stopWhenTrue();
      if (shouldStop) resolve();
      return shouldStop;
    },
    wait,
    resolve,
    reject: e => reject(e)
  };
}
export function doAsyncJob(task, stopWhenTrue, wait = 0, exec = chunk) {
  return new Promise((resolve, reject) => {
    let job = createJob({
      task,
      stopWhenTrue,
      wait,
      resolve,
      reject
    });
    exec(job);
  });
}
