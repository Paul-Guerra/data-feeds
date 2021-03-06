import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from '../components/home.component';
import TimerPage from './timer-page.component';
import SubscriptionsPage from './subscriptions-page.component';
import ConversationsPage from './conversations-page.component';

export default class App extends React.Component {
  componentDidMount() {
    this.props.onAppReady();
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/timer">Timer</Link></li>
            <li><Link to="/subscriptions">Subscriptions</Link></li>
            <li><Link to="/conversations">Conversations</Link></li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/timer" component={TimerPage} />
          <Route path="/subscriptions" component={SubscriptionsPage} />
          <Route path="/conversations" component={ConversationsPage} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onAppReady: PropTypes.func.isRequired
};

// routing based on https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/quick-start.md
