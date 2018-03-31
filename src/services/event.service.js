export class EventService {
  /**
   * Receives messages from a seperate worker process and
   * dispatches the appropriate action. It is also responsible for
   * configuring the worker to run a specific profile
   * @param {function} dispatch
   */
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.worker = new Worker('/event-scheduler.worker.bundle.js');
    this.worker.onerror = e => EventService.onError(e);
    this.worker.onmessage = event => this.onMessage(event);
    this.workerInit = {};
    this.onInit = new Promise((resolve, reject) => {
      this.workerInit.resolve = resolve;
      this.workerInit.reject = reject;
    });
  }
  /**
   * Tells worker to run in a specific profile
   * @param {string} profile
   */
  run(profile) {
    console.log(`EventService.run(${profile})`);
    this.worker.postMessage({ context: 'profile', action: 'stop' });
    this.worker.postMessage({ context: 'profile', action: 'load', profile });
    this.worker.postMessage({ context: 'profile', action: 'run' });
  }

  static onError(e) {
    console.error('[EventScheduler] error', e);
  }

  onMessage(event) {
    let action = event.data;
    console.log(action.type);
    switch (action.type) {
      case 'WORKER.READY':
        console.log('WORKER.READY');
        this.workerInit.resolve();
        break;
      case 'WORKER.FAILED':
        console.log('WORKER.FAILED');
        this.workerInit.reject();
        break;
      default:
        break;
    }
    this.dispatch(action);
  }
}

let service;

export default function init(dispatch) {
  if (!service) service = new EventService(dispatch);
  return service;
}
