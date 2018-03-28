import ACTIONS from '../actions/action.types';
import makeDispatcher from '../actions/dispatch-factory';
import { fetching, fetched, error } from '../actions/fetch.actions';
import fetch from '../services/fetch.service';


const fetchMiddle = store => next => (action) => {
  let fetchPromise;
  switch (action.type) {
    case ACTIONS.FETCH.CLICK:
      fetchPromise = fetch(
        action.url,
        makeDispatcher(store.dispatch, fetched),
        makeDispatcher(store.dispatch, error)
      );
      store.dispatch(fetching(fetchPromise, action.url));
      break;

    default:
      break;
  }
  next(action); // pass action on to next middleware
};

export default fetchMiddle;
