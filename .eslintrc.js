module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
    'jest-extended',
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb-typescript/base',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': ['warn', { allow: ['error', 'debug'] }],
    '@typescript-eslint/lines-between-class-members': [
      'warn',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
  },
  overrides: [
    {
      files: ['.bin/**/*', '**/*.spec.{js,ts}', 'config/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.spec.{js,ts}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'warn',
      },
    },
  ],
};
