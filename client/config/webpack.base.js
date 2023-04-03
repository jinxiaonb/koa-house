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
            '@assets': path.resolve(path.dirname(__dirname), 'src/assets'),// 存放图片、音频、视频
            '@scss': path.resolve(path.dirname(__dirname), 'src/scss'),// 存放scss,css,sass文件
            '@router': path.resolve(path.dirname(__dirname), 'src/router'),// 存放路由文件
            '@store': path.resolve(path.dirname(__dirname), 'src/store'),// 存放vuex文件
            '@views': path.resolve(path.dirname(__dirname), 'src/views'),// 存放html文件
            '@comp': path.resolve(path.dirname(__dirname), 'src/components'),// 存放组件文件
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
                generator:{
                    filename:'imgs/[name]_[hash:8][ext]'
                }
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
            template: path.resolve(__dirname, '../src/views/index.html'),//
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