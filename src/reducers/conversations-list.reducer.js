import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.CONVERSATIONS_LIST.ADD_BATCH:
      newState = [].concat(action.conversations, state);
      break;
    case ACTIONS.CONVERSATIONS_LIST.SORT:
    case ACTIONS.CONVERSATIONS_LIST.REMOVE:
    default:
      newState = state;
      break;
  }

  return newState;
};
