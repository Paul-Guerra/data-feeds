import React from 'react';
import PropTypes from 'prop-types';

export function conversationsList(conversations, list) {
  return list.map(index => (
    <li key={conversations[index].id}>
      <button>{conversations[index].name}</button>
    </li>
  ));
}

export default function ActiveConversations({ conversations, list }) {
  return (
    <div>
      active conversation list goes here
      <ul>
        {conversationsList(conversations, list)}
      </ul>
    </div>
  );
}

ActiveConversations.propTypes = {
  list: PropTypes.array.isRequired,
  conversations: PropTypes.object.isRequired,
};
