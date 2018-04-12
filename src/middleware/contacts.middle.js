import ACTIONS from '../actions/action.types';
import { newFromMessage } from '../actions/contact.actions';

export function isFromNewContact(message, contacts) {
  return !contacts[message.from];
}

const contactsMiddle = store => next => (action) => {
  let { contacts } = store.getState();
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
      if (isFromNewContact(action, contacts)) {
        setTimeout(() => store.dispatch(newFromMessage(action)), 0);
      }
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default contactsMiddle;
