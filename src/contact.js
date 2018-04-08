import loremIpsum from 'lorem-ipsum';
import slugify from 'slugify';
import repeat from './utils/repeat';
import { archivedMessage, newMessage } from './actions/message.actions';
import system from './system';

export function* makeMessage(prefix = '', index = 0, inc = 1) {
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

export default class Contact {
  constructor(name, dispatch, initialIndex = 0) {
    this.name = name;
    this.id = slugify(name, { lower: true });
    this.dispatch = dispatch;
    const newMessage = makeMessage(`${this.name} - `, initialIndex);
    const oldMessage = makeMessage(`${this.name} - `, initialIndex - 1, -1);
    this.nextMessage = () => newMessage.next().value;
    this.prevMessage = () => oldMessage.next().value;
  }

  getArchive(limit = 50) {
    repeat(
      () => {
        let systemId = system.prevId();
        let message = this.prevMessage();
        this.dispatch(archivedMessage(systemId, this, `(${systemId}): ${message}`));
      },
      limit,
      0
    );
  }

  publish() {
    let systemId = system.nextId();
    let message = this.nextMessage();
    this.dispatch(newMessage(systemId, this, `(${systemId}): ${message}`));
  }
}
