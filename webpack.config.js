const path = require('path');

module.exports = {
  entry: {
    index: './js/index.js',
    promo: './js/promo.js',
    store: './js/store.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
