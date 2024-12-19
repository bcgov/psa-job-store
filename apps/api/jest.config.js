module.exports = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFilesAfterEnv: ['<rootDir>/../test/prisma.mock.ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    // '^.+\\.(t|j)s$': [
    //   'ts-jest',
    //   {
    //     // speeds up tests:
    //     isolatedModules: true, // skip type checking, disables some typescript features, like `const enum`
    //   },
    // ],
  },
};
