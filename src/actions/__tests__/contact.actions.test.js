/* global describe, it, expect */
import ACTIONS from '../action.types';
import subscribed, { click, newFromMessage } from '../contact.actions';

describe('Subscribed action', () => {
  it('dispatches a subscribed action', () => {
    let contact = { id: 'foo', name: 'bar' };
    let action = subscribed(contact);
    expect(action.type).toEqual(ACTIONS.CONTACT.SUBSCRIBED);
  });
});


describe('Click action', () => {
  it('dispatches a subscribed action', () => {
    // let event = { id: 'foo' };
    let action = click('foo');
    expect(action.type).toEqual(ACTIONS.CONTACT.CLICK);
    expect(action.id).toEqual('foo');
  });
});

describe('New from message action', () => {
  it('dispatches a subscribed action', () => {
    let msg = { from: 'foo', name: 'bar' };
    let action = newFromMessage(msg);
    expect(action.type).toEqual(ACTIONS.CONTACT.NEW);
    expect(action.id).toEqual(msg.from);
    expect(action.name).toEqual(msg.name);
  });
});
