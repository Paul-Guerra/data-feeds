import { sorted, add, remove } from '../actions/conversations-list.actions';
import JobQueue from '../utils/job-queue';

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
