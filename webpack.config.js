/* global __dirname, require, module */
/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const { env } = require('yargs').argv; // use --env with webpack 2
const LIBRARY_NAME = 'icon-sdk-js';
const MODE = {
  PROD: 'production',
  DEV: 'development'
};
const TARGET = {
  WEB: 'web',
  NODE: 'node'
};

const mode = env === 'build' ? MODE.PROD : MODE.DEV;

const setLibraryName = (libraryName, target, mode) =>
  `${libraryName}.${target}.${mode === MODE.PROD ? 'min.js' : 'js'}`;

const setPlugin = target =>
  target === 'web'
    ? [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
        new webpack.NormalModuleReplacementPlugin(
          /(.*)\/module\/node$/,
          function(resource) {
            resource.request = resource.request.replace(/node/, `browser`);
          }
        )
      ]
    : [];

const config = target => ({
  mode,
  entry: `${__dirname}/lib/index.ts`,
  devtool: 'inline-source-map',
  target,
  output: {
    path: `${__dirname}/build`,
    filename: setLibraryName(LIBRARY_NAME, target, mode),
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    /*
      Resolve global, window no-def issue.
    */
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.(t|j)s$/,
        exclude: /(node_modules|bower_components|quickstart)/,
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.json', '.js', '.ts'],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("readable-stream")
    }
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       uglifyOptions: {
  //         mangle: true,
  //         compress: true
  //       }
  //     })
  //   ]
  // },
  plugins: setPlugin(target)
});

module.exports = [config(TARGET.WEB), config(TARGET.NODE)];
