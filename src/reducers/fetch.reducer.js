import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {
  status: 'sleeping',
  results: []
};

export default (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.FETCH.FETCHING:
      newState = {
        status: 'getting',
        results: [].concat(state.results)
      };
      break;

    case ACTIONS.FETCH.FETCHED:
      newState = {
        status: 'got',
        results: [].concat(state.results, [action.data])
      };
      break;

    default:
      newState = Object.assign({}, state);
      break;
  }

  return newState;
};
