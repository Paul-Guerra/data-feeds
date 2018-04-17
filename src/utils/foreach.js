import { makeAsyncJob } from './async-job';

export default function forEach(list, onEach) {
  let index = 0;
  const task = (...args) => {
    onEach(list[index], index, ...args);
    index += 1;
  };
  const stop = () => index === list.length;
  return makeAsyncJob({ task, stop }, 0)();
}
