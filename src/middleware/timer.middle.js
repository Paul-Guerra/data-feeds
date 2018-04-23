import ACTIONS from '../actions/action.types';
import update from '../actions/timer.actions';
import startTimer from '../services/timer.service';

export function makeOnUpdate(dispatcher) {
  return (time) => { dispatcher(update(time)); };
}

const timerMiddle = store => next => (action) => {
  switch (action.type) {
    case ACTIONS.APP.READY:
      startTimer(makeOnUpdate(store.dispatch));
      break;

    default:
      break;
  }
  next(action); // pass action on to next middleware
};

export default timerMiddle;
