/* global jest */

export const makeAsyncJob = jest.fn(() => function run() {
  return new Promise(() => {});
});
export const createJob = jest.fn();
export const chunk = jest.fn();
