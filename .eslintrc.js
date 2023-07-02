// .eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
      es6: true, // Add ES6 environment

    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
    plugins: ['react', 'react-native'],
    rules: {
      'react-native/no-unused-styles': 'error',
    },
    "parserOptions": {
      "sourceType": "module"
    }
  };
