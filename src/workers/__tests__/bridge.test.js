/* global describe, it, expect, jest, beforeEach */
import Bridge from '../bridge';

global.Worker = jest.fn(); // Node does not have a "Worker" on the global

describe('new Bridge()', () => {
  let dispatch = jest.fn();
  let workerPath = '/foo/bar';
  let bridge;
  
  beforeEach(() => {
    dispatch.mockClear();
    global.Worker.mockClear();
    bridge = new Bridge(dispatch, workerPath);
  });

  it('has a dispatch property', () => {
    expect(bridge.dispatch).toBe(dispatch);
  });

  it('creates a new Worker', () => {
    expect(global.Worker).toHaveBeenCalledWith(workerPath);
  });

  it('worker has a onerror handler', () => {
    expect(typeof bridge.worker.onerror).toBe('function');
  });

  it('worker has a onmessage handler', () => {
    expect(typeof bridge.worker.onmessage).toBe('function');
  });

  it('worker init object resolves and rejects', () => {
    expect(typeof bridge.workerInit.resolve).toBe('function');
    expect(typeof bridge.workerInit.reject).toBe('function');
  });

  it('onInit property is a Promise', () => {
    expect(bridge.onInit).toBeInstanceOf(Promise);
  });
});


describe('Bridge.worker.onerror', () => {
  jest.spyOn(Bridge, 'onError');
  let dispatch = jest.fn();
  let workerPath = '/foo/bar';
  let bridge;

  beforeEach(() => {
    Bridge.onError.mockClear();
    bridge = new Bridge(dispatch, workerPath);
  });

  it('calls Bridge.onError', () => {
    let err = { isError: true };
    bridge.worker.onerror(err);
    expect(Bridge.onError).toHaveBeenCalledWith(err);
    expect(Bridge.onError).toHaveBeenCalledTimes(1);
  });
});

describe('Bridge.worker.onmessage', () => {
  let dispatch = jest.fn();
  let workerPath = '/foo/bar';
  let bridge;

  beforeEach(() => {
    Bridge.onError.mockClear();
    bridge = new Bridge(dispatch, workerPath);
    jest.spyOn(bridge, 'onMessage');
  });

  it('calls onMessage', () => {
    let msg = { isMsg: true, data: 'STUB.TYPE' };
    bridge.worker.onmessage(msg);
    expect(bridge.onMessage).toHaveBeenCalledWith(msg);
    expect(bridge.onMessage).toHaveBeenCalledTimes(1);
  });
});

describe('Bridge.onError', () => {

  it('logs to error', () => {
    let errLogSpy = jest.spyOn(global.console, 'error');    
    let e = { foo: 'bar' };
    Bridge.onError(e);
    expect(errLogSpy).toHaveBeenCalledWith('[Bridge] error', e);
    errLogSpy.mockRestore();
  });
});

describe('onMessage', () => {
  let dispatch = jest.fn();
  let workerPath = '/foo/bar';
  let bridge;

  beforeEach(() => {
    dispatch.mockClear();
    global.Worker.mockClear();
    bridge = new Bridge(dispatch, workerPath);
  });

  it('WORKER.READY action resolves the init promise', () => {
    let event = { data: { type: 'WORKER.READY' } };
    bridge.workerInit = {
      resolve: jest.fn()
    };
    bridge.onMessage(event);
    expect(bridge.workerInit.resolve).toHaveBeenCalled();
  });

  it('WORKER.FAILED action rejects the init promise', () => {
    let event = { data: { type: 'WORKER.FAILED' } };
    bridge.workerInit = {
      reject: jest.fn()
    };
    bridge.onMessage(event);
    expect(bridge.workerInit.reject).toHaveBeenCalled();
  });
});
