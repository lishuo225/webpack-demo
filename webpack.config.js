var path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	//context: path.resolve(__dirname, 'src')
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', //将编译后的代码映射回原始源代码,用于定位源文件的错误
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //启用HMR 模块热替换（保存代码，页面自动刷新）
		//new CleanWebpackPlugin(['dist']), //打包前清空dist文件夹
		// new HtmlWebpackPlugin({   //自动生成index.html首页，把已经有的首页替换掉
		// 	title: '自动生成首页',
		// 	inject: false,
		// 	minify: {
		// 		collapseWhitespace: true
		// 	},
		// 	template: 'index.html',
		// 	appMountId: 'root',
		// 	mobile: true
		// }),
		// new ExtractTextPlugin({
		// 	filename: ifProduction('styles/bundle.css?v=[hash]', 'styles/bundle.css'),
  //     		disable: process.env.NODE_ENV === 'development',
  //     		allChunks: true
		// })
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
		    {
			test: /\.js$/,
			  	exclude: path.resolve(__dirname,'node_modules'),
			  	use: {
			  		loader: 'babel-loader'
			  	}
			},
		    {
			test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					"style-loader",
					{
					 loader: 'css-loader'
					}
				]
		    }
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port:8888,
		disableHostCheck: true
	}
};