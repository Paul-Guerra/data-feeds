import ACTIONS from './action.types';

export function archivedHeadline(systemId, id, headline) {
  return {
    type: ACTIONS.PUBLISHER.HEADLINE.ARCHIVE,
    from: id,
    systemId,
    headline
  };
}

export function publishHeadline(systemId, id, headline) {
  return {
    type: ACTIONS.PUBLISHER.HEADLINE.PUBLISH,
    from: id,
    systemId,
    headline
  };
}
