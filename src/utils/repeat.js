import { doAsyncJob } from './async-job';

export default function repeat(chore, limit = Infinity, wait = 1000) {
  let count = 0;
  const task = () => {
    chore(count);
    count += 1;
  };
  const stopWhen = () => count === limit;
  return doAsyncJob(task, stopWhen, wait);
}
