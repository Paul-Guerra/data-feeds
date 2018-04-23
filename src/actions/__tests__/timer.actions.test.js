/* global describe, it, expect */
import update from '../timer.actions';
import ACTIONS from '../action.types';

describe('Timer actions', () => {
  it('dispatches an UPDATE action', () => {
    let data = { is: true };
    let action = update(data);
    expect(action.type).toEqual(ACTIONS.TIMER.UPDATE);
    expect(action.data).toEqual(data);
  });
});
