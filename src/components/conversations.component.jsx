import React from 'react';
import PropTypes from 'prop-types';

export function conversationsList(conversations, list, remove) {
  return list.map(index => (
    <li key={conversations[index].id}>
      {conversations[index].name}<button onClick={() => remove(conversations[index].id)}>&times;</button>
    </li>
  ));
}

export default function ActiveConversations({ conversations, list, remove }) {
  return (
    <div>
      active conversation list goes here
      <ol>
        {conversationsList(conversations, list, remove)}
      </ol>
    </div>
  );
}

ActiveConversations.propTypes = {
  list: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  conversations: PropTypes.object.isRequired,
};
