
const cheerio = require('cheerio');

const cheerioHtml = {
    xiaoqu: function (_html) {

    },
    ershoufang: function (_html) {
        const $ = cheerio.load(_html);
        // console.log($);
        // console.log($("ol.grid_view"));
        let _array = [];
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

            _array.push({
                title, href, star, pic
            });
        });
        return _array;
    }
};


module.exports = cheerioHtml;