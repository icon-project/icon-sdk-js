/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

const htmlPlugins = generateHtmlPlugins('../example/html');

module.exports = {

	context: path.join(process.cwd(), './'),
	devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools

	entry: {
		app: ['./index.js'],
	},

	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		sourceMapFilename: '[name].map',
	},

	resolve: {
		extensions: ['.js', 'ts'],
		modules: [path.join(process.cwd(), './'), 'node_modules'], // directories where to look for modules
	},

	module: {
		rules: [{
      test: /\.(t|j)s$/,
			exclude: /node_modules/,
      loader: 'ts-loader',
		}],
	},
	plugins: [
		new CleanWebpackPlugin.CleanWebpackPlugin(),
	].concat(htmlPlugins),

	optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendor'
                }
            }
        }
    },
};
