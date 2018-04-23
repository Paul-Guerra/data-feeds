import ACTIONS from './action.types';

export default function update(data) {
  return {
    type: ACTIONS.TIMER.UPDATE,
    data
  };
}
