const mysql = require('mysql');
const db = require('../../../config/db').mysql_local;

const dbConfig = db.database;
console.log(dbConfig);
const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});


let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                    connection.release();
                });
            }
        });
    });
};

// let select = function (table, keys) {
//     let _sql = "SELECT ?? FROM ?? "
//     return query(_sql, [keys, table])
// }

module.exports = {
    query
}