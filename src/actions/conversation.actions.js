import ACTIONS from './action.types';

export function newFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATION.NEW,
    id: message.from,
    name: message.name,
    contacts: [message.from]
  };
}

export function updateFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATION.UPDATE,
    id: message.from,
    name: message.name,
    contacts: [message.from]
  };
}

