import ACTIONS from '../actions/action.types';
import init from '../services/event.service';

let dataService;

const eventMiddle = store => next => (action) => {
  switch (action.type) {
    case ACTIONS.APP.READY:
      if (!dataService) {
        dataService = init(store.dispatch);
      }
      dataService.onInit.then(() => {
        dataService.run('default');
      });
      break;

    default:
      break;
  }
  return next(action); // pass action on to next middleware
};

export default eventMiddle;
