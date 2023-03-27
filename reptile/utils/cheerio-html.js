
const cheerio = require('cheerio');
const pathParse = require('./path-parse');

const cheerioHtml = {
    xiaoqu: function (_html) {
        const $ = cheerio.load(_html);
        // console.log($);
        // console.log($("ol.grid_view"));
        let _array = [];
        $('ul.listContent li.xiaoquListItem').each(function () {

            const pic = $('.img img.lj-lazy', this).attr('data-original').trim();// 图片

            const title = $('.info .title a.maidian-detail', this).text().trim();// 小区名称
            const href = $('.info .title a.maidian-detail', this).attr("href").trim();// 链接地址
            const district = $('.info .positionInfo a.district', this).text().trim();// 区县
            const bizcircle = $('.info .positionInfo a.bizcircle', this).attr('title');// 所属板块
            const code = pathParse.getFileNameByXiaoQu(href);//小区编码

            const totalSellHref = $('.xiaoquListItemRight .xiaoquListItemSellCount a.totalSellCount', this).attr('href');
            const esfcode = pathParse.getFileNameByXiaoQu(totalSellHref);//小区二手房编码
            const totalSellCount = $('.xiaoquListItemRight .xiaoquListItemSellCount a.totalSellCount span', this).text();

            // console.log(totalSellCount);

            _array.push({
                title, href, district, bizcircle, pic, code, totalSellHref, esfcode, totalSellCount
            });
        });
        return _array;
    },
    ershoufang: function (_html) {
        const $ = cheerio.load(_html);
        // console.log($);
        let _array = [];
        $('ul.sellListContent li.clear').each(function () {

            const title = $('.info .title a', this).text().trim();
            const href = $('.info .title a', this).attr("href").trim();
            const star = $('.address .flood .positionInfo a', this).text().trim();


            const pic = $('.img img.lj-lazy', this).attr('data-original').trim();

            const name = pathParse.getFileName(href);
            // console.log(pic);
            // console.log(title,star,pic);
            // 存 数据库
            // 没有数据库存成一个json文件 fs

            _array.push({
                title, href, star, pic, name
            });
        });
        return _array;
    }
};


module.exports = cheerioHtml;