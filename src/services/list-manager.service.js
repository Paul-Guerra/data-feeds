import ACTIONS from '../actions/action.types';

export class JobQueue {
  constructor() {
    this.jobs = [];
    this.nextJobId = null;
    this.currentJob = null;
  }

  enqueue(name, job) {
    if (!name || !job) return;
    this.jobs.push({ name, job });
    if (!this.nextJobId) {
      this.nextJob();
    }
  }

  nextJob() {
    if (this.nextJobId) return false;
    this.nextJobId = setTimeout(() => this.dequeue(), 0);
    return this.nextJobId;
  }

  dequeue() {
    if (this.jobs.length === 0) {
      this.currentJob = null;
      this.nextJobId = null;
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
        dispatch({
          type: ACTIONS.CONVERSATIONS_LIST.SORT,
          updated: convos,
          list: sortedList,
        });
      });
    });
  }

  onNewConversation(conversation, list, dispatch) {
    return this.jobs.enqueue('add', () => {
      dispatch({
        type: ACTIONS.CONVERSATIONS_LIST.ADD,
        list: [conversation].concat(list)
      });
    });
  }

  onRemoveConversation(conversation, list, dispatch) {
    let index = list.indexOf(conversation);
    let before = list.slice(0, index);
    let after = list.slice(index + 1, list.length);
    return this.jobs.enqueue('remove', () => {
      dispatch({
        type: ACTIONS.CONVERSATIONS_LIST.REMOVE,
        list: [before].concat(after)
      });
    });
  }
}
