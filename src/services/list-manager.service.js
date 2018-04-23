import { sorted, add, remove } from '../actions/conversations-list.actions';

export class JobQueue {
  constructor() {
    this.jobs = [];
  }

  enqueue(job) {
    if (!job) return;
    this.jobs.push(job);
    if (this.jobs.length === 1) {
      this.nextJob();
    }
  }

  nextJob() {
    return setTimeout(() => this.dequeue(), 0);
  }

  dequeue() {
    if (this.jobs.length === 0) {
      return;
    }
    let job = this.jobs.shift();

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
    return this.jobs.enqueue(() => {
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
