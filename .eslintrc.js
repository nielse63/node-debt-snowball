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
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-console': ['error', { allow: ['error'] }],
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
