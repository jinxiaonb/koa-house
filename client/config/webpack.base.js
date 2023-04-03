const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack')

// const dotenv = require('dotenv').config();
// console.log(dotenv);
// const isDev = process.env.NODE_ENV === 'development';

// console.log(path.dirname(__dirname));
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'], // 省略文件后缀
        alias: {
            // 配置别名
            '@': path.resolve(path.dirname(__dirname), 'src'),
        },
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
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
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, '../src')]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),//
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_PROD_DEVTOOLS__: false,//
            __VUE_OPTIONS_API__: false,//
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].[contenthash].css',
        // }),
    ],
};