module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/airbnb'],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-syntax': 'off',
    'vue/html-self-closing': 'off',

    'max-len': 'off',

    semi: [
      'error',
      'never'
    ],

    'arrow-parens': [
      'error',
      'as-needed'
    ],

    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true
      }
    ],

    'linebreak-style': 'off',

    'newline-before-return': 'error',

    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],

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

    'global-require': 'off',

    'vue/max-attributes-per-line': 'error',

    'no-plusplus': 'off',

  },

  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/airbnb',
    'plugin:vue/essential'
  ]
}
