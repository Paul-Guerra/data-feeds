import ACTIONS from './action.types';

export function sorted(updated, list) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.SORT,
    updated,
    list,
  };
}

export function add(conversation) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.ADD,
    id: conversation
  };
}

export function addBatch(conversations) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.ADD_BATCH,
    conversations
  };
}

export function remove(removed, newList) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.REMOVE,
    list: newList,
    removed,
  };
}
