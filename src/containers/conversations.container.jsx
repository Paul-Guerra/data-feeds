import { connect } from 'react-redux';
import ConversationsComponent from '../components/conversations.component';
import { removeRequest } from '../actions/conversations-list.actions';

// map state to a prop of the component
function mapStateToProps(state) {
  console.log('[ActiveConversations Container] rendering');
  return {
    conversations: state.conversations,
    list: state.conversationsList,
  };
}

// map actions you want a component to dispatch to a prop of the component
function mapDispatchToProps(dispatch) {
  return {
    remove: id => dispatch(removeRequest(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsComponent);
