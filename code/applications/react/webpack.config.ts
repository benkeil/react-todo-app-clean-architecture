/* eslint-disable import/no-extraneous-dependencies */
import * as webpack from 'webpack';
import * as path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import 'webpack-dev-server';
import HtmlWebpackPlugin = require('html-webpack-plugin');

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    uniqueName: 'todoApp',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
    clientLogLevel: 'trace',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          filename: '[name].js',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.STAGE': JSON.stringify('development'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'size-report.html',
      openAnalyzer: false,
      generateStatsFile: false,
    }),
    // Only used to make --watch work
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'dev/index.html',
      title: 'todo-app',
    }),
  ],
};

export default config;
