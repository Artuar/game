module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "\\.(css|scss|less)$": "<rootDir>/test/mocks/styleMock.ts"
  },
  "setupFilesAfterEnv": [
    "<rootDir>/test/configure.ts"
  ],
};
