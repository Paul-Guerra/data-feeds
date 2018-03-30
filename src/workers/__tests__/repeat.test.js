/* global jest, describe, it, expect */

import repeat from '../repeat';

jest.useFakeTimers();

describe('repeat', () => {
  it('calls function passed to and sets a recursive timer', () => {
    const target = jest.fn();
    repeat(target);

    // At this point in time, there should have been a single call to
    // setTimeout to schedule the end of the game in 1 second.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    jest.runOnlyPendingTimers();

    expect(target).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('accepts custom values for limit', () => {
    const target = jest.fn();
    repeat(target, 0);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    jest.runOnlyPendingTimers();

    expect(target).toHaveBeenCalledTimes(0);
  });

  it('accepts custom values for wait', () => {
    const target = jest.fn();
    repeat(target, 10, 500);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });
});
