const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './lib',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'svg-round-corners.js',
    library: 'svgRoundCorners',
    globalObject: "typeof self !== 'undefined' ? self : this",
    libraryTarget: 'umd',
    clean: true
  },
  mode: 'production',
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
