const getData = require('./get-data');
/**
 * 
*/

module.exports = {
    test(pageTotal, pathType) {
        getData.getDataByType(pageTotal, pathType);
    },
    getXiaoQuList() {

    }
}