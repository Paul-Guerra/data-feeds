import loremIpsum from 'lorem-ipsum';
import repeat from './utils/repeat';
import doAsyncJob from './utils/async-job';


function* makeHeadline(prefix = '', index = 0, inc = 1) {
  let id = index;
  let text = loremIpsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 5,
    sentenceUpperBound: 10,
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    format: 'plain',
  });
  while (true) {
    yield `${id} - ${prefix}${text}`;
    id += inc;
  }
}

export default class Publisher {
  constructor(name, dispatch, initialIndex = 0) {
    this.name = name;
    this.dispatch = (...args) => dispatch(args);
    this.headlineWriter = makeHeadline(`${this.name} - `, initialIndex);
  }

  getArchive() {
    return this;
  }

  publish() {
    postMessage({
      type: 'HEADLINE.PUBLISH',
      from: 'this.name',
      headline: this.headlineWriter.next()
    });
  }
}
