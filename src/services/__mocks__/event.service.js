/* global jest */
let service;

const MockService = jest.fn().mockImplementation(() => ({
  onInit: {
    then: jest.fn().mockReturnThis(),
    catch: jest.fn().mockReturnThis(),
  }, // new Promise((resolve) => { resolve(); }),
  run: jest.fn()
}));

service = MockService();

export default jest.fn(() => {
  if (!service) service = MockService();
  return service;
});
