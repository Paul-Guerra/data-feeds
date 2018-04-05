import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  let data = {};
  switch (action.type) {
    case ACTIONS.CONTACT.SUBSCRIBED:
      data[action.id] = {
        id: action.id,
        name: action.name
      };
      newState = [].concat(state, [action.id]);
      break;
    default:
      newState = [].concat(state);
      break;
  }

  return newState;
};
