export default function repeat(f, limit = Infinity, wait = 1000, count = 1) {
  setTimeout(() => {
    if (count > limit) return;
    f();
    repeat(f, limit, wait, count + 1);
  }, wait);
}
