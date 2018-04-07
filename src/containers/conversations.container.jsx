import { connect } from 'react-redux';
import ConversationsComponent from '../components/conversations.component';

// map state to a prop of the component
function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    list: state.conversationsList,
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsComponent);
