const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const addressInfo = require('./address-info');
// console.log(addressInfo.getUrl(1));
// console.log(addressInfo.getTargetUrl(2, 'json'));//
// console.log(addressInfo.getDownloadUrl('json'));

const getData = {
    /**
     * 请求资源的路径
     * @param { number } pageTotal 总页数
     * */
    getDataByType(pageTotal) {
        let options = addressInfo.getUrl();
        for (let i = 1; i <= pageTotal; i++) {
            // let reqUrl = baseUrl + i + '/';
            // let _cur = Object.create({});
            let _cur = Object.assign({}, options);//浅拷贝，对象里面的对象引用或者修改会同时起作用，此处应该用递归进行深拷贝，因cookie存储在header中没有进行修改，故用浅拷贝代替。
            _cur['path'] = _cur.path + i + '/';
            // _cur['headers'] = { Cookie: i };
            // _cur.headers.Cookie = i;
            // console.log(_cur);
            // console.log(options);
            this.getJson(_cur, i);
        }
    },

    async getJson(options, i) {
        // console.log(i, reqUrl);
        // console.log(addressInfo.getTargetUrl(i, 'json'))
        let targetUrl = addressInfo.getTargetUrl(i, 'json');
        await this.getData(options, targetUrl);

    },
    getImages() {

    },
    getAudios() {

    },
    getVideo() {

    },
    getData(options, targetUrl) {
        // console.log(options, targetUrl);

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
    },
};

module.exports = getData;