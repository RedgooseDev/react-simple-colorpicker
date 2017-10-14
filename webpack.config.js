const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	context: __dirname,

	entry: {
		'ColorPicker': './src/ColorPicker/index.js'
	},

	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'ColorPicker',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	devtool: false,

	externals: {
		"react": {
			"commonjs": "react",
			"commonjs2": "react",
			"amd": "react",
			"root": "React"
		},
		"react-dom": {
			"commonjs": "react-dom",
			"commonjs2": "react-dom",
			"amd": "react-dom",
			"root": "ReactDOM"
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: { plugins: () => [ require('autoprefixer') ] }
						},
						'sass-loader'
					]
				})
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		// Compress, but don't print warnings to console
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: true}),
		new ExtractTextPlugin({
			filename: '[name].css'
		})
	]

};