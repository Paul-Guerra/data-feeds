import ACTIONS from './action.types';

export function archivedMessage(systemId, id, MESSAGE) {
  return {
    type: ACTIONS.MESSAGE.ARCHIVE,
    from: id,
    systemId,
    MESSAGE
  };
}

export function publishMessage(systemId, id, MESSAGE) {
  return {
    type: ACTIONS.MESSAGE.NEW,
    from: id,
    systemId,
    MESSAGE
  };
}
