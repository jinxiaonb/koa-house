const Allconfig = require('../config/index');
const config = Allconfig[Allconfig.current];//获取当前是哪个页面
// console.log(config);

/**
 * 获取配置文件的地址
 * 1、
*/

const urlInfo = {
    /**
     * 请求资源的路径
     * @param { number | string } page 第几页
     * */
    getUrl(pathType) {
        // let getUrl = config.url + config.path + config.pages;//+ page + '/';// 'https://hz.ke.com/ershoufang/pg' + page + '/';
        let obj = {
            host: config.host,
            path: (config[pathType + '_path'] ? config[pathType + '_path'] : config.path) + config.pages,
            method: 'get',
            headers: config.headers
        };

        return obj;
    },
    /**
     * 生成文件的目录
     * @param { number | string } page 第几页
     * */
    getTargetUrl(page, targetFile, fileType) { // './reptile/hzershoufang_pg' + page + '.json';
        let getUrl = config.target_base + config['target_' + fileType] + config.abbr + config['target_' + targetFile + '_path'] + page + '.' + fileType;
        return getUrl;
    },
    /**
     * 下载文件的目录
     * @param { number | string } page 第几页
     * */
    getDownloadUrl(type) { //`./reptile/images/${i}.png`
        let getUrl = config.target_base + config['target_' + type];
        return getUrl;
    }
}

module.exports = urlInfo;