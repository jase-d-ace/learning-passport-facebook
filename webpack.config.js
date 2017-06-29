//dependencies for connfiguring webpack
const path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        }),
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
module.exports = config
