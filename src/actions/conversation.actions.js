import ACTIONS from './action.types';

export function newFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATION.NEW,
    id: message.from,
    name: message.name,
    contacts: [message.from]
  };
}

export function newFromContact(contact) {
  return {
    type: ACTIONS.CONVERSATION.NEW,
    id: contact.id,
    name: contact.name,
    contacts: [contact.id]
  };
}
