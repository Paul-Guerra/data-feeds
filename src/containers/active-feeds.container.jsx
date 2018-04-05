import { connect } from 'react-redux';
import ActiveFeedsComponent from '../components/active-feeds.component';

// map state to a prop of the component
function mapStateToProps(state) {
  return {};
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFeedsComponent);
