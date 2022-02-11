const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude:path.resolve(__dirname, "node_modules"),
        use: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
  },
};
