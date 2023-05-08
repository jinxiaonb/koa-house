
const userModel = require('./../models/user-info.js')
const user = {

    /**
     * 根据用户名查找用户信息
    */
    async getUserInfoByUserName(userName) {
        let result = await userModel.getUserInfoByUserName(userName);

        return result;
    }
}

module.exports = user;