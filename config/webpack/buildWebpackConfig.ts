import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildPlugins } from './plugins';
import { buildLoaders } from './loaders';
import { buildResolvers } from './resolvers';
import { buildDevServer } from './devServer';

export function buildWebpackConfig(
  options: BuildOptions,
): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    target: 'browserslist',
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.dist,
      publicPath: '/',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
