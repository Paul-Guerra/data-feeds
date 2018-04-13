/* global describe, it, expect */

import bringToTop from '../top.sorter';

describe('bringToTop', () => {
  it('puts ids in set in the beginning of the array', () => {
    let topIds = new Set([7, 6, 5]);
    let list = [0, 1, 2, 3, 4, 5, 6, 7];
    let newList = bringToTop(topIds, list);
    expect(newList).toEqual([5, 6, 7, 0, 1, 2, 3, 4]);
  });
});
