module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'import',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
    'guard-for-in': 0,
    'import/extensions': 0,

    // eslint-plugin-import:
    // https://github.com/import-js/eslint-plugin-import
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 0,
    'import/no-duplicates': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-mutable-exports': 0,
    'import/no-self-import': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          'order': 'asc',
          'caseInsensitive': true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
        ],
      },
    ],
    'import/prefer-default-export': 0,
    // We select line endings depending on current OS.
    // See: https://stackoverflow.com/q/39114446/2771889
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'no-console': 0,
    'no-continue': 0,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    'no-restricted-syntax': 0,
    'no-void': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'react/function-component-definition': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
  },
  settings: {
    'import/resolver': {
      // This is enough to make resolver work properly.
      typescript: {},
    },
  },
};
