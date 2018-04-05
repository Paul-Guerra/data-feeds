import { connect } from 'react-redux';
import SubscriptionsComponent from '../components/subscriptions.component';
import { click } from '../actions/contact.actions';

// map state to a prop of the component
function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    order: state.subscriptionsOrder
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {
    onSubscriptionClick: (id) => {
      dispatch(click(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsComponent);
