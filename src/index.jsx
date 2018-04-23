import 'babel-polyfill';

import { createStore, applyMiddleware, compose } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import app from './app';
import App from './containers/app.container';
import timer from './middleware/timer.middle';
import event from './middleware/event.middle';
import conversations from './middleware/conversations.middle';
import contacts from './middleware/contacts.middle';
import conversationsList from './middleware/conversations-list.middle';

document.addEventListener('DOMContentLoaded', () => {
  /* eslint no-underscore-dangle: "off" */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    app,
    composeEnhancers(applyMiddleware(timer, event, conversations, contacts, conversationsList))
  );

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
});
