const jestConfig = {
    verbose: true,
    'transform': {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/tests/*.js?(x)'],
    testEnvironment: 'jest-environment-jsdom'
  }
  
module.exports = jestConfig