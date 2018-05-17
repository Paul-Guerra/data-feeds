import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.CONVERSATIONS_LIST.ADD_BATCH:
      newState = Array.from(new Set(state.concat(action.conversations)));
      console.log(action.conversations.length);
      if (newState.length === 1000) console.log(performance.now());
      break;
    case ACTIONS.CONVERSATIONS_LIST.SORT:
    case ACTIONS.CONVERSATIONS_LIST.REMOVE:
    default:
      newState = state;
      break;
  }

  return newState;
};
