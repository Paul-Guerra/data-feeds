import { bringToTop } from './top.sorter';

let toTop = new Set([4, 5, 6]);
let list = [1, 2, 3, 4, 5, 6];
bringToTop(toTop, list).then((...args) => console.log(...args));
