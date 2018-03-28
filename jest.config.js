module.exports = {
  collectCoverage: true,
  testPathIgnorePatterns: ['node_modules', 'tmp/'],
  collectCoverageFrom: ['src/**/*.js*', '!src/**/__stubs__/**']
};
