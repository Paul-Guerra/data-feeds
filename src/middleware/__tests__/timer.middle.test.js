/* global jest, describe, it, expect, afterEach */

import ACTIONS from '../../actions/action.types';
import update from '../../actions/timer.actions';
import timerService from '../../services/timer.service';
import timer, { makeOnUpdate } from '../timer.middle';

jest.mock('../../services/timer.service');
jest.mock('../../actions/timer.actions');


describe('Timer middleware', () => {
  const store = { dispatch: jest.fn() };
  const next = jest.fn();
  const action = { type: ACTIONS.APP.READY };
  const otherAction = { type: 'SOMETHING ELSE' };

  afterEach(() => {
    store.dispatch.mockClear();
    next.mockClear();
  });

  it('does nothing by default', () => {
    timer(store)(next)(otherAction);
    expect(timerService).toHaveBeenCalledTimes(0);
  });

  it('starts the service when the app is ready', () => {
    timer(store)(next)(action);
    expect(timerService).toHaveBeenCalled();
    expect(typeof timerService.mock.calls[0][0]).toBe('function');
  });

  it('calls next(action)', () => {
    timer(store)(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});

describe('Timer makeOnUpdate ', () => {
  let dispatch = jest.fn();

  afterEach(() => {
    dispatch.mockClear();
    update.mockClear();
  });

  it('returns a function', () => {
    expect(typeof makeOnUpdate(dispatch)).toBe('function');
  });

  it('returned function calls provided dispatch', () => {
    const onUpdate = makeOnUpdate(dispatch);
    onUpdate();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('provided dispatch called with timer update action', () => {
    const onUpdate = makeOnUpdate(dispatch);
    onUpdate('the time');
    expect(update).toHaveBeenCalledTimes(1);
  });

  it('timer update action called with provided time', () => {
    const onUpdate = makeOnUpdate(dispatch);
    onUpdate('the time');
    expect(update.mock.calls[0][0]).toBe('the time');
  });
});
