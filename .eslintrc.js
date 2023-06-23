// .eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
    plugins: ['react', 'react-native'],
    rules: {
      'react-native/no-unused-styles': 'error',
    },
  };
