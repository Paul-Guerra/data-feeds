import JobQueue from './job-queue';

export default class UniqueJobQueue extends JobQueue {
  constructor() {
    super();
    this.names = new Set();
    this.buffer = {
      add: [],
      remove: [],
      bringToTop: []
    };
  }

  enqueue(name, item, job) {
    this.buffer[name].unshift(item);
    if (this.names.has(name)) {
      return;
    }
    this.names.add(name);
    super.enqueue(() => {
      let update = [].concat(this.buffer[name]);
      this.buffer[name] = [];
      this.names.delete(name);
      job(update);
    });
  }
}
