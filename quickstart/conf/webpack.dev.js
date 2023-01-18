/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge.merge(CommonConfig, {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: true,
		hot: true,
	},
  mode: "development"
});
