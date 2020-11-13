module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'none',    // 'none' or 'semi' or 'comma'
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',    // 'semi' or 'comma'
        requireLast: false,
      },
    }]
  }
}
