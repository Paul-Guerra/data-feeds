import ACTIONS from '../actions/action.types';

// export function conversationsWithContact(id) {
//   let results = [];
//   if (!id) return results;
// }

// get contact/from id
// if id is not present in conversations object add it and sort
// if id is present in conversations object update last update timestamp and sort it

// if a new conversation was added while sorting old array
// prepend the new conversation to the sorted results and resort

// if conversations were updated during the sort resort
const conversationsListMiddle = store => next => (action) => {
  let { conversations } = store.getState();
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
      break;
    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default conversationsListMiddle;
