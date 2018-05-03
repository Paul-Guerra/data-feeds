import { addBatch, messageToConvo } from '../actions/conversations.actions';
import JobQueue from '../utils/unique-job-queue';

// Responsible for managing the state of a list
// during async operations
export default class ConversationsManager {
  constructor() {
    this.jobs = new JobQueue(['add', 'remove']);
  }

  onNewMessage(message, dispatch) {
    return this.jobs.enqueue('add', messageToConvo(message), update => dispatch(addBatch(update)));
  }
}
