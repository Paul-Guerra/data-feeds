/* global describe, it, expect */
import { fetching, fetched, click, error } from '../fetch.actions';
import ACTIONS from '../action.types';

describe('Fetch actions', () => {
  it('dispatches a FETCHING action', () => {
    let p = new Promise(() => true);
    let url = 'http://google.com';
    let action = fetching(p, url);
    expect(action.type).toEqual(ACTIONS.FETCH.FETCHING);
    expect(action.promise).toEqual(p);
    expect(action.url).toEqual(url);
  });

  it('dispatches a CLICK action', () => {
    let url = 'http://google.com';
    let action = click(url);
    expect(action.type).toEqual(ACTIONS.FETCH.CLICK);
    expect(action.url).toEqual(url);
  });

  it('dispatches a FETCHED action', () => {
    let data = { url: 'http://google.com' };
    let action = fetched(data);
    expect(action.type).toEqual(ACTIONS.FETCH.FETCHED);
    expect(action.data).toEqual(data);
  });

  it('dispatches a ERROR action', () => {
    let e = { error: 'oops' };
    let action = error(e);
    expect(action.type).toEqual(ACTIONS.FETCH.ERROR);
    expect(action.error).toEqual(e);
  });
});
