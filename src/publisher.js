import loremIpsum from 'lorem-ipsum';
import { repeat } from './utils/async-job';


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
    this.dispatch = dispatch;
    this.nextHeadline = makeHeadline(`${this.name} - `, initialIndex);
    this.prevHeadline = makeHeadline(`${this.name} - `, initialIndex - 1, -1);
  }

  getArchive(limit = 50) {
    repeat(
      () => {
        this.dispatch({
          type: 'HEADLINE.ARCHIVE',
          from: this.name,
          headline: this.prevHeadline.next()
        });
      },
      50
    );
  }

  publish() {
    this.dispatch({
      type: 'HEADLINE.PUBLISH',
      from: this.name,
      headline: this.nextHeadline.next()
    });
  }
}
