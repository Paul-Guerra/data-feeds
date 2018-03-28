import 'babel-polyfill';

import { createStore, applyMiddleware } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import app from './app';
import App from './containers/app.container';
import fetch from './middleware/fetch.middle';
import timer from './middleware/timer.middle';
import event from './middleware/event.middle';

document.addEventListener('DOMContentLoaded', () => {
  let store = createStore(app, applyMiddleware(fetch, timer, event));

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
});
