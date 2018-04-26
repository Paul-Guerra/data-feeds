/* global jest, describe, it, expect, beforeEach */

import JobQueue from '../job-queue';

jest.useFakeTimers();

describe('JobQueue constructor', () => {

  it('starts with an empty array of jobs', () => {
    let jq = new JobQueue();
    expect(jq.jobs instanceof Array).toBe(true);
    expect(jq.jobs.length).toBe(0);
  });
});


describe('JobQueue enqueue method', () => {
  let jq;

  beforeEach(() => {
    jq = new JobQueue();
  });

  it('rejects non functions', () => {
    let job = jest.fn();
    jq.enqueue({});
    expect(jq.jobs.length).toBe(0);
    jq.enqueue(1);
    expect(jq.jobs.length).toBe(0);
    jq.enqueue('a');
    expect(jq.jobs.length).toBe(0);
    jq.enqueue(true);
    expect(jq.jobs.length).toBe(0);
    jq.enqueue(job);
    expect(jq.jobs.length).toBe(1);
    expect(jq.jobs[0]).toBe(job); // still in queu because it's async
  });

  it('starts processing the queue if it was previously empty', () => {
    let job1 = jest.fn();
    let job2 = jest.fn();
    let nextJobSpy = jest.spyOn(jq, 'nextJob');
    jq.enqueue(job1);
    jq.enqueue(job2);
    expect(nextJobSpy).toHaveBeenCalledTimes(1);
    nextJobSpy.mockRestore();
  });
});

describe('JobQueue nextJob method', () => {
  let jq;

  beforeEach(() => {
    jq = new JobQueue();
    setTimeout.mockClear();
  });

  it('calls dequeue on next tick', () => {
    let dequeueSpy = jest.spyOn(jq, 'dequeue');
    jq.nextJob();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
    let onTimeout = setTimeout.mock.calls[0][0];
    onTimeout();
    expect(dequeueSpy).toHaveBeenCalledTimes(1);
    dequeueSpy.mockRestore();
  });

  it('handles errors thrown by the job', () => {
    let nextJobSpy = jest.spyOn(jq, 'nextJob');
    let errLogSpy = jest.spyOn(global.console, 'error');
    jq.enqueue(jest.fn(() => { throw Error('bad job'); }));
    jest.runOnlyPendingTimers();
    // next job called twice once to run the job and once
    // after the job failed to continue processing the queue
    expect(nextJobSpy).toHaveBeenCalledTimes(2);
    expect(errLogSpy).toHaveBeenCalledTimes(1);
    nextJobSpy.mockRestore();
    errLogSpy.mockRestore();
  });
});


describe('JobQueue dequeue method', () => {
  let jq;

  beforeEach(() => {
    jq = new JobQueue();
  });

  it('does not grab next job if the queue length is zero', () => {
    let shiftSpy = jest.spyOn(jq.jobs, 'shift');
    jq.dequeue();
    expect(shiftSpy).not.toBeCalled();
    shiftSpy.mockRestore();
  });

  it('warns on non executable job and calls nextJob', () => {
    let nextJobSpy = jest.spyOn(jq, 'nextJob');
    let warnSpy = jest.spyOn(global.console, 'warn');
    jq.jobs.push('foo');
    jq.dequeue();
    expect(nextJobSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    nextJobSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('warns on non executable job and calls nextJob', () => {
    let nextJobSpy = jest.spyOn(jq, 'nextJob');
    let job = jest.fn();
    jq.jobs.push(job);
    jq.dequeue();
    expect(nextJobSpy).toHaveBeenCalledTimes(1);
    nextJobSpy.mockRestore();
  });

  it('if job returns a promise calls next job when resolved', () => {
    let jobPromise = Promise.resolve();
    let nextJobSpy = jest.spyOn(jq, 'nextJob');
    let thenSpy = jest.spyOn(jobPromise, 'then');
    let job = jest.fn(() => jobPromise);
    jq.jobs.push(job);
    jq.dequeue();
    expect(thenSpy).toHaveBeenCalledTimes(1);
    let thenCb = thenSpy.mock.calls[0][0];
    thenCb();
    expect(nextJobSpy).toHaveBeenCalledTimes(1);
    thenSpy.mockRestore();
    nextJobSpy.mockRestore();
  });
});
