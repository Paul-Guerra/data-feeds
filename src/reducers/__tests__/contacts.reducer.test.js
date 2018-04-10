/* global describe, it, expect */

import reducer from '../contacts.reducer';
import ACTIONS from '../../actions/action.types';

describe('contacts reducer', () => {
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

  it('appends object to state on new contact action', () => {
    let initialState = {};
    let action = { type: ACTIONS.CONTACT.NEW, id: 12345, name: 'foo' };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[action.id].id).toBe(action.id);
    expect(newState[action.id].name).toBe(action.name);
  });
});

