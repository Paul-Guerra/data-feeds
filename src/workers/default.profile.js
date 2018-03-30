import loremIpsum from 'lorem-ipsum';
import repeat from './repeat';

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

export function publisher(dispatch) {
  let headline = makeHeadline();
  dispatch({
    type: 'HEADLINE.PUBLISH',
    headline: headline.next()
  });
}

export default function init(dispatch) {
  repeat(() => publisher(dispatch));
}
