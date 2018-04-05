import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  let newState;

  let data = {};
  switch (action.type) {
    case ACTIONS.MESSAGE.NEW:
    case ACTIONS.MESSAGE.ARCHIVE:
    case ACTIONS.CONTACT.SUBSCRIPTION.CLICK:
      newState = Object.assign({}, state);
      break;
    default:
      newState = Object.assign({}, state);
      break;
  }

  return newState;
};
