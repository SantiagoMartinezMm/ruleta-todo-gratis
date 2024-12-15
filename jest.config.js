module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
