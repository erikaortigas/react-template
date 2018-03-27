const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack/config')

const resolve = {
  modules: ['node_modules'],
  extensions: ['.js', '.jsx', '.json', '.less', '.css']
}

const mode = process.env.NODE_ENV

const entryFile = path.resolve(__dirname, `./src/entry/${mode}.jsx`)

const entry = mode === 'development' ? [
  'react-hot-loader/patch',
  entryFile
] : entryFile

const rules = [
  {
    enforce: 'pre',
    test: /.js/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {fix: true}
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.less$/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'less-loader'
    }]
  },
  {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }
]

const devtool = 'cheap-module-eval-source-map'

const output = {
  filename: 'bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'dist')
}

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.HotModuleReplacementPlugin({quiet: true}),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin(config),
  new CopyWebpackPlugin([{
    from: `src/static/${mode}-webpack.html`, to: 'index.html'
  }])
]

const devServer = {
  hot: true,
  port: 8080,
  compress: true
}

module.exports = {
  mode,
  entry,
  module: {rules},
  resolve,
  devtool,
  output,
  plugins,
  devServer
}
