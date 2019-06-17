const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const WebpackBar = require('webpackbar')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  devtool: 'cheap-eval-source-map',
  externals: [nodeExternals()],
  plugins: [
    new WebpackBar(),
    new NodemonPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
