import ACTIONS from '../actions/action.types';
import { newFromMessage } from '../actions/conversation.actions';

export function isNewConversation(message, conversations) {
  return !conversations[message.from];
}

const conversationsMiddle = store => next => (action) => {
  let { conversations } = store.getState();
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
      setTimeout(() => {
        if (isNewConversation(action, conversations)) {
          store.dispatch(newFromMessage(action));
        }
      }, 0);
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsMiddle;
