const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


let resolve = dir => path.join(__dirname , 'src/resources/', dir)

let resources = (folder , rac='dist') =>  path.join(__dirname , rac+'/resources/'+folder) 

module.exports = {

	entry: {
	    sinup : resolve('./script/pages/sinup'),
	    login : resolve('./script/pages/login'),
	    contacts : resolve('./script/pages/contacts'),
	    admin : resolve('./script/pages/admin'),
	    index : resolve('./script/pages/index'),
	    forgot : resolve('./script/pages/forgot'),
	},

	mode: 'development' ,  

	output: {
	    path: path.join(__dirname , 'dist/resources/', 'asset'),
	    publicPath: '/',
	    filename: 'js/[name].js'
	},

	resolve: {
	    
	    extensions: ['.ts','.tsx','.js'] ,

	},

	module: {
		rules : [
			/*
			{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: ['/node_modules/'],
		    },
			*/

		    {
		        test: /\.tsx?$/,
		        loader: 'ts-loader',
		        exclude: ['/node_modules/'],
		    },

		    {
		        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          	limit: 10000,
		          	name: 'img/[name].[hash:7].[ext]'
		        }
		    },

		    {
		        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          	limit: 10000,
		          	name: 'media/[name].[hash:7].[ext]'
		        }
		    },

		    {
		        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          	limit: 10000,
		          	name: 'fonts/[name].[hash:7].[ext]'
		        }
		    }

		]
	},

	plugins: [

		new CopyWebpackPlugin([
			{ 
				from: resources('asset','src') , 
				to: resources('asset')  
			},
			{ 
				from: resources('lang','src') , 
				to: resources('lang')
			},
			{ 
				from: resources('views','src') , 
				to: resources('views')
			}
		]),

		new webpack.NoEmitOnErrorsPlugin(),
		
		new webpack.DefinePlugin({
	      	'process.env.NODE_ENV': '"development"'
	    }),

	    new FriendlyErrorsPlugin()

	],

	devtool: '#cheap-module-eval-source-map',

	watch: true,

	performance: { hints: false },

	//npm install webpack 

}
