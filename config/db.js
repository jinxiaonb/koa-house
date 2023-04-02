
/**
 * 数据库服务器地址，账号，密码
 * 
*/
const db = {
    /**
     * 
    */
    mysql_local: {
        port: 3001,
        database: {
            DATABASE: 'hz_house',
            USERNAME: 'root',
            PASSWORD: 'jx@123qwe',
            PORT: '3306',
            HOST: 'localhost',
            connectionLimit: 10,
            acquireTimeout: 5000
        }
    },
    /**
     * 
    */
    mysql_centos: {

    }
}

module.exports = db;