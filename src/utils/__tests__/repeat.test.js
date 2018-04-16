/* global jest, describe, it, expect, beforeEach */

import { makeAsyncJob } from '../async-job';
import repeat from '../repeat';

jest.mock('../async-job');

describe('repeat', () => {
  let callback = jest.fn();
  let limit = 1;
  let wait = 500;

  beforeEach(() => {
    callback.mockClear();
    makeAsyncJob.mockClear();
  });

  it('returns an promise', () => {
    let promise = repeat(callback, limit);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls makeAsyncJob', () => {
    repeat(callback);
    expect(makeAsyncJob).toHaveBeenCalled();
  });

  it('calls makeAsyncJob with a task that invokes the callback', () => {
    repeat(callback, limit);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls makeAsyncJob with a stop function that is based on the limit provided', () => {
    // count starts at 0. Setting limit to 0 would make a stop check return true
    repeat(callback, 0);
    let { stop } = makeAsyncJob.mock.calls[0][0];
    expect(stop()).toBe(true);
  });

  it('lets you customize the wait between repeated calls', () => {
    repeat(callback, 0, wait);
    expect(makeAsyncJob).toHaveBeenLastCalledWith(expect.any(Object), wait);
  });

  it('passes the current count to the task', () => {
    repeat(callback);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(callback).toHaveBeenCalledWith(0);
    task();
    expect(callback).toHaveBeenCalledWith(1);
  });
});

describe('integration with makeAsyncJob', () => {
  let callback = jest.fn();
  beforeEach(() => {
    callback.mockClear();
  });

  it('invokes the callback the specified number of times, with resolve and reject functions', () => {
    makeAsyncJob.mockImplementationOnce(require.requireActual('../async-job').makeAsyncJob);
    return repeat(callback, 3).then(() => {
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(0, expect.any(Function), expect.any(Function));
      expect(callback).toHaveBeenCalledWith(1, expect.any(Function), expect.any(Function));
      expect(callback).toHaveBeenCalledWith(2, expect.any(Function), expect.any(Function));
    });
  });
});
