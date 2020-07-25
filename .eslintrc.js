module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  plugins: ['jest'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
    node: true,
    browser: false,
  },
};
