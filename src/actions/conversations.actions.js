import ACTIONS from './action.types';

export function messageToConvo(message) {
  let convo = {};
  convo[message.from] = {
    id: message.from,
    name: message.name,
    contacts: new Set([message.from])
  };
  return convo;
}

export function newFromMessage(message) {
  return {
    type: ACTIONS.CONVERSATIONS.NEW,
    id: message.from,
    name: message.name,
    contacts: new Set([message.from])
  };
}

export function newFromContact(contact) {
  return {
    type: ACTIONS.CONVERSATIONS.NEW,
    id: contact.id,
    name: contact.name,
    contacts: new Set([contact.id])
  };
}

export function addBatch(data) {
  let conversations = data;
  if (!(data instanceof Array)) conversations = [data];
  return {
    type: ACTIONS.CONVERSATIONS.ADD_BATCH,
    conversations
  };
}

export function removeRequest(id) {
  // let conversations = ids;
  // if (!(ids instanceof Array)) conversations = [ids];
  return {
    type: ACTIONS.CONVERSATIONS.REMOVE_REQUEST,
    id
  };
}

export function removed(id) {
  return {
    type: ACTIONS.CONVERSATIONS.REMOVED,
    id
  };
}
