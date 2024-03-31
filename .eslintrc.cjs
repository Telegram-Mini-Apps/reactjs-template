function regexp(regex) {
  return [
    new RegExp(regex.source + '.*[^\\u0000]$').source,
    regex.source,
  ];
}

module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: [
    'simple-import-sort',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': 0,
    // Sometimes this rule decreases readability.
    'arrow-body-style': 0,
    'consistent-return': 0,
    'function-paren-newline': 0,

    // We use special module resolution, that's why we need extensions.
    'import/extensions': 0,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    // It's okay to use cycle imports.
    'import/no-cycle': 0,
    'import/no-duplicates': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-mutable-exports': 0,
    'import/no-self-import': 'error',
    'import/no-unresolved': 0,
    'import/order': 0,

    // We don't use default exports anywhere.
    'import/prefer-default-export': 0,

    // We select line endings depending on current OS.
    // See: https://stackoverflow.com/q/39114446/2771889
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-continue': 0,
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
      maxBOF: 0,
    }],
    'no-nested-ternary': 0,
    // Sometimes we need to write "void promise".
    'no-void': 0,
    'no-duplicate-imports': 'error',
    'object-curly-newline': ['error', { consistent: true }],

    'operator-linebreak': 0,

    // We can implement components the way we want.
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,

    // Simple sort.
    // https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#custom-grouping
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', {
      groups: [
        // Node.js builtins prefixed with `node:`.
        // node:fs
        regexp(/^node:/),

        // Packages.
        // react
        regexp(/^@?\w/),

        // Tsconfig alias.
        // ~/helpers
        regexp(/^~\//),

        // Parent imports.
        // ../Typography.js
        regexp(/^\.\.\//),

        // Current folder imports.
        // ./utils.js
        regexp(/^\.\/.+\.(?!s?css)/),

        // Styles.
        // ./Typography.css
        [/\.css$/.source],
      ],
    }],
  },
};
