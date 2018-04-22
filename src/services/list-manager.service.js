import { sorted, add, remove } from '../actions/conversations-list.actions';

export class JobQueue {
  constructor() {
    this.jobs = [];
    this.nextJobId = null;
    this.currentJob = null;
  }

  enqueue(name, job) {
    if (!name || !job) return;
    this.jobs.push({ name, job });
    if (this.jobs.length === 1) {
      this.nextJob();
    }
    // if (!this.nextJobId) {
    //   this.nextJob();
    // }
  }

  nextJob() {
    // if (this.nextJobId) return false;
    // this.nextJobId = setTimeout(() => this.dequeue(), 0);
    // return this.nextJobId;
    return setTimeout(() => this.dequeue(), 0);
  }

  dequeue() {
    if (this.jobs.length === 0) {
      // this.currentJob = null;
      // this.nextJobId = null;
      return;
    }
    let { name, job } = this.jobs.shift();
    this.currentJob = name;

    // be resilient against a bad push onto the queue
    if (!job) {
      this.nextJob();
      return;
    }

    let result = job();
    if (result instanceof Promise) {
      result.then(() => {
        this.nextJob();
      });
    } else {
      this.nextJob();
    }
  }
}

// Responsible for managing the state of a list
// during async operations
export default class ConversationsListManager {
  constructor(sorter) {
    this.sort = sorter;
    this.jobs = new JobQueue();
  }

  onNewMessage(convos, list, dispatch) {
    return this.jobs.enqueue('sort', () => {
      this.sort(convos, list).then((sortedList) => {
        dispatch(sorted(convos, sortedList));
      });
    });
  }

  onNewConversation(conversation, dispatch) {
    return this.jobs.enqueue('add', () => {
      dispatch(add(conversation));
    });
  }

  onRemoveConversation(conversation, list, dispatch) {
    let index = list.indexOf(conversation);
    let before = list.slice(0, index);
    let after = list.slice(index + 1, list.length);
    return this.jobs.enqueue('remove', () => {
      dispatch(remove(conversation, [before].concat(after)));
    });
  }
}
