/* global jest */

const returnPromise = () => new Promise(() => {});
export const doAsyncJob = jest.fn(returnPromise);
export const createJob = jest.fn();
export const chunk = jest.fn();
