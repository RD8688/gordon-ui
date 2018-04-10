'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass'
            },
            {
                test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
                exclude: ['node_modules'],
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader',
            },
            {
                test: /\.(woff|woff2)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?prefix=font/&limit=5000',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
            },
            {
                test: /\.gif/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?limit=10000&mimetype=image/gif',
            },
            {
                test: /\.jpg/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?limit=10000&mimetype=image/jpg',
            },
            {
                test: /\.png/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?limit=10000&mimetype=image/png',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    devServer: {
        contentBase: './dist/',
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        disableHostCheck: true,
        proxy: [
            {
                context: [ '/fabuser/**'],
                target: 'https://dev-rajesh.fabhotels.com',
                secure: false,
                changeOrigin: true,
            },
            {
                context: ['/fabcorporateaggregation/**'],
                target: 'http://localhost:8060',
                secure: false,
                changeOrigin: true,
            },
        ],
    }
};
