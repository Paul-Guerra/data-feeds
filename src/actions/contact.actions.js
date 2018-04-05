import ACTIONS from './action.types';

export default function subscribed(contact) {
  return {
    type: ACTIONS.CONTACT.SUBSCRIBED,
    id: contact.id,
    name: contact.name
  };
}

export function click(id) {
  return {
    type: ACTIONS.CONTACT.CLICK,
    id
  };
}
