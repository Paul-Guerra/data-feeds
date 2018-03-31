import { repeat } from '../utils/async-job';
import Publisher from '../publisher';

export default function run(dispatch) {
  let dailyPlanet = new Publisher('Daily Planet', dispatch);
  let dailyBugle = new Publisher('Daily Bugle', dispatch);
  let gothamGazette = new Publisher('Gotham Gazette', dispatch);
  // dailyPlanet.getArchive();
  // repeat(() => dailyPlanet.publish(), Infinity, 1000);
  repeat(() => dailyBugle.publish(), 5, 1000);
  repeat(() => gothamGazette.publish(), 10, 2000);
}
