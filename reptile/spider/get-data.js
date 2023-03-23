const https = require('https');
const fs = require('fs');

const urlInfo = require('./../utils/url-info');
const request = require('./../utils/request');
const cheerioHtml = require('./../utils/cheerio-html');
const downLoad = require('./../utils/down-load');

const getData = {
    /**
     * 请求资源的路径
     * @param { number } pageTotal 总页数
     * */
    getDataByType(pageTotal, pathType) {
        let options = urlInfo.getUrl(pathType);

        for (let i = 1; i <= pageTotal; i++) {
            let _cur = Object.assign({}, options);//浅拷贝，对象里面的对象引用或者修改会同时起作用，此处应该用递归进行深拷贝，因cookie存储在header中没有进行修改，故用浅拷贝代替。
            _cur['path'] = _cur.path + i + '/';

            let _target = urlInfo.getTargetUrl(i, pathType, 'json'); //
            let _targetDown = urlInfo.getDownloadUrl('images');//根据不同文件类型得到不同文件路径

            request.get(_cur).then(_html => {
                // console.log(_html);
                const _array = cheerioHtml.ershoufang(_html);
                downLoad.writeData(_array, _target);//写入文件到本地硬盘
                downLoad.images(_array, _targetDown)
            });
        }
    },
    
    downloadImage(_array) {
        for (let i = 0; i < _array.length; i++) {
            const picUrl = _array[i].pic;
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
    },

    getJson(options, i) {
        // console.log(i, reqUrl);
        // console.log(urlInfo.getTargetUrl(i, 'json'))
        let targetUrl = '';//urlInfo.getTargetUrl(i, 'json');
        this.getData(options, targetUrl);

    },
    getImages() {

    },
    getAudios() {

    },
    getVideo() {

    },
    getData(options, targetUrl) {
        // console.log(options, targetUrl);
        let allFilms = [];
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
                // const $ = cheerio.load(html);

                // $('ul.sellListContent li.clear').each(function () {
                //     // console.log($('.title', this).text());
                //     // console.log($('.pic a', this).attr("href"));
                //     // this 循环时 指向当前这个电影
                //     // 当前这个电影下面的title
                //     // 相当于this.querySelector 
                //     const title = $('.info .title a', this).text().trim();
                //     const href = $('.info .title a', this).attr("href").trim();
                //     const star = $('.address .flood .positionInfo a', this).text().trim();


                //     const pic = $('.img img.lj-lazy', this).attr('data-original').trim();
                //     // console.log(pic);
                //     // console.log(title,star,pic);
                //     // 存 数据库
                //     // 没有数据库存成一个json文件 fs
                //     allFilms.push({
                //         title, href, star, pic
                //     });

                // });
                // console.log(allFilms);
                // downloadImage(allFilms)
                // fs.writeFile(targetUrl, JSON.stringify(allFilms), function (err) {
                //     if (!err) {
                //         console.log('文件写入完毕');
                //     } else {
                //         console.log(err);
                //     }
                // });
            });
        });

        return allFilms;
    },
};

module.exports = getData;