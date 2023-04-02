const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';

// console.log(path.dirname(__dirname));
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(path.dirname(__dirname), './src/index.js'),
    output: {
        filename: isDev ? 'main.js' : 'main.[contenthash].js',
        path: path.resolve(path.dirname(__dirname), 'dist'),
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: {
        static: {
            directory: path.join(path.dirname(__dirname), 'dist'),
        },
        port: 9090,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env'],
                //     },
                // },
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(path.dirname(__dirname), './src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
        }),
        new ProgressBarPlugin({
            complete: '█',
        }),
    ],
};