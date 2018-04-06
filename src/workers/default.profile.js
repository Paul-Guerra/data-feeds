import repeat from '../utils/repeat';
import Contact from '../contact';
import subscribed from '../actions/contact.actions';


export default function run(dispatch) {
  let clarkKent = new Contact('Clark Kent', dispatch);
  let peterParker = new Contact('Peter Parker', dispatch);
  let bruceWayne = new Contact('Bruce Wayne', dispatch);
  dispatch(subscribed(clarkKent));
  dispatch(subscribed(peterParker));
  // dispatch(subscribed(bruceWayne));

  // repeat(() => clarkKent.publish(), 5, 100);
  // repeat(() => peterParker.publish(), 10, 100);
  repeat(() => bruceWayne.publish(), 10, 100);
}
