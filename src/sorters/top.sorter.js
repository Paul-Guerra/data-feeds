import forEach from '../utils/foreach';

export default function bringToTop(topIds, list) {
  let top = [];
  let bottom = [];

  function onEach(item, index, resolve) {
    if (topIds.has(item)) {
      top.push(item);
    } else {
      bottom.push(item);
    }
  }

  return forEach(list, onEach).then(() => top.concat(bottom));
}

export function syncbringToTop(topIds, list) {
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
