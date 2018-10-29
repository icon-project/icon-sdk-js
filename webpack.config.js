/* global __dirname, require, module */

// const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { env } = require('yargs').argv; // use --env with webpack 2
const pkg = require('./package.json');


const libraryName = 'icon-sdk-js';

let outputFile;
let mode;

if (env === 'build') {
	mode = 'production';
	outputFile = `${libraryName}.min.js`;
} else {
	mode = 'development';
	outputFile = `${libraryName}.js`;
}

const config = {
	mode,
	entry: `${__dirname}/index.js`,
	devtool: 'source-map',
	output: {
		path: `${__dirname}/build`,
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: [{
					loader: 'babel-loader?cacheDirectory',
					options: {
						plugins: ['transform-object-rest-spread', '@babel/plugin-transform-runtime'],
					},
				}],
				exclude: /(node_modules|bower_components|quickstart)/,
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: [path.resolve('./node_modules')],
		extensions: ['.json', '.js'],
	},
	optimization: {
		minimizer: [new UglifyJsPlugin({
			cache: true,
			parallel: true,
		})],
	},
};

module.exports = config;
