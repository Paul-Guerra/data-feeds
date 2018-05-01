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

export function remove(id) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.REMOVE,
    id
  };
}

export function removeRequest(ids) {
  let conversations = ids;
  if (!(ids instanceof Array)) conversations = [ids];
  return {
    type: ACTIONS.CONVERSATIONS_LIST.REMOVE_REQUEST,
    conversations
  };
}

export function addBatch(conversations) {
  return {
    type: ACTIONS.CONVERSATIONS_LIST.ADD_BATCH,
    conversations
  };
}
