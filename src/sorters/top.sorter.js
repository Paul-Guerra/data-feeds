import repeat from '../utils/repeat';

export function makeAsyncBringToTop(topIds, list) {
  let top = [];
  let bottom = [];
  return function asyncBringToTop(index, resolve) {
    if (topIds.has(list[index])) {
      top.push(list[index]);
    } else {
      bottom.push(list[index]);
    }
    if (index === list.length - 1) {
      resolve(top.concat(bottom));
    }
  };
}

export default function bringToTop(topIds, list) {
  let top = [];
  let bottom = [];
  list.forEach((id) => {
    if (topIds.has(id)) {
      top.push(id);
    } else {
      bottom.push(id);
    }
  });
  return top.concat(bottom);
}
