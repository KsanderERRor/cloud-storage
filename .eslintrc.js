module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  plugins: ['jest'],
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended', 'plugin:jest/style'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },

  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
};
