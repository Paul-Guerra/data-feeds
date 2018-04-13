import { makeAsyncBringToTop } from './top.sorter';
import repeat from '../utils/repeat';

let toTop = new Set([4, 5, 6]);
let list = [1, 2, 3, 4, 5, 6];
let btt = makeAsyncBringToTop(toTop, list);
repeat(btt, list.length, 0)
  .then((results) => {
    console.log(results);
  });
