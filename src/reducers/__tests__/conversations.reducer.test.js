/* global describe, it, expect */

import reducer from '../conversations.reducer';
import ACTIONS from '../../actions/action.types';

describe('conversations reducer', () => {
  it('assumes empty object for initial state', () => {
    let action = { type: 'MY.ACTION' };
    let newState = reducer(undefined, action);
    expect(Object.keys(newState).length).toBe(0);
  });

  it('does nothing by default', () => {
    let initialState = {};
    let action = { type: 'MY.ACTION' };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(Object.keys(newState).length).toBe(0);
  });

  it('appends object to state on new conversation action', () => {
    let initialState = {};
    let action = {
      type: ACTIONS.CONVERSATION.NEW,
      id: 12345,
      name: 'foo',
      contacts: [67890]
    };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[action.id].id).toBe(action.id);
    expect(newState[action.id].name).toBe(action.name);
    expect(newState[action.id].contacts.length).toBe(action.contacts.length);
    expect(newState[action.id].contacts[0]).toBe(action.contacts[0]);
  });
});

