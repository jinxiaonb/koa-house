const Allconfig = require('./config.js');
const config = Allconfig[Allconfig.current];//获取当前是哪个页面
// console.log(config);

const addressInfo = {
    /**
     * 请求资源的路径
     * @param { number | string } page 第几页
     * */
    getUrl() {
        // let getUrl = config.url + config.path + config.pages;//+ page + '/';// 'https://hz.ke.com/ershoufang/pg' + page + '/';
        let obj = {
            host: config.host,
            path: config.path + config.pages,
            method: 'get',
            headers: config.headers
        };

        return obj;
    },
    /**
     * 生成文件的目录
     * @param { number | string } page 第几页
     * */
    getTargetUrl(page, type) { // './reptile/hzershoufang_pg' + page + '.json';
        let getUrl = config.target_base + type + config.target_file + page + '.' + type;
        return getUrl;
    },
    /**
     * 下载文件的目录
     * @param { number | string } page 第几页
     * */
    getDownloadUrl(type) { //`./reptile/images/${i}.png`
        let getUrl = config.target_base + type + "/";
        return getUrl;
    }
}

module.exports = addressInfo;