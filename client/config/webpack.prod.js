/*
 *
 */
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.js')
// 打包进度显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 该插件已被output的clean属性取代


const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");//压缩css

const TerserPlugin = require("terser-webpack-plugin");

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const env = require('./prod.env.js')
const dotenv = require('dotenv').config({ path: '.env.production' });
// console.log(dotenv);

module.exports = merge(base, {
    mode: env.NODE_ENV,
    devtool: env.devtool,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js', // 此选项决定了每个输出 bundle 的名称
        chunkFilename: 'js/[id].[chunkhash].js', // 此选项决定了非入口(non-entry) chunk 文件的名称
        clean: true,//清楚目录
    },

    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new webpack.DefinePlugin({// 定义全局变量
            'process.env': {
                PRO_ENV: JSON.stringify(env),
                DOT_ENV: JSON.stringify(dotenv.parsed)
            },
        }),
        new ProgressBarPlugin({// 控制台进度条
            complete: '█',
        }),
        new MiniCssExtractPlugin({// 抽离css文件
            filename: 'css/[name].[contenthash].css',
        }),
        new FriendlyErrorsWebpackPlugin({
            // 成功的时候输出
            compilationSuccessInfo: {
                messages: [`已经打包成功啦~`]
            },
            // 是否每次都清空控制台
            clearConsole: true
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/,
                parallel: true
            }),// 压缩css
            new TerserPlugin({// 压缩js
                parallel: true,//多进程
                extractComments: false,//注释是否抽离
                terserOptions: {
                    compress: {
                        //去除console
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
        ]
    }
})