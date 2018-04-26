/* global describe, it, expect, jest, beforeEach */

import init, { EventService } from '../event.service';

describe('event service init()', () => {
  let dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('returns an event service intance', () => {
    let service = init(dispatch);
    expect(service instanceof EventService).toBe(true);
  });

  it('only creates one event service intance', () => {
    let service1 = init();
    let service2 = init();
    expect(service1).toBe(service2);
  });
});

describe('EventService class', () => {
  let dispatch = jest.fn();
  global.Worker = jest.fn(() => ({
    postMessage: jest.fn()
  }));

  beforeEach(() => {
    dispatch.mockClear();
    global.Worker.mockClear();
  });

  it('run', () => {
    let service = new EventService(dispatch);
    jest.spyOn(service.worker, 'postMessage');
    service.run();
    expect(service.worker.postMessage).toHaveBeenCalledTimes(3);
  });
});
