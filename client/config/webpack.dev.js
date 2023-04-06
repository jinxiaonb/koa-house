/**
 * 
*/

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const base = require('./webpack.base.js');
const env = require('./dev.env.js');

const dotenv = require('dotenv').config({ path: '.env.development' });// 读取根目录下的.env.development文件
// console.log(process.env);
console.log(dotenv.parsed.VUE_APP_BASE_URL);

// console.log(path.join(__dirname, '../dist'));

module.exports = merge(base, {
    mode: env.NODE_ENV,
    // stats: env.stats, // 去除控制台webpack打印的无用信息
    devtool: env.devtool,
    devServer: {// 
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        // client: {
        //     progress: false, // 在浏览器端打印编译速度
        // },
        port: 9090,
        hot: true,
        compress: true, // 开启gzip压缩
        open: true,
        // proxy: {
        //     '/api': {
        //         secure: false,//忽略HTTPS报错
        //         changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        //         target: dotenv.parsed.VUE_APP_BASE_URL,
        //         pathRewrite: { '^/api': '' }
        //     }
        // }
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    'style-loader',//MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                DEV_ENV: JSON.stringify(env),//局部env
                DOT_ENV: JSON.stringify(dotenv.parsed),//全局env
            },
        }),
        new BundleAnalyzerPlugin(),//生成的文件分析大小，用于优化
    ],
})