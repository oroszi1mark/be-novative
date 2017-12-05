'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, config.app.srcPath, 'app.jsx')],
    output: {
        filename: 'bundle-[hash].js',
        path: path.join(__dirname, config.app.distPath)
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, config.app.distPath, 'index.html'),
            template: path.join(__dirname, config.app.publicPath, 'index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, config.app.distPath),
        historyApiFallback: true,
        inline: true,
        port: config.app.port
    }
};