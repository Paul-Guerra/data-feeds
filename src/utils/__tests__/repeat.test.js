/* global jest, describe, it, expect, beforeEach */

import { doAsyncJob } from '../async-job';
import repeat from '../repeat';

jest.mock('../async-job');

describe('repeat', () => {
  let chore = jest.fn();
  let limit = 1;
  let wait = 500;

  beforeEach(() => {
    chore.mockClear();
    doAsyncJob.mockClear();
  });

  it('returns a an async job promise', () => {
    let promise = repeat(chore, limit);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls doAsyncJob', () => {
    repeat(chore);
    expect(doAsyncJob).toHaveBeenCalled();
  });

  it('calls doAsyncJob with a task that executes the job', () => {
    repeat(chore, limit);
    let task = doAsyncJob.mock.calls[0][0];
    task();
    expect(chore).toHaveBeenCalledTimes(1);
  });

  it('calls doAsyncJob with a stop function that is based on the limit provided', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(chore, 0);
    let stop = doAsyncJob.mock.calls[0][1];
    expect(stop()).toBe(true);
  });

  it('lets you customize the wait between repeated calls', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(chore, 0, wait);
    expect(doAsyncJob).toHaveBeenLastCalledWith(expect.any(Function), expect.any(Function), wait);
  });

  it('passes the current count to the task', () => {
    repeat(chore);
    let task = doAsyncJob.mock.calls[0][0];
    task();
    expect(chore).toHaveBeenCalledWith(0);
    task();
    expect(chore).toHaveBeenCalledWith(1);
  });
});
