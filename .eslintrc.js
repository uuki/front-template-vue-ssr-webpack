module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'semi': 'off',
    'no-unused-vars': 'off',
    'no-useless-return': 'off',
    'keyword-spacing': 'off',
    'space-before-function-paren': 'off',
    'no-trailing-spaces': 'off',
    'spaced-comment': 'off',
    'space-in-parens': 'off',
    'indent': 'off',
    'eqeqeq': 'off',
    'template-curly-spacing': 'off',
    'padded-blocks': 'off'
  }
}
