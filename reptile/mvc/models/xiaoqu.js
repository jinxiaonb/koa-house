
/**
 * 数据库执行语句，以及调用执行
*/

// const xiaoquTest = {
//     getRemoteXiaoQuByCity: function () {
//         console.log({ test: "1" });
//     }
// };

/**
 * 小区数据结构
 */

class XiaoQu {

    /**
     * {
            "code": "1811054186107",
            "title": "湖畔花园春晓苑",
            "href": "https://hz.ke.com/xiaoqu/1811054186107/",
            "district": "西湖",
            "bizcircle": "文一西路小区",
            "pic": "https://ke-image.ljcdn.com/hdic-resblock/06e501dc-c806-46a8-8e6b-5392468ad18d.JPG.232x174.jpg",

            "totalSellHref": "https://hz.ke.com/ershoufang/c1811054186107/",
            "esfcode": "c1811054186107",
            "totalSellCount": "3"
        },
    */
    constructor(options) {
        this.id = options.id;
        this.code = options.code;
        this.name = options.name;
        this.pic_detail = options.pic_detail;
        this.pic_path = options.pic_path;
        this.district_name = options.district_name;
        this.street_name = options.street_name;
        this.erf_code = options.erf_code;
        this.add_time = options.add_time;
        this.update_time = options.update_time;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}



module.exports = XiaoQu;