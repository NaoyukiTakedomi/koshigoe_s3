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
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    },{
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }]
    },{
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'dist/[hash].[ext]'
      }
    }]
  }
};
