export default class WorkerBridge {
  /*
   * Receives and sends messages to and from a seperate
   *  worker process. Also dispatches actions.
   */
  constructor(dispatch, workerPath) {
    this.dispatch = dispatch;
    this.worker = new Worker(workerPath);
    this.worker.onerror = e => WorkerBridge.onError(e);
    this.worker.onmessage = event => this.onMessage(event);
    this.workerInit = {};
    this.onInit = new Promise((resolve, reject) => {
      this.workerInit.resolve = resolve;
      this.workerInit.reject = reject;
    });
  }

  static onError(e) {
    console.error('[WorkerBridge] error', e);
  }

  onMessage(event) {
    let action = event.data;
    switch (action.type) {
      case 'WORKER.READY':
        console.log('[WorkerBridge] WORKER.READY');
        this.workerInit.resolve();
        break;
      case 'WORKER.FAILED':
        console.log('[WorkerBridge] WORKER.FAILED');
        this.workerInit.reject();
        break;
      default:
        break;
    }
    this.dispatch(action);
  }
}
