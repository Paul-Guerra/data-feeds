/* global jest, describe, it, expect, beforeEach */

import { doAsyncJob } from '../async-job';
import repeat from '../repeat';

jest.mock('../async-job');

describe('repeat', () => {
  let job = jest.fn();
  let limit = 1;
  let wait = 500;

  beforeEach(() => {
    job.mockClear();
    doAsyncJob.mockClear();
  });

  it('returns a an async job promise', () => {
    let promise = repeat(job, limit);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls doAsyncJob', () => {
    repeat(job);
    expect(doAsyncJob).toHaveBeenCalled();
  });

  it('calls doAsyncJob with a task that executes the job', () => {
    repeat(job, limit);
    let task = doAsyncJob.mock.calls[0][0];
    task();
    expect(job).toHaveBeenCalledTimes(1);
  });

  it('calls doAsyncJob with a stop function that is based on the limit provided', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(job, 0);
    let stop = doAsyncJob.mock.calls[0][1];
    expect(stop()).toBe(true);
  });

  it('lets you customize the wait between repeated calls', () => {
    // count starts at 0. Setting limit to 0 woud make a stop check return true
    repeat(job, 0, wait);
    let stop = doAsyncJob.mock.calls[0][1];
    expect(doAsyncJob).toHaveBeenLastCalledWith(expect.any(Function), expect.any(Function), wait);
  });
});
