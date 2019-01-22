/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		publicPath: '/',
		port: 3000,
		contentBase: path.join(process.cwd(), 'dist'),
		host: '0.0.0.0',
		historyApiFallback: true,
		noInfo: false,
		stats: 'minimal',
		hot: true,
	}
});