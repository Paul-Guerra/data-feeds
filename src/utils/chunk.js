// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

export function chunk(job) {
  let { task, stop } = job;
  return new Promise((resolve, reject) => {
    task();
    if (!stop()) {
      setTimeout(() => chunk(job), 0);
    }
  }).catch((e) => { job.reject(e); });
}

export default function doAsyncJob(task, stopWhenTrue) {
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
