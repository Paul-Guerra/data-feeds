import ACTIONS from '../actions/action.types';
import init from '../services/event.service';

let dataService;

const eventMiddle = store => next => (action) => {
  console.log('event.middle', action);
  switch (action.type) {
    case ACTIONS.APP.READY:
      dataService = init(store.dispatch);
      dataService.onInit.then(() => {
        dataService.run('default');
      });
      break;

    default:
      break;
  }
  next(action); // pass action on to next middleware
};

export default eventMiddle;
