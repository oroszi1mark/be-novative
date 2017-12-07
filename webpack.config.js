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
        alias: {
            components: path.join(__dirname, 'app/components/'),
            services: path.join(__dirname, 'app/services/')
        },
        extensions: ['.js', '.jsx', '.svc.js']
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, config.app.distPath),
        historyApiFallback: true,
        inline: true,
        port: config.app.port,
        proxy: [{
            //context: '/benovative/**',
            //target: 'http://localhost:3001'
            context: `/${config.api.basePath}/**`,
            target: `${config.api.protocol}://${config.api.host}:${config.api.port}`
        }]
    }
};