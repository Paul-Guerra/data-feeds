import ACTIONS from './action.types';

export function archivedHeadline(systemId, id, headline) {
  return {
    type: ACTIONS.HEADLINE.ARCHIVE,
    from: id,
    systemId,
    headline
  };
}

export function publishHeadline(systemId, id, headline) {
  return {
    type: ACTIONS.HEADLINE.NEW,
    from: id,
    systemId,
    headline
  };
}

export function subscribed(publisher) {
  return {
    type: ACTIONS.PUBLISHER.SUBSCRIBED,
    id: publisher.id,
    name: publisher.name
  };
}
