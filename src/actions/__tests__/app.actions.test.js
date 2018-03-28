/* global describe, it, expect */
import ready from '../app.actions';
import ACTIONS from '../action.types';

describe('App Ready', () => {
  it('dispatches a ready action', () => {
    let action = ready();
    expect(action.type).toEqual(ACTIONS.APP.READY);
  });
});
