import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  let newState;

  let data = {};
  switch (action.type) {
    case ACTIONS.HEADLINE.NEW:
    case ACTIONS.HEADLINE.ARCHIVE:
    case ACTIONS.PUBLISHER.SUBSCRIPTION.CLICK:
      newState = Object.assign({}, state);
      break;
    default:
      newState = Object.assign({}, state);
      break;
  }

  return newState;
};
