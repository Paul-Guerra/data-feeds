import ACTIONS from '../actions/action.types';
import { newFromMessage } from '../actions/contact.actions';

export function isNewContact(message, contacts) {
  return !contacts[message.from];
}

// if conversations were updated during the sort resort
const contactsMiddle = store => next => (action) => {
  let { contacts } = store.getState();
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
      if (isNewContact(action, contacts)) {
        setTimeout(() => store.dispatch(newFromMessage(action)), 0);
      }
      break;
    default:
      break;
  }
  next(action); // pass action on to next middleware
};

export default contactsMiddle;
