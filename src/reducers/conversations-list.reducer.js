import ACTIONS from '../actions/action.types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
    case ACTIONS.CONTACT.CLICK:
      newState = [].concat(state);
      break;
    default:
      newState = [].concat(state);
      break;
  }

  return newState;
};
