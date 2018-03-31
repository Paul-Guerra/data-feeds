// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

export function chunk(job) {
  let { task, stop, wait } = job;
  return new Promise((resolve, reject) => {
    task();
    if (!stop()) {
      setTimeout(() => chunk(job), wait);
    }
  }).catch((e) => { job.reject(e); });
}

export default function doAsyncJob(task, stopWhenTrue, wait) {
  return new Promise((resolve, reject) => {
    let job = {
      task,
      resolve,
      reject,
      wait,
      stop: () => {
        let shouldStop = stopWhenTrue();
        if (shouldStop) resolve();
        return shouldStop;
      }
    };
    chunk(job);
  });
}

export function repeat(job, limit, wait = 1000) {
  let count = 0;
  const task = () => {
    job();
    count += 1;
  };
  const stopWhen = () => count === limit;
  return doAsyncJob(task, stopWhen, wait);
}
