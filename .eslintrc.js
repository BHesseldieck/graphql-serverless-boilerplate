module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'import/prefer-default-export': 0,
    'max-len': 1,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-param-reassign': 1,
    'no-restricted-globals': 1,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
  },
};
