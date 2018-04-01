
export function* makeSystemId(id = 0, inc = 1) {
  let nextId = id;
  while (true) {
    yield nextId;
    nextId += inc;
  }
}

// class System {
//   constructor() {
//     this.nextId = makeSystemId();
//     this.prevId = makeSystemId(-1, -1);
//   }
// }

const newId = makeSystemId();
const oldId = makeSystemId(-1, -1);
const sys = {
  nextId: () => newId.next().value,
  prevId: () => oldId.next().value,
};

export default sys;
