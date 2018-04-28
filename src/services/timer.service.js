export function dateTime() {
  return new Date();
}

export default function init(onUpdate) {
  onUpdate(dateTime());
  // setTimeout(() => {
  //   onUpdate(dateTime());
  //   init(onUpdate);
  // }, 1000);
}

