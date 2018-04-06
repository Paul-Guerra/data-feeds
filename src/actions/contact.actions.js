import ACTIONS from './action.types';

export default function subscribed(contact) {
  return {
    type: ACTIONS.CONTACT.SUBSCRIBED,
    id: contact.id,
    name: contact.name
  };
}

export function newFromMessage(message) {
  return {
    type: ACTIONS.CONTACT.NEW,
    id: message.from,
    name: message.name
  };
}

export function click(id) {
  return {
    type: ACTIONS.CONTACT.CLICK,
    id
  };
}
