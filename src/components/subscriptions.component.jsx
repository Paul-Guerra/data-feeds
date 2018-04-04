import React from 'react';
import PropTypes from 'prop-types';

export function Item(subscription, onSubscriptionClick) {
  return (
    <li key={subscription.id}>
      <button onClick={() => onSubscriptionClick(subscription.id)}>{subscription.name}</button>
    </li>
  );
}

export function items(subscriptions, order, onSubscriptionClick) {
  return order.map(id => Item(subscriptions[id], onSubscriptionClick));
}

export default function Subscriptions({ subscriptions, order, onSubscriptionClick }) {
  return (
    <div>
      subscription list goes here
      <ul>
        { items(subscriptions, order, onSubscriptionClick) }
      </ul>
    </div>
  );
}

Subscriptions.propTypes = {
  order: PropTypes.array.isRequired,
  subscriptions: PropTypes.object.isRequired,
  onSubscriptionClick: PropTypes.func.isRequired
};
