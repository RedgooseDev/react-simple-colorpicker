const { resolve } = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = (env) => {
	const { ifProd, ifNotProd } = getIfUtils(env);

	return {
		context: resolve(__dirname, 'src'),

		entry: {
			ColorPicker: ifProd(
				[ './ColorPicker/index.js' ],
				[ './example/index.js' ]
			)
		},

		devServer: {
			hot: true,
			contentBase: resolve(__dirname, 'build'),
			publicPath: '/',
			historyApiFallback: true,
			disableHostCheck: true
		},

		output: {
			path: resolve(__dirname, 'build'),
			publicPath: './',
			filename: ifProd('[name].js', '[name].js'),
			chunkFilename: ifProd('[name].js', '[name].js'),
			library: 'ColorPicker',
			libraryTarget: ifProd('umd', 'var'),
		},

		devtool: ifProd('source-map', 'cheap-eval-source-map'),

		module: {
			rules: [
				{
					test: /\.js$/,
					use: [ 'babel-loader' ],
					exclude: /node_modules/
				},
				{
					test: /\.s?css$/,
					use: ifProd(
						ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								'css-loader',
								{
									loader: 'postcss-loader',
									options: { plugins: () => [ require('autoprefixer') ] }
								},
								'sass-loader'
							]
						}),
						[
							'style-loader',
							'css-loader',
							{
								loader: 'postcss-loader',
								options: { plugins: () => [ require('autoprefixer') ] }
							},
							'sass-loader'
						]
					)
				},
			]
		},

		plugins: removeEmpty([
			ifProd(
				new webpack.optimize.CommonsChunkPlugin({
					name: 'ColorPicker.vendor',
					minChunks: function (module) {
						return (
							module.context && module.context.indexOf('node_modules') !== -1
						);
					}
				})
			),
			ifNotProd(
				new HtmlWebpackPlugin({ template: 'example/index.html' })
			),
			ifProd(
				new ExtractTextPlugin({ filename: '[name].css' })
			),
			ifNotProd(
				new webpack.HotModuleReplacementPlugin()
			),
			ifNotProd(
				new webpack.NamedModulesPlugin()
			),
		])
	};
};


module.exports = config;