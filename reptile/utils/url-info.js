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
    getUrl(array) {
        // ['xiaoqu'] ['xiaoqu','xihu']
        // let getUrl = config.url + config.path + config.pages;//+ page + '/';// 'https://hz.ke.com/ershoufang/pg' + page + '/';
        // console.log(array);
        let pathType = array[0];
        let pathDistrict = array[1] ? array[1] + '/' : '';
        // console.log(pathDistrict);
        // console.log((config[pathType + '_path'] ? config[pathType + '_path'] : config.path) + pathDistrict + config.pages);
        let obj = {
            host: config.host,
            path: (config[pathType + '_path'] ? config[pathType + '_path'] : config.path) + pathDistrict + config.pages,
            method: 'get',
            headers: config.headers
        };

        return obj;
    },
    /**
     * 生成文件的目录
     * @param { number | string } page 第几页
     * */
    getTargetUrl(page, array, fileType) { // './reptile/hzershoufang_pg' + page + '.json';
        let targetFile = array[0];
        let pathDistrict = array[1] ? array[1] + '/' : '';
        let isDistrict = array[1] ? array[1] + '_' : '';
        let getUrl = config.target_base + config['target_' + fileType] + targetFile + '/' + pathDistrict + config.abbr + '_' + isDistrict + config['target_' + targetFile + '_path'] + page + '.' + fileType;
        // console.log(getUrl);
        return getUrl;
    },
    /**
     * 下载文件的目录
     * @param { number | string } page 第几页
     * */
    getDownloadUrl(array, fileType) { //`./reptile/images/${i}.png`
        let pathType = array[0];
        let pathDistrict = array[1] ? array[1] + '/' : '';
        let getUrl = config.target_base + config['target_' + fileType] + pathType + '/' + pathDistrict;
        return getUrl;
    }
}

module.exports = urlInfo;