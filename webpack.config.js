const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'handsfree-for-web-modules.js',
    library: 'handsfreeForWebModules',
    libraryTarget: 'umd',
  },
  devtool: 'inline-source-map',
  devServer: {
    https: true,
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
