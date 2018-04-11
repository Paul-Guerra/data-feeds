/* global describe, it, expect */
import ACTIONS from '../action.types';
import { newFromMessage, newFromContact } from '../conversation.actions';

describe('newFromMessage action', () => {
  it('dispatches a new conversation action', () => {
    let msg = { from: 'foo', name: 'foo bar' };
    let action = newFromMessage(msg);
    expect(action.type).toBe(ACTIONS.CONVERSATION.NEW);
    expect(action.id).toBe(msg.from);
    expect(action.name).toBe(msg.name);
    expect(action.contacts.length).toBe(1);
    expect(action.contacts[0]).toBe(msg.from);
  });
});

describe('newFromContact action', () => {
  it('dispatches a new conversation action', () => {
    let contact = { id: 'foo-bar', name: 'foo bar' };
    let action = newFromContact(contact);
    expect(action.type).toBe(ACTIONS.CONVERSATION.NEW);
    expect(action.id).toBe(contact.id);
    expect(action.name).toBe(contact.name);
    expect(action.contacts.length).toBe(1);
    expect(action.contacts[0]).toBe(contact.id);
  });
});
