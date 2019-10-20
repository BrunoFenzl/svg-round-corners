const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'svg-round-corners.js',
    library: 'svgRoundCorners',
    libraryTarget: 'umd',
  }
}