import { connect } from 'react-redux';
import FetchComponent from '../components/fetch.component';
import { click as buttonClick } from '../actions/fetch.actions';

// map state to a prop of the component
function mapStateToProps(state) {
  let { status, results } = state.fetch;
  return {
    status,
    results
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {
    onFetchClick: (url) => {
      dispatch(buttonClick(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchComponent);
