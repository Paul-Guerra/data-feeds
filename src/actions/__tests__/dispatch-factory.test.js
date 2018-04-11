/* global describe, it, expect, jest, beforeEach */
import makeDispatcher from '../dispatch-factory';
import ACTIONS from '../action.types';

describe('makeDispatcher', () => {
  let action = { type: 'MY.MOCK.ACTION' };
  let actionCreator = jest.fn(() => action);
  let dispatch = jest.fn();

  beforeEach(() => {
    actionCreator.mockClear();
    dispatch.mockClear();
  });

  it('returns a function', () => {
    let dispatcher = makeDispatcher(dispatch, actionCreator);
    expect(typeof dispatcher).toEqual('function');
  });
});


describe('makeDispatcher returned function', () => {
  let action = { type: 'MY.MOCK.ACTION' };
  let actionCreator = jest.fn(() => action);
  let dispatch = jest.fn();
  let dispatcher;

  beforeEach(() => {
    actionCreator.mockClear();
    dispatch.mockClear();
    dispatcher = makeDispatcher(dispatch, actionCreator);
  });

  it('calls action creator with provided arguments', () => {
    dispatcher('foo');
    expect(actionCreator).toHaveBeenCalledWith('foo');
  });

  it('calls dispatch with action creators return value', () => {
    dispatcher('foo');
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
