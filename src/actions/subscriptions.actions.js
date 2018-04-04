import ACTIONS from './action.types';

export default function subscriptionClick(id) {
  return {
    type: ACTIONS.PUBLISHER.SUBSCRIPTION.CLICK,
    id
  };
}
