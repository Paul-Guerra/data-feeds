/* global postMessage */
import run from './default.profile';

/*
 * EventScheduler is resposible for posting messages to it's parent
 * at scheduled intervals according to the current profile loaded.
 * The EventScheduler is running in its own event loop as a WebWorker
 * so that it's timer is independent as possible from it's parent process
 * to similulate push load from external source eg, server push
 */
export default class LoadTestRunner {
  constructor() {
    console.log('[EventScheduler] constructor()');
    postMessage({ type: 'WORKER.READY' });
  }

  loadProfile(name) {
    console.log(`EventScheduler.loadProfile(${name})`);
    return this;
  }
  
  runProfile() {
    console.log('EventScheduler.runProfile()');
    run(msg => postMessage(msg));
    return this;
  }

  stopProfile() {
    console.log('EventScheduler.stopProfile()');
    return this;
  }
}
