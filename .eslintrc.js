module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: ['import', 'prettier', 'jest'],
  extends: ['airbnb-typescript/base', 'prettier', 'plugin:jest/recommended'],
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
    'no-console': ['error', { allow: ['error', 'debug'] }],
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
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
    },
  ],
};
