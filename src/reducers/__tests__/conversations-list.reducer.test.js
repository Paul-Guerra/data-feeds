/* global describe, it, expect */

import reducer from '../conversations-list.reducer';
import ACTIONS from '../../actions/action.types';

describe('conversations list reducer', () => {
  it('assumes empty array for initial state', () => {
    let action = { type: 'MY.ACTION' };
    let newState = reducer(undefined, action);
    expect(newState instanceof Array).toBe(true);
    expect(newState.length).toBe(0);
  });

  it('does nothing by default', () => {
    let initialState = [];
    let action = { type: 'MY.ACTION' };
    let newState = reducer(initialState, action);
    expect(newState).toBe(initialState);
    expect(newState.length).toBe(0);
  });

  it('appends batch list updates to list on ADD_BATCH action', () => {
    let initialState = [];
    let action = { type: ACTIONS.CONVERSATIONS_LIST.ADD_BATCH, conversations: [12345] };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState.length).toBe(1);
    expect(newState[0]).toBe(action.conversations[0]);
  });
});

