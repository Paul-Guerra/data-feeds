/* global jest */

const mockFetch = jest.fn(() => ({
  then: jest.fn().mockReturnThis(),
  catch: jest.fn().mockReturnThis()
}));

export default mockFetch;
