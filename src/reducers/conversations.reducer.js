import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  let newState;

  let data = {};
  switch (action.type) {
    case ACTIONS.CONVERSATIONS.NEW:
      data[action.id] = {
        id: action.id,
        name: action.name,
        contacts: new Set(action.contacts),
      };
      newState = Object.assign({}, state, data);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};
