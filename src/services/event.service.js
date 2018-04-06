import WorkerBridge from '../workers/bridge';

export class EventService extends WorkerBridge {
  // Tells worker to run in a specific profile
  run(profile) {
    console.log(`EventService.run(${profile})`);
    this.worker.postMessage({ context: 'profile', action: 'stop' });
    this.worker.postMessage({ context: 'profile', action: 'load', profile });
    this.worker.postMessage({ context: 'profile', action: 'run' });
  }
}

let service;

export default function init(dispatch) {
  if (!service) service = new EventService(dispatch, '/event-scheduler.worker.bundle.js');
  return service;
}
