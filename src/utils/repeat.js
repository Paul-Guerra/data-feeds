import { makeAsyncJob } from './async-job';

export default function repeat(callback, limit = Infinity, wait = 0) {
  let count = 0;
  const task = (...args) => {
    callback(count, ...args);
    count += 1;
  };
  const stop = () => count === limit;
  return makeAsyncJob({ task, stop }, wait)();
}
