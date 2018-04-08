import ACTIONS from '../actions/action.types';
import { newFromMessage } from '../actions/conversation.actions';

function isNewConversation(message, conversations) {
  return !conversations[message.from];
}

// get contact/from id
// if id is not present in conversations object add it and sort
// if id is present in conversations object update last update timestamp and sort it

// if a new conversation was added while sorting old array
// prepend the new conversation to the sorted results and resort

// if conversations were updated during the sort resort
const conversationsMiddle = store => next => (action) => {
  let { conversations } = store.getState();
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
      if (isNewConversation(action, conversations)) {
        setTimeout(() => store.dispatch(newFromMessage(action)), 0);
      }
      break;
    case ACTIONS.CONTACT.CLICK:
      break;
    default:
      break;
  }
  next(action); // pass action on to next middleware
};

export default conversationsMiddle;
