import React from 'react';
import Timer from '../containers/timer.container';
import ActiveConversations from '../containers/conversations.container';

export default function () {
  return (
    <div>
      <h3>Welcome to Data Feeds Demo</h3>
      <Timer />
      <ActiveConversations />
    </div>
  );
}
