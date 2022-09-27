const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo-src/main.js',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo-src/index.html'
    })
  ]
};
