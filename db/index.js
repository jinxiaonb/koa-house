const getSqlContentMap = require('./util/get-sql-content-map');
const { query } = require('./execute/mysql');

/**
 * 执行本地的sql文件
*/

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap();
// console.log(sqlContentMap);


// 打印脚本执行日志
const eventLog = function (err, sqlFile, index) {
    if (err) {
        console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`);
    } else {
        console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`);
    }
}


// 执行建表sql脚本
const createAllTables = async () => {
    for (let key in sqlContentMap) {
        let sqlShell = sqlContentMap[key];
        let sqlShellList = sqlShell.split(';');

        // console.log(sqlShellList);
        // console.log(sqlShellList.entries());
        for (let [i, shell] of sqlShellList.entries()) {
            // console.log(shell.trim());
            if (shell.trim()) {
                let result = await query(shell);
                // console.log(result);
                if (result.serverStatus * 1 === 2) {
                    eventLog(null, key, i);
                } else {
                    eventLog(true, key, i);
                }
            }
        }
    }
    console.log('sql脚本执行结束！');
    console.log('请按 ctrl + c 键退出！');

}

createAllTables();