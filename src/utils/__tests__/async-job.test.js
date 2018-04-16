/* global jest, describe, it, expect, beforeEach */

import * as asj from '../async-job';

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
    let result = asj.chunk(job);
    expect(result).toBeInstanceOf(Promise);
  });

  it('cancels the job when a task errors out', () => {
    let errMessage = 'task error';
    job.task.mockImplementationOnce(() => { throw Error(errMessage); });
    let result = asj.chunk(job);
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
    let result = asj.chunk(job);
    return result.then(() => {
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });

  it('if stop condition is true, does not call the task', () => {
    job.stop.mockImplementationOnce(() => true);
    return asj.chunk(job).then(() => {
      expect(job.task).not.toHaveBeenCalled();
    });
  });

  it('if stop condition is true, resolves with undefined', () => {
    job.stop.mockImplementationOnce(() => true);
    return asj.chunk(job).then((taskresolve) => {
      expect(taskresolve).toBeUndefined();
    });
  });

  it('if stop condition is true, resolves the job with the return of output()', () => {
    let mockOutput = 'output!';
    job.stop.mockImplementationOnce(() => true);
    job.output.mockImplementationOnce(() => mockOutput);
    return asj.chunk(job).then(() => {
      expect(job.output).toHaveBeenCalledTimes(1);
      expect(job.resolve).toHaveBeenCalledTimes(1);
      expect(job.resolve).toHaveBeenCalledWith(mockOutput);
    });
  });

  it('if stop condition is false, schedules the next task', () => {
    job.stop = jest.fn(() => false);
    let result = asj.chunk(job);
    return result.then(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), job.wait);
      jest.runOnlyPendingTimers();
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });
  });

  it('if stop condition is false, calls the job task', () => {
    let result = asj.chunk(job);
    return result.then(() => {
      expect(job.task).toHaveBeenCalledTimes(1);
    });
  });

  it('if stop condition is false,task Promise is resolved with task return value', () => {
    let taskOutput = 'task output';
    job.task.mockImplementationOnce(() => taskOutput);
    asj.chunk(job).then((result) => {
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
    let job = asj.createJob(options);
    job.task();
    expect(options.task).toHaveBeenCalledTimes(1);
    expect(options.task).toHaveBeenCalledWith(options.resolve, options.reject);
  });

  it('returned reject method rejects the job promise with error', () => {
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
  let output = jest.fn();
  let stopWhen = jest.fn();
  let wait = 0;

  beforeEach(() => {
    exec.mockClear();
    task.mockClear();
    output.mockClear();
    stopWhen.mockClear();
    wait = 0;
  });

  it('returns a Promise', () => {
    task.mockImplementationOnce(resolve => resolve());
    let promise = asj.doAsyncJob(task, stopWhen, output);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('calls exec with a job', () => {
    exec.mockImplementationOnce(job => job.resolve());
    return asj.doAsyncJob(task, stopWhen, output, wait, exec).then(() => {
      expect(exec).toHaveBeenCalledTimes(1);
    });
  });

  it('a task can resolve the jobs promise ', () => {
    let resolveValue = 'resolved from task';
    task.mockImplementationOnce(resolve => resolve(resolveValue));
    exec.mockImplementationOnce(job => job.task());
    return asj.doAsyncJob(task, stopWhen, output, wait, exec).then((results) => {
      expect(exec).toHaveBeenCalledTimes(1);
      expect(results).toBe(resolveValue);
    });
  });
});
