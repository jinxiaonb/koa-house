const fs = require('fs');
const getSqlMap = require('./get-sql-map');

let sqlContentMap = {};

/**
 * 读取sql文件内容
 * @param (string) fileName 文件名词
 * @param (string) path 文件所在的路径
 * @return (string) 脚本文件内容
*/
function getSqlContent(fileName, path) {
    let content = fs.readFileSync(path, 'binary');
    sqlContentMap[fileName] = content;
}


/**
 * 封装所有sql文件的脚本内容
 * @return {object}
*/
function getSqlContentMap() {
    let sqlMap = getSqlMap(); //获取所有sql文件目录列表
    for (let key in sqlMap) {
        getSqlContent(key, sqlMap[key]);
    }

    return sqlContentMap;
}

module.exports = getSqlContentMap;