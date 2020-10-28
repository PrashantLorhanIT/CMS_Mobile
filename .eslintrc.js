module.exports = {
  root: true,
  extends: '@react-native-community',

  pasrser: 'babel-eslint',
  parserOptions:{
    ecmaVersion:9,
    ecmaFeatures:{
      jsx:true,
    },
    sourceType: 'module',
  },
  plugins: ['detox', 'jest'],
  env:{
    'detox/detox': true,
    'jest/gobals': true,
  },
};
