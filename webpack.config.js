const path = require('path');

const markerConfig = {
  entry: './src/marker/js/index.js',

  output: {
    path: path.resolve(__dirname, './dist/marker/js/'),
    filename: 'bundle.js',
    sourceMapFilename: './bundle.js.map'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
};

const middlewareConfig = {
  entry: './src/middleware/js/index.js',

  output: {
    path: path.resolve(__dirname, './dist/middleware/js/'),
    filename: 'bundle.js',
    sourceMapFilename: './bundle.js.map'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
};


module.exports = [markerConfig, middlewareConfig];
