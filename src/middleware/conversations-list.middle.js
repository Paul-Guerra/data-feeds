import ACTIONS from '../actions/action.types';
import bringToTop from '../sorters/top.sorter';

// export function conversationsWithContact(id) {
//   let results = [];
//   if (!id) return results;
// }

// get contact/from id
// if id is present in conversations object update last update timestamp and sort it



// if conversations were updated during the sort resort
const conversationsListMiddle = store => next => (action) => {
  let { contacts, conversationsList } = store.getState();
  let convoIds;
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
      convoIds = contacts[action.from];
      if (convoIds) {
        bringToTop(convoIds.conversations, conversationsList);
      }
      break;
    case ACTIONS.CONVERSATION.NEW:
      // reducer will add id to top
      // if a new conversation was added while sorting old array
      // prepend the new conversation to the sorted results and resort
      break;
    case ACTIONS.CONVERSATION.REMOVED:
      // find it and remove it
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsListMiddle;
