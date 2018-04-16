import { makeAsyncJob } from './async-job';

export default function repeat(chore, limit = Infinity, wait = 0) {
  let count = 0;
  const task = (...args) => {
    chore(count, ...args);
    count += 1;
  };
  const stop = () => count === limit;
  return makeAsyncJob({ task, stop }, wait)();
}
