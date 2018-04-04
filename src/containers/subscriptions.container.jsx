import { connect } from 'react-redux';
import SubscriptionsComponent from '../components/subscriptions.component';
import subscriptionClick from '../actions/subscriptions.actions';

// map state to a prop of the component
function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
    order: state.subscriptionsOrder
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {
    onSubscriptionClick: (id) => {
      dispatch(subscriptionClick(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsComponent);
