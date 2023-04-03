/*
 *
 */
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.js')
const env = require('./prod.env.js')
// 打包进度显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");//压缩css

const TerserPlugin = require("terser-webpack-plugin");


const dotenv = require('dotenv').config({ path: '.env.production' });
console.log(dotenv);

module.exports = merge(base, {
    mode: env.NODE_ENV,
    devtool: env.devtool,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js', // 此选项决定了每个输出 bundle 的名称
        chunkFilename: 'js/[id].[chunkhash].js', // 此选项决定了非入口(non-entry) chunk 文件的名称
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env.NODE_ENV),
                DOT_ENV: JSON.stringify(dotenv.parsed)
            },
        }),
        new ProgressBarPlugin({
            complete: '█',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,//注释是否抽离
            }),
        ]
    }
})