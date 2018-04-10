/* global describe, it, expect */

import ACTIONS from '../action.types';
import { archivedMessage, newMessage } from '../message.actions';

describe('archivedMessage action', () => {
  it('dispatches a archived message action', () => {
    let sysId = 123;
    let contact = { id: 'foo-bar', name: 'foo bar' };
    let content = 'lorem ipsum';
    let action = archivedMessage(sysId, contact, content);
    expect(action.type).toBe(ACTIONS.MESSAGE.ARCHIVE);
    expect(action.from).toBe(contact.id);
    expect(action.name).toBe(contact.name);
    expect(action.systemId).toBe(sysId);
    expect(action.content).toBe(content);
  });
});


describe('newMessage action', () => {
  it('dispatches a new message action', () => {
    let sysId = 123;
    let contact = { id: 'foo-bar', name: 'foo bar' };
    let content = 'lorem ipsum';
    let action = newMessage(sysId, contact, content);
    expect(action.type).toBe(ACTIONS.MESSAGE.NEW);
    expect(action.from).toBe(contact.id);
    expect(action.name).toBe(contact.name);
    expect(action.systemId).toBe(sysId);
    expect(action.content).toBe(content);
  });
});
