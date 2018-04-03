/* global jest, describe, it, expect, beforeEach */

import * as asj from '../async-job';

jest.useFakeTimers();

describe('chunk', () => {
  const job = {
    task: jest.fn(),
    stop: jest.fn(),
    wait: 100,
    resolve: jest.fn(),
    reject: jest.fn()
  };

  beforeEach(() => {
    job.task.mockClear();
    job.stop.mockClear();
    setTimeout.mockClear();
    jest.clearAllTimers();
  });

  it('returns a Promise', () => {
    let result = asj.chunk(job);
    expect(result).toBeInstanceOf(Promise);
  });

  it('calls the job task', () => {
    let result = asj.chunk(job);
    return result.then(() => {
      expect(job.task).toHaveBeenCalledTimes(1);
    });
  });

  it('cancels the job when a task errors out', () => {
    job.task.mockImplementationOnce = () => { throw Error('task error'); };
    let result = asj.chunk(job);
    return result.catch(() => {
      expect(job.reject).toHaveBeenCalledTimes(1);
      expect(job.reject).toHaveBeenCalledWith(expect.any(Error));
      expect(result.catch).toHaveBeenCalledTimes(1);
      expect(result.catch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('schedules the next job when stop condition is not met', () => {
    job.stop = jest.fn(() => false);
    let result = asj.chunk(job);
    return result.then(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), job.wait);
      jest.runOnlyPendingTimers();
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });
  });

  it('does not schedule the next job when stop condition is met', () => {
    job.stop = jest.fn(() => true);
    let result = asj.chunk(job);
    return result.then(() => {
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });
});

describe('createJob', () => {
  const options = {
    task: jest.fn(),
    stopWhenTrue: jest.fn(),
    wait: 0,
    resolve: jest.fn(),
    reject: jest.fn()
  };

  beforeEach(() => {
    options.task.mockClear();
    options.stopWhenTrue.mockClear();
    options.resolve.mockClear();
    options.reject.mockClear();
  });

  it('stop method resolves the job promise when true', () => {
    options.stopWhenTrue.mockImplementationOnce(() => true);
    let job = asj.createJob(options);
    let val = job.stop();
    expect(options.resolve).toHaveBeenCalledTimes(1);
    expect(val).toBe(true);
  });

  it('reject method rejects the job promise with error', () => {
    let job = asj.createJob(options);
    let e = Error('stub error message');
    job.reject(e);
    expect(options.reject).toHaveBeenCalledTimes(1);
    expect(options.reject).toHaveBeenLastCalledWith(e);
  });
});

describe('doAsyncJob', () => {
  let exec = jest.fn();
  let task = jest.fn();
  let stopWhen = jest.fn();
  let wait = 0;

  beforeEach(() => {
    exec.mockClear();
    task.mockClear();
    stopWhen.mockClear();
    wait = 0;
  });

  it('returns a Promise', () => {
    let promise = asj.doAsyncJob(jest.fn(), jest.fn());
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls exec with a job', () => {
    exec.mockImplementationOnce(job => job.resolve());
    return asj.doAsyncJob(task, stopWhen, wait, exec).then(() => {
      expect(exec).toHaveBeenCalledTimes(1);
    });
  });
});
