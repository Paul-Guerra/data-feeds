export function dateTime() {
  return new Date();
}

export default function init(onUpdate) {
  setTimeout(() => {
    onUpdate(dateTime());
    init(onUpdate);
  }, 1000);
}

