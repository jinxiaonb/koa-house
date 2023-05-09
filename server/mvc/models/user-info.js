const userDao = require('./../dao/user-info.js');

const user = {
    /**
     * 
    */
    async getUserInfoByUserName(userName) {
        let result = await userDao.select(
            'user_info', ['id', 'name']
        );
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    }
}

module.exports = user;