/* global self */
/**
 * DataWorker is resposible for posting messages to it's parent
 * at scheduled intervals according to the current profile loaded.
 * The DataWorker is running in its own event loop as a WebWorker
 * so that it's timer is independent as possible from it's parent process
 * to similulate push load from external source eg, server push
 */
export default class EventScheduler {
  constructor() {
    console.log('[CONSTRUCTOR]');
    postMessage({ type: 'WORKER.READY' });
  }

  loadProfile(name) {
    console.log(`EventScheduler.loadProfile(${name})`);
    return this;
  }
  
  runProfile() {
    console.log('EventScheduler.runProfile()');
    return this;
  }

  stopProfile() {
    console.log('EventScheduler.stopProfile()');
    return this;
  }
}

const eventScheduler = new EventScheduler();
/**
 * receives messages sent to this worker and
 * call the appropriate method
 */
self.onmessage = (event) => {
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
