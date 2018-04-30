import JobQueue from './job-queue';
import { addBatch } from '../actions/conversations-list.actions';
import dedupe from '../utils/dedupe';

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
      setTimeout(() => {
        let update = [].concat(this.buffer[name]);
        job(update);
        this.buffer[name] = [];
        this.names.delete(name);
      }, 0);
    });
  }
}
