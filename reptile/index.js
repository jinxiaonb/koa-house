/**
 * 爬虫程序
*/


const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

function getMovieTop250() {
    https.get('https://movie.douban.com/top250?start=0&filter=', function (res) {
        // 分段返回的 自己拼接
        let html = '';
        // 有数据产生的时候 拼接
        res.on('data', function (chunk) {
            html += chunk;
        })
        // 拼接完成
        res.on('end', function () {
            // console.log(html);
            const $ = cheerio.load(html);
            // console.log($);
            // console.log($("ol.grid_view"));
            let allFilms = [];
            $('ol.grid_view li .item').each(function () {
                // console.log($('.title', this).text());
                // console.log($('.pic a', this).attr("href"));
                // this 循环时 指向当前这个电影
                // 当前这个电影下面的title
                // 相当于this.querySelector 
                const title = $('.title', this).text();
                const star = $('.rating_num', this).text();
                const pic = $('.pic img', this).attr('src');
                // console.log(title,star,pic);
                // 存 数据库
                // 没有数据库存成一个json文件 fs
                allFilms.push({
                    title, star, pic
                });

            });
            fs.writeFile('./server/reptile/top250.json', JSON.stringify(allFilms), function (err) {
                if (!err) {
                    console.log('文件写入完毕');
                } else {
                    console.log(err);
                }
            });
        });
    });
}


function getHZErShouFang(page) {
    let getUrl = 'https://hz.ke.com/ershoufang/pg' + page + '/';
    let targetUrl = './reptile/hzershoufang_pg' + page + '.json';
    console.log(getUrl, targetUrl);
    https.get(getUrl, function (res) {
        // 分段返回的 自己拼接
        let html = '';
        // 有数据产生的时候 拼接
        res.on('data', function (chunk) {
            html += chunk;
        })
        // 拼接完成
        res.on('end', function () {
            // console.log(html);
            const $ = cheerio.load(html);
            // console.log($);
            // console.log($("ol.grid_view"));
            let allFilms = [];
            $('ul.sellListContent li.clear').each(function () {
                // console.log($('.title', this).text());
                // console.log($('.pic a', this).attr("href"));
                // this 循环时 指向当前这个电影
                // 当前这个电影下面的title
                // 相当于this.querySelector 
                const title = $('.info .title a', this).text().trim();
                const href = $('.info .title a', this).attr("href").trim();
                const star = $('.address .flood .positionInfo a', this).text().trim();


                const pic = $('.img img.lj-lazy', this).attr('data-original').trim();
                // console.log(pic);
                // console.log(title,star,pic);
                // 存 数据库
                // 没有数据库存成一个json文件 fs
                allFilms.push({
                    title, href, star, pic
                });

            });
            downloadImage(allFilms)
            fs.writeFile(targetUrl, JSON.stringify(allFilms), function (err) {
                if (!err) {
                    console.log('文件写入完毕');
                } else {
                    console.log(err);
                }
            });
        });
    });
}


function downloadImage(allFilms) {
    for (let i = 0; i < allFilms.length; i++) {
        const picUrl = allFilms[i].pic;
        console.log(i, picUrl);
        // 请求 -> 拿到内容
        // fs.writeFile('./xx.png','内容')
        https.get(picUrl, function (res) {
            res.setEncoding('binary');
            let str = '';
            res.on('data', function (chunk) {
                str += chunk;
            })
            res.on('end', function () {
                fs.writeFile(`./reptile/images/${i}.png`, str, 'binary', function (err) {
                    if (!err) {
                        // console.log(`第${i}张图片下载成功`);
                    } else {
                        console.log(err);
                    }
                })
            })
        })
    }
}

// getMovieTop250();
getHZErShouFang(2);
// 