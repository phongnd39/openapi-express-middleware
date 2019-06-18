module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    expect: 'writable'
  }
}
