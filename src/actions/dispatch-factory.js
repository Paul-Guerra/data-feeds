export default function makeDispatcher(dispatch, actionCreator) {
  return (...args) => dispatch(actionCreator(...args));
}
