import repeat from '../../utils/repeat';
import Contact from '../../contact';
import makeRandomName from './name-generator';
// import subscribed from '../../actions/contact.actions';

let uniqueNames = new Set();
export default function run(dispatch) {
  let contacts = [];
  for (let i = 0; i < 100; i += 1) {
    let name = makeRandomName();
    while (uniqueNames.has(name)) {
      name = makeRandomName();
    }
    uniqueNames.add(name);
    let contact = new Contact(name, dispatch);
    contacts.push(contact);
    let interval = Math.random() * ((5000 - 500 + 1) + 500);
    repeat(() => contact.publish(), 10, 0);
  }
  // let clarkKent = new Contact('Clark Kent', dispatch);
  // let peterParker = new Contact('Peter Parker', dispatch);
  // let bruceWayne = new Contact('Bruce Wayne', dispatch);
  // dispatch(subscribed(clarkKent));
  // dispatch(subscribed(peterParker));
  // // dispatch(subscribed(bruceWayne));

  // // repeat(() => clarkKent.publish(), 5, 100);
  // // repeat(() => peterParker.publish(), 10, 100);
  // repeat(() => bruceWayne.publish(), 10, 100);
}
