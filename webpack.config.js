const path = require('path');

module.exports = {
  entry: './lib/main.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'jquery_lite.js'
  },
  devtool: 'source-map'
};
