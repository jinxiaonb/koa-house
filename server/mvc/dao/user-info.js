
const dbUtil = require('./dbUtil.js');

let select = function (table, keys) {
    let _sql = "SELECT ?? FROM ?? "
    return dbUtil.query(_sql, [keys, table])
}

module.exports = {
    select
}