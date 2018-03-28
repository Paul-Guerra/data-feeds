import { connect } from 'react-redux';
import ready from '../actions/app.actions';
import AppComponent from '../components/app.component';

// map state to a prop of the component
function mapStateToProps() {
  return {};
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {
    onAppReady: () => {
      dispatch(ready());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
