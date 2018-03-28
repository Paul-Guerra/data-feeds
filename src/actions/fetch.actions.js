import ACTIONS from './action.types';

export function fetching(promise, url) {
  return {
    type: ACTIONS.FETCH.FETCHING,
    promise,
    url
  };
}

export function click(url) {
  return {
    type: ACTIONS.FETCH.CLICK,
    url
  };
}

export function fetched(data) {
  return {
    type: ACTIONS.FETCH.FETCHED,
    data
  };
}

export function error(e) {
  return {
    type: ACTIONS.FETCH.ERROR,
    error: e
  };
}
