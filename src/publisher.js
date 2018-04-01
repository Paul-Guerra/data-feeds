import loremIpsum from 'lorem-ipsum';
import { repeat } from './utils/async-job';
import system from './system';

function* makeHeadline(prefix = '', index = 0, inc = 1) {
  let id = index;
  while (true) {
    let text = loremIpsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 5,
      sentenceUpperBound: 10,
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
      random: Math.random,
      format: 'plain',
    });
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
        let systemId = system.prevId();
        this.dispatch({
          type: 'HEADLINE.ARCHIVE',
          systemId,
          from: this.name,
          headline: this.prevHeadline.next()
          headline: `(${systemId}): ${headline}`
        });
      },
      limit,
      0
    );
  }

  publish() {
    let headline = this.nextHeadline.next().value;
    let systemId = system.nextId();
    this.dispatch({
      type: 'HEADLINE.PUBLISH',
      systemId,
      from: this.name,
      headline: `(${systemId}): ${headline}`
    });
  }
}
