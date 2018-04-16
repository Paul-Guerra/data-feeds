// Repeatedly perform a given task until a condition is met
// broken into chunks of work to be non-blocking

export function chunk(job) {
  let {
    task,
    stop,
    output,
    wait
  } = job;
  // make each chunk a work a Promise so if a chunk errors
  // out we can cancel the whole job
  return new Promise((resolve) => {
    if (stop()) {
      resolve();
      job.resolve(output());
      return;
    }
    setTimeout(() => chunk(job), wait);
    resolve(task()); // resolves the task. Not the entire job.
  }).catch(e => job.reject(e));
}

export function createJob(options) {
  let {
    task, stop, output, wait, resolve, reject
  } = options;
  return {
    task: () => task(resolve, reject),
    stop,
    output,
    wait,
    resolve,
    reject
  };
}

export const defaultHandlers = {
  task: resolve => resolve(),
  stop: () => true,
  output: () => {}
};

export function doAsyncJob(handlers, wait = 0, exec = chunk) {
  return new Promise((resolve, reject) => {
    let job = createJob({
      task: handlers.task || defaultHandlers.task,
      stop: handlers.stop || defaultHandlers.stop,
      output: handlers.output || defaultHandlers.output,
      wait,
      resolve,
      reject
    });
    exec(job);
  });
}
