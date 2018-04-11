/* global jest, describe, it, expect, beforeEach */

import event from '../event.middle';
import ACTIONS from '../../actions/action.types';
import init from '../../services/event.service';

jest.mock('../../services/event.service');

describe('event middleware', () => {
  const store = jest.fn();
  const next = jest.fn();
  const action = { type: ACTIONS.APP.READY };
  let service = init();

  beforeEach(() => {
    init.mockClear();
    store.mockClear();
    next.mockClear();
    service.run.mockClear();
    service.onInit.then.mockClear();
    service.onInit.catch.mockClear();
  });

  it('initializes the event service when app is ready', () => {
    event(store)(next)(action);
    expect(init).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('does nothing on empty actions', () => {
    event(store)(next)({});
    expect(init).not.toHaveBeenCalled();
    expect(service.onInit.then).not.toHaveBeenCalled();
    expect(service.onInit.catch).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('runs the service once initialized', () => {
    event(store)(next)(action);
    let then = service.onInit.then.mock.calls[0][0];
    then();
    expect(service.run).toHaveBeenCalledTimes(1);
  });
});

