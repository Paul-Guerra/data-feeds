import { addBatch, removed, messageToConvo } from '../actions/conversations.actions';
import JobQueue from '../utils/unique-job-queue';

// Responsible for managing the state of a list
// during async operations
export default class ConversationsManager {
  constructor() {
    this.jobs = new JobQueue(['add']);
  }

  onNewMessage(message, dispatch) {
    return this.jobs.enqueue('add', messageToConvo(message), update => dispatch(addBatch(update)));
  }

  onRemoveRequest(id, dispatch) {
    // simulate a server delay where we wait for our presence to be removed
    // from the room and the server to acknowledge the request
    let max = 500;
    let min = 100;
    let rnd = (Math.random() * (max - min + 1)) + min;
    setTimeout(() => dispatch(removed(id)), rnd);
  }

  // onRemoved(id, dispatch) {
  //   return this.jobs.enqueue('remove', id, update => dispatch(removeBatch(update)));
  // }
}
