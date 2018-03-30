import loremIpsum from 'lorem-ipsum';
import repeat from '../utils/repeat';

function* makeHeadline(prefix = '') {
  let id = 1;
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
    id += 1;
  }
}

export function publisher(name, dispatch) {
  let headline = makeHeadline(`${name} - `);
  dispatch({
    type: 'HEADLINE.PUBLISH',
    from: name,
    headline: headline.next()
  });
}

export default function init(dispatch) {
  repeat(() => publisher('Daily Planet', dispatch), Infinity, 1000);
  repeat(() => publisher('Daily Bugle', dispatch), Infinity, 2000);
  repeat(() => publisher('Gotham Gazette', dispatch), Infinity, 3000);
}
