import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {
  time: 'Unknown',
};

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.TIMER.UPDATE:
      newState = {
        time: action.data.toTimeString(),
      };
      break;

    default:
      newState = Object.assign({}, state);
      break;
  }

  return newState;
};
