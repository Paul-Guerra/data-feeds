import ACTIONS from '../actions/action.types';

const INITIAL_STATE = { 
  conversationList: {
    bringToTop: true
  }
};

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    default:
      newState = Object.assign({}, state);
      break;
  }

  return newState;
};
