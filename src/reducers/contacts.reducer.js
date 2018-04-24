import ACTIONS from '../actions/action.types';

const INITIAL_STATE = {};

export function newContactStateObject(action) {
  let contactState = {};
  contactState[action.id] = {
    id: action.id,
    name: action.name,
    conversations: new Set()
  };
  return contactState;
}

export function updateContactConvos(newConvoAction, stateContacts) {
  let updatedContacts = {};
  newConvoAction.contacts.forEach((id) => {
    let contact = {};
    if (stateContacts[id]) {
      contact[id] = stateContacts[id];
    } else {
      contact = newContactStateObject({ id });
    }
    Object.assign(updatedContacts, contact);
    updatedContacts[id].conversations.add(newConvoAction.id);
  });
  return updatedContacts;
}

export default (state = INITIAL_STATE, action) => {
  let newState;
  let updatedContacts;
  let data = {};
  switch (action.type) {
    case ACTIONS.CONTACT.NEW:
    case ACTIONS.CONTACT.SUBSCRIBED:
      data = newContactStateObject(action);
      newState = Object.assign({}, state, data);
      break;
    case ACTIONS.CONVERSATION.NEW:
      // todo: create a bulk  new/update contact action and move
      // looping to an async job so the reducer does not loop
      // and makes the update with a single operation
      updatedContacts = updateContactConvos(action, state);
      newState = Object.assign({}, state, updatedContacts);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};
