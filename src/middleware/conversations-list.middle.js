import throttle from 'lodash.throttle';
import ACTIONS from '../actions/action.types';
import { addBatch } from '../actions/conversations-list.actions';
import bringToTop from '../sorters/top.sorter';
import ConversationsListManager from '../services/list-manager.service';

let listManager = new ConversationsListManager(bringToTop);
let listAddBuffer = [];

const listBulkUpdate = throttle((dispatch) => {
  let update = [].concat(listAddBuffer);
  listAddBuffer = [];
  dispatch(addBatch(update));
}, 100);

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
      // enque conversation list item to be created
      listManager.onNewConversation(action.id, store.dispatch);
      break;
    case ACTIONS.CONVERSATION.REMOVED:
      // listManager.onRemoveConversation(action.id, conversationsList, store.dispatch);
      break;
    case ACTIONS.CONVERSATIONS_LIST.ADD:
      // buffer all NEW conversations to be added to the list and
      // dispatch later as a bulk update from a throttled function
      // if (conversationsList.indexOf(action.id) === -1) {
      //   listAddBuffer.push(action.id);
      //   listBulkUpdate(store.dispatch);
      // }
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsListMiddle;
