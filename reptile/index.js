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
    let reqUrl = "https://hz.ke.com/xiaoqu/pg1/";////'https://hz.ke.com/ershoufang/pg' + page + '/';
    let targetUrl = './reptile/dist/json/xiaoqu_pg' + page + '.json';
    console.log(reqUrl, targetUrl);
    let options = {
        host: "hz.ke.com",
        path: '/ershoufang/pg1/',
        method: 'get',
        headers: { 'Cookie': 'SECKEY_ABVK=PdynKOKf1oH1ZeB88oIIEXkb/Fktle6KdaevLaD/YNo%3D; BMAP_SECKEY=RFP_WdB9CpqeXXixs_Qb9xi6xI9ycowSOUe7xSWWNQAnHEtqZZhGXIn60dHfpJmqVFGaejJ7rEd4XHMmPkSQcBUsYo7SlS-RVSKMJUoltanbqtPgvaYC_WWRZuw8Yw_cTxg_bSytQL44VkQgNB75xdXw11nDDFTii2B7eH8ilCwI1W4RsY13_1rZw5vevizv; lianjia_uuid=f7f55b3a-1682-4308-8ce3-6712369bfed6; Hm_lvt_9152f8221cb6243a53c83b956842be8a=1678711791; digv_extends=%7B%22utmTrackId%22%3A%22%22%7D; ke_uuid=9427e2168f1bed83bb567528d2689cb9; _ga=GA1.2.899138795.1678714833; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22186db051d0a8e0-0dec43dc5e360d-26031951-2073600-186db051d0bf99%22%2C%22%24device_id%22%3A%22186db051d0a8e0-0dec43dc5e360d-26031951-2073600-186db051d0bf99%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22pinzhuan%22%2C%22%24latest_utm_campaign%22%3A%22wyhangzhou%22%2C%22%24latest_utm_content%22%3A%22biaotimiaoshu%22%2C%22%24latest_utm_term%22%3A%22biaoti%22%7D%7D; select_city=330100; lianjia_ssid=2ff38088-2ead-4870-b218-93c183db828f; _gid=GA1.2.2023207119.1679281532; __xsptplus788=788.3.1679281531.1679281531.1%234%7C%7C%7C%7C%7C%23%23nKP7DSbZPOH7cq2m2KGoz0yr4wlV22VA%23; Hm_lpvt_9152f8221cb6243a53c83b956842be8a=1679282886; srcid=eyJ0Ijoie1wiZGF0YVwiOlwiOTY5Y2NlMTUwOTUwNmNkNjgzOGFjYWFkZDZhYTQwNzczYTRkYWFjY2Y0Y2E1MmY3YWM5MjJkMDdlZDBlNDE1ZjRmMzE2MDYxMGM0MDI3NjBlMTJmMTBmZTZlM2VjNzFlNWM0ZWIxZTE1OGQwNTU3ZDA2YTJkZDE1NDllMTFjNGVlNTYxYjQwYTkyMjRjZDQ3YzVkYTRkOWUyYTMwYjRhODgxM2Y0NzRlOGExMDFmMWRhNDRjNmRjZDMxYWMxYWM4ZmExZDVlOWFlNzk5MTRmZjg0ZjEwZmIzNDI1MGEyODk1ZWMwYTQ1NWM0M2VlZmI0NWUyYzE2NDAyNWY2YTg5MVwiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCIzODcxODc1MlwifSIsInIiOiJodHRwczovL2h6LmtlLmNvbS9lcnNob3VmYW5nLyIsIm9zIjoid2ViIiwidiI6IjAuMSJ9' }
    };
    https.get(options, function (res) {
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
            // downloadImage(allFilms)
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
getHZErShouFang(1);
// 