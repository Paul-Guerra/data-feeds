/* global jest, describe, it, expect, beforeEach */

import { makeAsyncJob } from '../async-job';
import forEach from '../foreach';

jest.mock('../async-job');

describe('forEach', () => {
  let onEach = jest.fn();
  let list = [10, 20, 30, 40, 50];

  beforeEach(() => {
    onEach.mockClear();
    makeAsyncJob.mockClear();
  });

  it('returns an async job promise', () => {
    let promise = forEach(list, onEach);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls makeAsyncJob', () => {
    forEach(list, onEach);
    expect(makeAsyncJob).toHaveBeenCalled();
  });

  it('calls makeAsyncJob with a task that executes the callback', () => {
    forEach(list, onEach);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(onEach).toHaveBeenCalledTimes(1);
  });

  it('calls makeAsyncJob with a stop function that is based on the list length', () => {
    // index starts at 0. Passing an empty array would make a stop check return true
    forEach([], onEach);
    let { stop } = makeAsyncJob.mock.calls[0][0];
    expect(stop()).toBe(true);
  });

  it('passes the current list item and index to the callback', () => {
    forEach(list, onEach);
    let { task } = makeAsyncJob.mock.calls[0][0];
    task();
    expect(onEach).toHaveBeenCalledWith(10, 0);
    task();
    expect(onEach).toHaveBeenCalledWith(20, 1);
    task();
    expect(onEach).toHaveBeenCalledWith(30, 2);
    task();
    expect(onEach).toHaveBeenCalledWith(40, 3);
    task();
    expect(onEach).toHaveBeenCalledWith(50, 4);
  });
});

describe('integration with makeAsyncJob', () => {
  let onEach = jest.fn();
  let list = [10, 20, 30];

  beforeEach(() => {
    onEach.mockClear();
  });

  it('invokes the callback for every item in the list, with resolve and reject functions', () => {
    makeAsyncJob.mockImplementationOnce(require.requireActual('../async-job').makeAsyncJob);
    return forEach(list, onEach).then(() => {
      expect(onEach).toHaveBeenCalledTimes(list.length);
      expect(onEach).toHaveBeenCalledWith(10, 0, expect.any(Function), expect.any(Function));
      expect(onEach).toHaveBeenCalledWith(20, 1, expect.any(Function), expect.any(Function));
      expect(onEach).toHaveBeenCalledWith(30, 2, expect.any(Function), expect.any(Function));
    });
  });
});
