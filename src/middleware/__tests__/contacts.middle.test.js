/* global jest, describe, it, expect, beforeEach */

import contacts, { isFromNewContact } from '../contacts.middle';
import ACTIONS from '../../actions/action.types';
import { newFromMessage } from '../../actions/contact.actions';

jest.mock('../../actions/contact.actions');
jest.useFakeTimers();

let stateContacts = { foo: { id: 'foo' } };
let state = { contacts: stateContacts };

describe('isFromNewContact', () => {
  it('returns true if the contact is not already known', () => {
    let isFromNew = isFromNewContact({ from: 'bar' }, stateContacts);
    expect(isFromNew).toBe(true);
  });

  it('returns false if the contact is already known', () => {
    let isFromNew = isFromNewContact({ from: 'foo' }, stateContacts);
    expect(isFromNew).toBe(false);
  });
});

describe('contacts middleware', () => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn()
  };
  const next = jest.fn();
  const contactAction = 'new contact action';
  newFromMessage.mockReturnValue(contactAction);

  beforeEach(() => {
    store.getState.mockClear();
    store.dispatch.mockClear();
    next.mockClear();
    newFromMessage.mockClear();
    setTimeout.mockClear();
  });

  it('adds a contact when new message if from an unknown user', () => {
    let newMessageFromUnknown = { type: ACTIONS.MESSAGE.NEW, from: 'bar' };
    contacts(store)(next)(newMessageFromUnknown);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(newFromMessage).toHaveBeenCalledWith(newMessageFromUnknown);
    expect(store.dispatch).toHaveBeenCalledWith(contactAction);
  });

  it('adds a contact when archive message if from an unknown user', () => {
    let archiveMessageFromUnknown = { type: ACTIONS.MESSAGE.ARCHIVE, from: 'bar' };
    contacts(store)(next)(archiveMessageFromUnknown);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(newFromMessage).toHaveBeenCalledWith(archiveMessageFromUnknown);
    expect(store.dispatch).toHaveBeenCalledWith(contactAction);
  });

  it('handles new message on next tick', () => {
    let newMessageFromKnown = { type: ACTIONS.MESSAGE.NEW, from: 'foo' };
    contacts(store)(next)(newMessageFromKnown);
    expect(setTimeout).toHaveBeenCalled();
  });

  it('does nothing when new message if from a known user', () => {
    let newMessageFromKnown = { type: ACTIONS.MESSAGE.NEW, from: 'foo' };
    contacts(store)(next)(newMessageFromKnown);
    jest.runOnlyPendingTimers();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('handles archive message on next tick', () => {
    let archiveMessageFromKnown = { type: ACTIONS.MESSAGE.ARCHIVE, from: 'foo' };
    contacts(store)(next)(archiveMessageFromKnown);
    expect(setTimeout).toHaveBeenCalled();
  });

  it('does nothing when archive message if from an known user', () => {
    let archiveMessageFromKnown = { type: ACTIONS.MESSAGE.ARCHIVE, from: 'foo' };
    contacts(store)(next)(archiveMessageFromKnown);
    jest.runOnlyPendingTimers();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('does nothing by default', () => {
    let action = { type: 'FOO.BAR', from: 'foo' };
    contacts(store)(next)(action);
    expect(setTimeout).not.toHaveBeenCalled();
  });
});

