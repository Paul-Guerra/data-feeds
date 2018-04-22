import ACTIONS from '../actions/action.types';
import bringToTop from '../sorters/top.sorter';
import ConversationsListManager from '../services/list-manager.service';

let listManager = new ConversationsListManager(bringToTop);

const conversationsListMiddle = store => next => (action) => {
  let { contacts, conversationsList } = store.getState();
  let contact;
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
      // take new messages from **existing** contacts and bring them to the top
      // messages from non existing contacts will fall through to other middlewares
      // and create a new contact and conversation actions that will be dispatched.
      // Those conversations will be appended to top in the other switch cases
      // contact = contacts[action.from];
      // if (contact) {
      //   listManager.onNewMessage(contact.conversations, conversationsList, store.dispatch);
      // }
      break;
    case ACTIONS.CONVERSATION.NEW:
      // enque conversation to be created
      listManager.onNewConversation(action.id, store.dispatch);
      break;
    case ACTIONS.CONVERSATION.REMOVED:
    // listManager.onRemoveConversation(action.id, conversationsList, store.dispatch);
      break;
    case ACTIONS.CONVERSATIONS_LIST.ADD:
      if (conversationsList.indexOf(action.id) > -1) {
        return;
      }
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsListMiddle;
