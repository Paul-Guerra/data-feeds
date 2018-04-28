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

  enqueue(name, item, dispatch) {
    if (this.names.has(name)) {
      this.buffer[name].unshift(item);
      return;
    }
    this.names.add(name);
    super.enqueue(() => {
      let ids = dedupe(this.buffer[name]);
      setTimeout(() => dispatch(addBatch(ids)), 0);
      this.names.delete(name);
    });
  }
}
