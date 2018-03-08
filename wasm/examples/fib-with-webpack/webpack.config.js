const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'index.dist.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    webassemblyModuleFilename: '[modulehash].wasm'
  },
  module: {
    rules: [{
      test: /\.wasm$/,
      // loader: 'wasm-loader'
      type: 'webassembly/experimental'
    }]
  }
};
