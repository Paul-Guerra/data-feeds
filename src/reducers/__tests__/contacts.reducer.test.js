/* global describe, it, expect */

import reducer, { updateContactConvos, newContactStateObject } from '../contacts.reducer';
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
    expect(newState).toBe(initialState);
    expect(Object.keys(newState).length).toBe(0);
  });

  it('appends object to state on new contact action', () => {
    let initialState = {};
    let action = { type: ACTIONS.CONTACT.NEW, id: 12345, name: 'foo' };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[action.id].id).toBe(action.id);
    expect(newState[action.id].name).toBe(action.name);
    expect(newState[action.id].conversations.size).toBe(0);
  });

  it('appends object to state on contact subscribed action', () => {
    let initialState = {};
    let action = { type: ACTIONS.CONTACT.SUBSCRIBED, id: 12345, name: 'foo' };
    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[action.id].id).toBe(action.id);
    expect(newState[action.id].name).toBe(action.name);
    expect(newState[action.id].conversations.size).toBe(0);
  });

  it('appends conversation to existing contact on new conversation action', () => {
    let contactId = 'foo';
    let initialState = { foo: { id: 'foo', name: 'foo contact', conversations: new Set(['bar']) } };
    let action = {
      type: ACTIONS.CONVERSATIONS.NEW,
      id: 12345,
      name: 'bar-convo',
      contacts: new Set([contactId])
    };

    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[contactId].id).toBe(contactId);
    expect(newState[contactId].name).toBe('foo contact');
    expect(newState[contactId].conversations.size).toBe(2);
  });

  it('creates new contact and appends conversations on new conversation action', () => {
    let contactId = 'foo';
    let initialState = {};
    let action = {
      type: ACTIONS.CONVERSATIONS.NEW,
      id: 12345,
      name: 'bar-convo',
      contacts: new Set([contactId])
    };

    let newState = reducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(newState[contactId].id).toBe(contactId);
    expect(newState[contactId].name).toBe(undefined);
    expect(newState[contactId].conversations.size).toBe(1);
  });
});

describe('updateContactConvos', () => {
  it('adds conversation to existing contacts', () => {
    let contactId = 'foo';
    let initialState = { foo: { id: 'foo', name: 'foo contact', conversations: new Set(['bar']) } };
    let action = {
      type: ACTIONS.CONVERSATIONS.NEW,
      id: 12345,
      name: 'bar-convo',
      contacts: new Set([contactId])
    };

    let newState = updateContactConvos(action, initialState);
    expect(newState).not.toBe(initialState);
    expect(newState[contactId].id).toBe(contactId);
    expect(newState[contactId].name).toBe('foo contact');
    expect(newState[contactId].conversations.size).toBe(2);
  });

  it('creates new contact and appends conversations on new conversation action', () => {
    let contactId = 'foo';
    let initialState = {};
    let action = {
      type: ACTIONS.CONVERSATIONS.NEW,
      id: 12345,
      name: 'bar-convo',
      contacts: new Set([contactId])
    };

    let newState = updateContactConvos(action, initialState);
    expect(newState).not.toBe(initialState);
    expect(newState[contactId].id).toBe(contactId);
    expect(newState[contactId].name).toBe(undefined);
    expect(newState[contactId].conversations.size).toBe(1);
  });
});


describe('newContactStateObject', () => {
  it('returns a piece of contact state ', () => {
    let action = { id: 'foo', name: 'foo bar' };
    let state = newContactStateObject(action);
    expect(typeof state).toBe('object');
  });

  it('contact id is state key', () => {
    let action = { id: 'foo', name: 'foo bar' };
    let state = newContactStateObject(action);
    expect(typeof state[action.id]).toBe('object');
  });

  it('holds a contact object', () => {
    let action = { id: 'foo', name: 'foo bar' };
    let state = newContactStateObject(action);
    expect(state[action.id].id).toBe(action.id);
    expect(state[action.id].name).toBe(action.name);
    expect(state[action.id].conversations instanceof Set).toBe(true);
    expect(state[action.id].conversations.size).toBe(0);
  });
});
