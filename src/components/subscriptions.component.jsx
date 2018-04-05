import React from 'react';
import PropTypes from 'prop-types';

export function Item(contact, onSubscriptionClick) {
  return (
    <li key={contact.id}>
      <button onClick={() => onSubscriptionClick(contact.id)}>{contact.name}</button>
    </li>
  );
}

export function items(contacts, order, onSubscriptionClick) {
  return order.map(id => Item(contacts[id], onSubscriptionClick));
}

export default function Subscriptions({ contacts, order, onSubscriptionClick }) {
  return (
    <div>
      subscription list goes here
      <ul>
        { items(contacts, order, onSubscriptionClick) }
      </ul>
    </div>
  );
}

Subscriptions.propTypes = {
  order: PropTypes.array.isRequired,
  contacts: PropTypes.object.isRequired,
  onSubscriptionClick: PropTypes.func.isRequired
};
