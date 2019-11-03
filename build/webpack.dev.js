const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/main.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    }),
  ],
};