import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.CONVERSATIONS_LIST.SORT:
    case ACTIONS.CONVERSATIONS_LIST.ADD:
    case ACTIONS.CONVERSATIONS_LIST.REMOVE:
      newState = [].concat(action.list);
      break;
    default:
      newState = [].concat(state);
      break;
  }

  return newState;
};
