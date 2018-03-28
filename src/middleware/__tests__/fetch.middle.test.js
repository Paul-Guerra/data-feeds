/* global jest, describe, it, expect, afterEach */

import ACTIONS from '../../actions/action.types';
import { fetching, fetched, error } from '../../actions/fetch.actions';
import fetchService from '../../services/fetch.service';
// import makeDispatcher from '../../actions/dispatch-factory';
import fetch from '../fetch.middle';

jest.mock('../../actions/fetch.actions');
jest.mock('../../services/fetch.service');
// jest.mock('../../actions/dispatch-factory');


describe('Fetch middleware', () => {
  const store = { dispatch: jest.fn() };
  const next = jest.fn();
  const action = { type: ACTIONS.FETCH.CLICK, url: 'foo' };
  const otherAction = { type: 'SOMETHING ELSE' };

  afterEach(() => {
    store.dispatch.mockClear();
    next.mockClear();
    fetchService.mockClear();
  });

  it('calls next(action)', () => {
    fetch(store)(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('does nothing by default', () => {
    fetch(store)(next)(otherAction);
    expect(fetchService).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(otherAction);
  });

  it('Calls the fetch service with the url', () => {
    fetch(store)(next)(action);
    expect(fetchService).toHaveBeenCalledTimes(1);
    expect(fetchService.mock.calls[0][0]).toBe(action.url);
    expect(typeof fetchService.mock.calls[0][1]).toBe('function');
    expect(typeof fetchService.mock.calls[0][2]).toBe('function');
  });

  it('dispatches a FETCHING action', () => {
    fetching.mockReturnValue('FETCHING');
    fetch(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith('FETCHING');
  });

  it('on success dispatches a FETCHED action', () => {
    fetch(store)(next)(action);
    let onSuccess = fetchService.mock.calls[0][1];
    store.dispatch.mockClear();
    onSuccess();
    expect(fetched).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith('FETCHED');
  });


  it('on error dispatches a FETCHED action', () => {
    fetch(store)(next)(action);
    let onFail = fetchService.mock.calls[0][2];
    store.dispatch.mockClear();
    onFail();
    expect(fetched).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith('ERROR');
  });
});
