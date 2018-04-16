/* global jest, describe, it, expect, beforeEach */

import { chunk, createJob, doAsyncJob, defaultHandlers } from '../async-job';

jest.useFakeTimers();

describe('chunk', () => {
  const job = {
    task: jest.fn(),
    stop: jest.fn(),
    output: jest.fn(),
    wait: 100,
    resolve: jest.fn(),
    reject: jest.fn()
  };

  beforeEach(() => {
    job.task.mockClear();
    job.stop.mockClear();
    job.output.mockClear();
    job.resolve.mockClear();
    job.reject.mockClear();
    setTimeout.mockClear();
    jest.clearAllTimers();
  });

  it('returns a Promise', () => {
    let result = chunk(job);
    expect(result).toBeInstanceOf(Promise);
  });

  it('cancels the job when a task errors out', () => {
    let errMessage = 'task error';
    job.task.mockImplementationOnce(() => { throw Error(errMessage); });
    let result = chunk(job);
    return result.catch(() => {
      expect(job.reject).toHaveBeenCalledTimes(1);
      expect(job.reject).toHaveBeenCalledWith(expect.any(Error));
      expect(job.reject.mock.calls[0][0].message).toHaveBeenCalledWith(errMessage);
      expect(result.catch).toHaveBeenCalledTimes(1);
      expect(result.catch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('if stop condition is true, do not schedule the next job ', () => {
    job.stop = jest.fn(() => true);
    let result = chunk(job);
    return result.then(() => {
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });

  it('if stop condition is true, does not call the task', () => {
    job.stop.mockImplementationOnce(() => true);
    return chunk(job).then(() => {
      expect(job.task).not.toHaveBeenCalled();
    });
  });

  it('if stop condition is true, resolves with undefined', () => {
    job.stop.mockImplementationOnce(() => true);
    return chunk(job).then((taskresolve) => {
      expect(taskresolve).toBeUndefined();
    });
  });

  it('if stop condition is true, resolves the job with the return of output()', () => {
    let mockOutput = 'output!';
    job.stop.mockImplementationOnce(() => true);
    job.output.mockImplementationOnce(() => mockOutput);
    return chunk(job).then(() => {
      expect(job.output).toHaveBeenCalledTimes(1);
      expect(job.resolve).toHaveBeenCalledTimes(1);
      expect(job.resolve).toHaveBeenCalledWith(mockOutput);
    });
  });

  it('if stop condition is false, schedules the next task', () => {
    job.stop = jest.fn(() => false);
    let result = chunk(job);
    return result.then(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), job.wait);
      jest.runOnlyPendingTimers();
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });
  });

  it('if stop condition is false, calls the job task', () => {
    let result = chunk(job);
    return result.then(() => {
      expect(job.task).toHaveBeenCalledTimes(1);
    });
  });

  it('if stop condition is false,task Promise is resolved with task return value', () => {
    let taskOutput = 'task output';
    job.task.mockImplementationOnce(() => taskOutput);
    chunk(job).then((result) => {
      expect(result).toBe(taskOutput);
    });
  });
});

describe('createJob', () => {
  const options = {
    task: jest.fn(),
    stop: jest.fn(),
    output: jest.fn(),
    wait: 0,
    resolve: jest.fn(),
    reject: jest.fn()
  };

  beforeEach(() => {
    options.task.mockClear();
    options.stop.mockClear();
    options.output.mockClear();
    options.resolve.mockClear();
    options.reject.mockClear();
  });

  it('returned task function calls original task with resolve & reject ', () => {
    let job = createJob(options);
    job.task();
    expect(options.task).toHaveBeenCalledTimes(1);
    expect(options.task).toHaveBeenCalledWith(options.resolve, options.reject);
  });
});

describe('default job handlers', () => {
  let { task, stop, output } = defaultHandlers;
  let resolve = jest.fn();

  beforeEach(() => {
    resolve.mockClear();
  });

  it('default task function resolves the job promise', () => {
    task(resolve);
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  it('default stop function returns true', () => {
    expect(stop()).toBe(true);
  });

  it('default stop function returns true', () => {
    expect(typeof output).toBe('function');
  });
});

describe('doAsyncJob', () => {
  let handlers = {
    task: jest.fn(),
    stop: jest.fn(),
    output: jest.fn()
  };
  let exec = jest.fn();
  let wait = 0;

  beforeEach(() => {
    exec.mockClear();
    handlers.task.mockClear();
    handlers.output.mockClear();
    handlers.stop.mockClear();
    wait = 0;
  });

  it('returns a Promise', () => {
    handlers.task.mockImplementationOnce(resolve => resolve());
    let promise = doAsyncJob(handlers);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls exec with a job', () => {
    exec.mockImplementationOnce(job => job.resolve());
    return doAsyncJob(handlers, wait, exec).then(() => {
      expect(exec).toHaveBeenCalledTimes(1);
    });
  });

  it('a task can resolve the jobs promise ', () => {
    let resolveValue = 'resolved from task';
    handlers.task.mockImplementationOnce(resolve => resolve(resolveValue));
    exec.mockImplementationOnce(job => job.task());
    return doAsyncJob(handlers, wait, exec).then((results) => {
      expect(exec).toHaveBeenCalledTimes(1);
      expect(results).toBe(resolveValue);
    });
  });

  it('falls back to default handlers', () => {
    exec.mockImplementationOnce(job => job.resolve());
    return doAsyncJob({}, wait, exec).then(() => {
      let job = exec.mock.calls[0][0];
      expect(typeof job.output).toBe('function');
      expect(typeof job.task).toBe('function');
      expect(typeof job.stop).toBe('function');
      expect(job.stop()).toBe(true);
    });
  });
});
