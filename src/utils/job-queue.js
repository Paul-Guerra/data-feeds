
export default class JobQueue {
  constructor() {
    this.jobs = [];
  }

  enqueue(job) {
    if (typeof job !== 'function') return;
    this.jobs.push(job);
    if (this.jobs.length === 1) {
      this.nextJob();
    }
  }

  nextJob() {
    return setTimeout(() => {
      try {
        this.dequeue();
      } catch (error) {
        console.error(error);
        this.nextJob();
      }
    }, 0);
  }

  dequeue() {
    if (this.jobs.length === 0) {
      return;
    }
    let job = this.jobs.shift();

    // be resilient against a bad push onto the queue
    if (typeof job !== 'function') {
      console.warn('Job is not a function, dropping');
      this.nextJob();
      return;
    }

    let result = job();
    if (result instanceof Promise) {
      result.then(() => this.nextJob());
    } else {
      this.nextJob();
    }
  }
}
