import ACTIONS from '../actions/action.types';
import ConversationsManager from '../services/conversations.service';

const convoManager = new ConversationsManager();

export function isNewConversation(message, conversations) {
  return !conversations[message.from];
}

const conversationsMiddle = store => next => (action) => {
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
      if (isNewConversation(action, store.getState().conversations)) {
        convoManager.onNewMessage(action, store.dispatch);
      }
      break;
    case ACTIONS.CONVERSATIONS.REMOVE_REQUEST:
      convoManager.onRemoveRequest(action.id, store.dispatch);
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsMiddle;
