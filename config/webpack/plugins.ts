import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';

import { type BuildOptions } from './types/config';

export function buildPlugins({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HTMLWebpackPlugin({
      template: `${paths.html}/index.html`,
    }),
    // new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [{ from: paths.static, to: paths.dist }],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new Dotenv({
      path: `${paths.env}${isDev ? '.dev' : '.prod'}`,
      systemvars: true,
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    // plugins.push(
    //   new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    //   }),
    // );
  }

  return plugins;
}
