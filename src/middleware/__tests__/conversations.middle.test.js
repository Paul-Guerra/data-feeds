/* global jest, describe, it, expect, beforeEach */

import conversations, { isNewConversation } from '../conversations.middle';
import ACTIONS from '../../actions/action.types';
import { newFromMessage } from '../../actions/conversation.actions';

jest.mock('../../actions/conversation.actions');
jest.useFakeTimers();

let stateConversations = { foo: { id: 'foo', name: 'foo bar', contacts: ['contact-id'] } };
let state = { conversations: stateConversations };

describe('isNewConversation', () => {
  it('returns true if the conversation does not exist', () => {
    let isNew = isNewConversation({ from: 'bar' }, stateConversations);
    expect(isNew).toBe(true);
  });

  it('returns false if the conversation does exist', () => {
    let isNew = isNewConversation({ from: 'foo' }, stateConversations);
    expect(isNew).toBe(false);
  });
});

describe('conversations middleware', () => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn()
  };
  const next = jest.fn();
  const conversationAction = 'new conversaton action';
  newFromMessage.mockReturnValue(conversationAction);

  beforeEach(() => {
    store.getState.mockClear();
    store.dispatch.mockClear();
    next.mockClear();
    newFromMessage.mockClear();
    setTimeout.mockClear();
  });

  it('dispatches new conversation action on new message when conversation does not exist', () => {
    let messageFromNew = { type: ACTIONS.MESSAGE.NEW, from: 'bar' };
    conversations(store)(next)(messageFromNew);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(newFromMessage).toHaveBeenCalledWith(messageFromNew);
    expect(store.dispatch).toHaveBeenCalledWith(conversationAction);
  });


  it('dispatches new conversation action on archive message when conversation does not exist', () => {
    let archiveMessageFromNew = { type: ACTIONS.MESSAGE.ARCHIVE, from: 'bar' };
    conversations(store)(next)(archiveMessageFromNew);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(newFromMessage).toHaveBeenCalledWith(archiveMessageFromNew);
    expect(store.dispatch).toHaveBeenCalledWith(conversationAction);
  });

  it('does nothing when new message if from an existing conversation', () => {
    let newMessageFromExisting = { type: ACTIONS.MESSAGE.NEW, from: 'foo' };
    conversations(store)(next)(newMessageFromExisting);
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('does nothing when archive message if from an existing conversation', () => {
    let archiveMessageFromExisting = { type: ACTIONS.MESSAGE.ARCHIVE, from: 'foo' };
    conversations(store)(next)(archiveMessageFromExisting);
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('does nothing by default', () => {
    let action = { type: 'FOO.BAR', from: 'foo' };
    conversations(store)(next)(action);
    expect(setTimeout).not.toHaveBeenCalled();
  });
});

