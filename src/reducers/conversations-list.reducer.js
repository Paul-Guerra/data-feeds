import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;
  let index;
  let before;
  let after;

  switch (action.type) {
    case ACTIONS.CONVERSATIONS_LIST.ADD_BATCH:
      newState = Array.from(new Set(action.conversations.concat(state)));
      break;
    case ACTIONS.CONVERSATION.REMOVED:
      // let list = getState().conversationsList;
      // let index = list.indexOf(conversation);
      // let before = list.slice(0, index);
      // let after = list.slice(index + 1, list.length);
      // dispatch(removeRequest(conversation, [before].concat(after)));
      newState = [].concat(state);
      action.conversations.forEach((id) => {
        index = newState.indexOf(id);
        before = newState.slice(0, index);
        after = newState.slice(index + 1, newState.length);
        newState = [before].concat(after);
      });
      break;
    case ACTIONS.CONVERSATIONS_LIST.SORT:
    default:
      newState = state;
      break;
  }

  return newState;
};
