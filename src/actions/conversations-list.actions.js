import ACTIONS from './action.types';

export function sorted(updated, list) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.SORT,
    updated,
    list,
  };
}

export function add(conversation) {
  let pending = conversation;
  if (!(pending instanceof Array)) {
    pending = [conversation];
  }
  return {
    type: ACTIONS.CONVERSATIONS_LIST.ADD,
    list: pending
  };
}

export function remove(removed, newList) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.REMOVE,
    list: newList,
    removed,
  };
}
