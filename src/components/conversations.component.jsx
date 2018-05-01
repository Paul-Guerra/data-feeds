import React from 'react';
import PropTypes from 'prop-types';

export function conversationsList(conversations, list, remove) {
  return list.map(index => (
    <li key={conversations[index].id}>
      <div>
        {conversations[index].name}
        <button
          onClick={() => remove(conversations[index].id)}
        >
          &times;
        </button>
      </div>
    </li>
  ));
}

export default function ActiveConversations({ conversations, list, remove }) {
  // console.log('[ActiveConversations] rendering');
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
  conversations: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};
