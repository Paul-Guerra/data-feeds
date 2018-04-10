/* global onmessage */
import 'babel-polyfill';
import LoadTest from './runner';

const eventScheduler = new LoadTest();

/*
 * receives messages sent to this worker and
 * call the appropriate method
 */
onmessage = (event) => {
  let key = `${event.data.context}::${event.data.action}`;
  switch (key) {
    case 'profile::load':
      eventScheduler.loadProfile(event.data.profile);
      break;
    case 'profile::run':
      eventScheduler.runProfile();
      break;
    case 'profile::stop':
      eventScheduler.stopProfile();
      break;
    default:
      console.warn(`No case for ${key}`);
      break;
  }
};
