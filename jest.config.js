module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: './__tests__/__coverage__',
  modulePathIgnorePatterns: ['lcov-report', 'setup.js', '__mocks__'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
};
