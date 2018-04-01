import { repeat } from '../utils/async-job';
import Publisher from '../publisher';
import { subscribed } from '../actions/publisher.actions';


export default function run(dispatch) {
  let dailyPlanet = new Publisher('Daily Planet', dispatch);
  let dailyBugle = new Publisher('Daily Bugle', dispatch);
  let gothamGazette = new Publisher('Gotham Gazette', dispatch);
  dispatch(subscribed(dailyPlanet));
  dispatch(subscribed(dailyBugle));
  dispatch(subscribed(gothamGazette));
  // dailyPlanet.getArchive(5);
  // dailyBugle.getArchive(5);
  // repeat(() => dailyPlanet.publish(), Infinity, 1000);
  repeat(() => dailyBugle.publish(), 5, 100);
  repeat(() => gothamGazette.publish(), 10, 100);
}
