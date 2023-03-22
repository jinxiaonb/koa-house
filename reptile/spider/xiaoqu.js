const urlInfo = require('./../utils/url-info');
const getData = require('./get-data');
/**
 * 
*/

module.exports = {
    test(pathType, pageTotal) {
        let options = urlInfo.getUrl(pathType);
        options['pageTotal'] = pageTotal ? pageTotal : 1;
        console.log(options);
        getData.getDataByType(options);
        // return urlInfo.getUrl(pathType);
    },
    getXiaoQuList() {

    }
}