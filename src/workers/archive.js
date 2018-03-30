
let bigResults = [];
let smallResults = [];

export function doTask(results) {
  results.push(Date.now());
  return results;
}

export function isEnough(enough, results) {
  return results.length >= enough;
}