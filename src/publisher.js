import loremIpsum from 'lorem-ipsum';
import slugify from 'slugify';
import { repeat } from './utils/async-job';
import { archivedHeadline, publishHeadline } from './actions/publisher.actions';
import system from './system';

export function* makeHeadline(prefix = '', index = 0, inc = 1) {
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
    this.id = slugify(name, { lower: true });
    this.dispatch = dispatch;
    const newHeadline = makeHeadline(`${this.name} - `, initialIndex);
    const oldHeadline = makeHeadline(`${this.name} - `, initialIndex - 1, -1);
    this.nextHeadline = () => newHeadline.next().value;
    this.prevHeadline = () => oldHeadline.next().value;
  }

  getArchive(limit = 50) {
    repeat(
      () => {
        let systemId = system.prevId();
        let headline = this.prevHeadline();
        this.dispatch(archivedHeadline(systemId, this.id, `(${systemId}): ${headline}`));
      },
      limit,
      0
    );
  }

  publish() {
    let systemId = system.nextId();
    let headline = this.nextHeadline();
    this.dispatch(publishHeadline(systemId, this.id, `(${systemId}): ${headline}`));
  }
}
