import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.CONVERSATION.NEW:
      newState = [action.id].concat(state);
      break;
    default:
      newState = [].concat(state);
      break;
  }

  return newState;
};
