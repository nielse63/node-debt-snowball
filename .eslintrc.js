module.exports = {
  env: {
    jest: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
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
