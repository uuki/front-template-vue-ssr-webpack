require('babel-polyfill');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const env = 'production';

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
};

const config = merge(baseConfig, {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/app-client.js')],
  },
  output: {
    filename: '[name].[chunkhash].js',
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
        'NODE_ENV': '"production"',
        'VUE_ENV': '"client"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
    }),
    new VueSSRClientPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('src/assets/static'),
        to: resolve('dist/assets'),
      },
    ])
  ],
  devtool: '#hidden-source-map',
});

module.exports = config;
