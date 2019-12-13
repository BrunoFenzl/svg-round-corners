const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './lib',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'svg-round-corners.js',
    library: 'svgRoundCorners',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    libraryTarget: 'umd',
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
};