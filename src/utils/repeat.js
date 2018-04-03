import { doAsyncJob } from './async-job';

export default function repeat(job, limit = Infinity, wait = 1000) {
  let count = 0;
  const task = () => {
    job();
    count += 1;
  };
  const stopWhen = () => count === limit;
  return doAsyncJob(task, stopWhen, wait);
}
