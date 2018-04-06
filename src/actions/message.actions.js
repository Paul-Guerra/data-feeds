import ACTIONS from './action.types';

export function archivedMessage(systemId, contact, content) {
  return {
    type: ACTIONS.MESSAGE.ARCHIVE,
    from: contact.id,
    name: contact.name,
    systemId,
    content
  };
}

export function publishMessage(systemId, contact, content) {
  return {
    type: ACTIONS.MESSAGE.NEW,
    from: contact.id,
    name: contact.name,
    systemId,
    content
  };
}
