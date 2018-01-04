require('babel-polyfill');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseConfig = require('./webpack.base.config');

process.env.NODE_ENV = 'development'

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
};

const config = merge(baseConfig, {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/app-client.js')],
  },
  output: {
    filename: '[name].[hash].js',
    // quiet: true
  },
  resolve: {
    alias: Object.assign({}, baseConfig.resolve.alias, {
      'create-api': path.resolve(__dirname, '../src/api/create-api-client.js')
    })
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader']
        }),
        //use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: 'import-glob-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  resolve('src/assets/scss'),
                  resolve('node_modules'),
                ]
              },
            }
          ]
        }),
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 6002,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: path.join('..', 'index.html'),
      template: path.join('src', 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: resolve('server/index.template.html'),
      template: path.join('src', 'index.html'),
      inject: false,
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
        'VUE_ENV': '"client"',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('src/assets/static'),
        to: resolve('dist/assets'),
      },
    ]),
    new WebpackCleanupPlugin({
      exclude: [
        'vue-ssr-server-bundle.json'
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new VueSSRClientPlugin()
  ],
  // devtool: '#cheap-eval-source-map',
  // devtool: '#source-map',
  devtool: '#inline-source-map',
});

module.exports = config;
