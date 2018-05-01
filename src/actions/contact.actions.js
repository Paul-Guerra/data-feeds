import ACTIONS from './action.types';

export default function subscribed(contact, kind = 'person') {
  return {
    type: ACTIONS.CONTACT.SUBSCRIBED,
    id: contact.id,
    name: contact.name,
    kind
  };
}

export function newFromMessage(message, kind = 'person') {
  return {
    type: ACTIONS.CONTACT.NEW,
    id: message.from,
    name: message.name,
    kind
  };
}

export function click(id) {
  return {
    type: ACTIONS.CONTACT.CLICK,
    id
  };
}
