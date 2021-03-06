import { sorted, addBatch, remove, removeRequest } from '../actions/conversations-list.actions';
import JobQueue from '../utils/unique-job-queue';
import forEach from '../utils/foreach';

// Responsible for managing the state of a list
// during async operations
export default class ConversationsListManager {
  constructor(sorter) {
    this.sort = sorter;
    this.jobs = new JobQueue(['add', 'remove', 'bringToTop']);
  }

  onNewMessage(convos, list, dispatch) {
    return this.jobs.enqueue(() => {
      this.sort(convos, list).then((sortedList) => {
        dispatch(sorted(convos, sortedList));
      });
    });
  }

  onNewConversation(conversation, dispatch) {
    return this.jobs.enqueue('add', conversation, update => dispatch(addBatch(update)));
  }


  onNewConversationBatch(conversations, dispatch) {
    let ids = [];
    return forEach(conversations, (convo) => {
      ids.push(Object.keys(convo)[0]);
    }).then(() => {
      this.jobs.enqueue('add', ids, (update) => {
        let allUpdates = [];
        update.forEach((batch) => {
          allUpdates.push(...batch);
        });
        dispatch(addBatch(allUpdates));
      });
    });
  }

  onRemoveConversation(conversation, list, dispatch) {
    // todo: move to reducer. no use for bulk optimizations.
    // OR move to job queue to do the update and avoid leaving
    // entries in the list that map to undefined conversaitons
    let index = list.indexOf(conversation);
    let before = list.slice(0, index);
    let after = list.slice(index + 1, list.length);
    return this.jobs.enqueue(() => {
      dispatch(remove(conversation, [before].concat(after)));
    });
  }
}
