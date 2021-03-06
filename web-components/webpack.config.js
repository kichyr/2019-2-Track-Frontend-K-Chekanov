'use strict'

const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const CSSSpriteLoader = require('css-sprite-loader').Plugin

const SRC_PATH = path.resolve(__dirname, 'src')
const IMG_PATH = path.resolve(__dirname, 'src/components/images')
const BUILD_PATH = path.resolve(__dirname, 'build')

module.exports = {
  context: SRC_PATH,
  entry: {
    index: './index.js',
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', 'css-sprite-loader'] }],
  },
  plugins: [new CSSSpritePlugin()],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /shadow\.css$/,
        include: SRC_PATH,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /index\.css$/,
        include: SRC_PATH,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([{ from: 'images', to: 'images', toType: 'dir' }]),
    new MiniCSSExtractPlugin({
      filename: 'style.css',
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  node: {
    fs: 'empty',
  },
}
