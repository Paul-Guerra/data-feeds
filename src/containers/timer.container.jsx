import { connect } from 'react-redux';
import TimerComponent from '../components/timer.component';

// map state to a prop of the component
function mapStateToProps(state) {
  return {
    time: state.timer.time
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
