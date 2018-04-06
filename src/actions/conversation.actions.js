import ACTIONS from './action.types';

export function newFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATION.NEW,
    id: message.from,
    name: message.name,
    sources: [message.id]
  };
}

export function updateFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATION.UPDATE,
    id: message.id,
    name: message.name,
    sources: [message.id]
  };
}

