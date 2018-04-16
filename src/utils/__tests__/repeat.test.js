/* global jest, describe, it, expect, beforeEach */

import { makeAsyncJob } from '../async-job';
import repeat from '../repeat';

jest.mock('../async-job');

describe('repeat', () => {
  let chore = jest.fn();
  let limit = 1;
  let wait = 500;

  beforeEach(() => {
    chore.mockClear();
    makeAsyncJob.mockClear();
  });

  it('returns an async job promise', () => {
    let promise = repeat(chore, limit);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls makeAsyncJob', () => {
    repeat(chore);
    expect(makeAsyncJob).toHaveBeenCalled();
  });

  it('calls makeAsyncJob with a task that executes the chore', () => {
    repeat(chore, limit);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(chore).toHaveBeenCalledTimes(1);
  });

  it('calls makeAsyncJob with a stop function that is based on the limit provided', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(chore, 0);
    let { stop } = makeAsyncJob.mock.calls[0][0];
    expect(stop()).toBe(true);
  });

  it('lets you customize the wait between repeated calls', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(chore, 0, wait);
    expect(makeAsyncJob).toHaveBeenLastCalledWith(expect.any(Object), wait);
  });

  it('passes the current count to the task', () => {
    repeat(chore);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(chore).toHaveBeenCalledWith(0);
    task();
    expect(chore).toHaveBeenCalledWith(1);
  });
});
