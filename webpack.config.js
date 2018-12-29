const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");




module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	devtool: "inline-source-map",
	output: {
		path: path.join(__dirname, "./compile"),
		publicPath: "/",
		filename: "[name].[hash].bundle.js"
	},
	module: {
		rules: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.scss$/,
			loader: "style-loader!css-loader!sass-loader",
		}, {
			test: /\.less$/,
			use: [
				// MiniCssExtractPlugin.loader,
				"style-loader",
				{
					loader: "css-loader",
					options: {
						modules: true,
						localIndexName:"[name]__[local]___[hash:base64:5]",
					}
				}, {
					loader: "less-loader",
					options: {
						sourceMap: true,
						javascriptEnabled: true,
						modifyVars: {
							"primary-color": "#531dab"
						}
					}
				}
			]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ["env", "react", "es2015", "stage-1", "stage-0"],
				plugins: ["transform-class-properties", "syntax-class-properties", "transform-decorators-legacy"]
			}
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loader: "file-loader",
			options: {
				name: "fonts/[name].[ext]?[hash]"
			}
		},

		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: "file-loader",
			options: {
				name: "img/[name].[ext]"
			}
		}

		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					priority: 10,
					chunks: "initial"
				},
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					minChunks: 2,
					enforce: true
				}
			}
		},

		runtimeChunk: true
	},
	resolve: {
		alias: {
			"@": path.resolve("./src")
		},
		extensions: ["*", ".js", ".jsx", ".css", ".less"],
		modules: ["./node_modules"]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		hot: true,
		port: 9000,
		host: "0.0.0.0",
		historyApiFallback: true,
		proxy: {
			"/agent": {
				target: "http://wap.qs.com",
				host: "wap.qs.com",
				pathRewrite: {}
			},
		}
	},
	plugins: [
		new CleanWebpackPlugin(["compile"]),
		new HtmlWebpackPlugin({
			template: "index.html",
			filename: "index.html"
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
};