const fs = require('fs');
const getFileMap = require('./get-file-map');

/**
 * 获取sql目录下的文件目录数据
 * @return {object}
*/
function getSqlMap() {
    let basePath = __dirname;
    // console.log(basePath);
    basePath = basePath.replace(/\\/g, '\/');
    let pathArr = basePath.split('\/');

    // console.log(basePath);
    pathArr = pathArr.splice(0, pathArr.length - 1);//删除数据最后一个元素
    // console.log(pathArr);
    basePath = pathArr.join('/') + '/mysql/';
    // console.log(basePath);
    let fileList = getFileMap(basePath, 'sql');
    return fileList;
}

module.exports = getSqlMap;
