
const userInfoService = require('./../services/user-info.js')

module.exports = {
    /**
     * 获取用户信息
    */
    async getUserInfo(userName) {
        let userInfo = await userInfoService.getUserInfoByUserName(userName);
        console.log(userInfo);
    },

    async getLoginUserInfo(ctx) {
        let session = ctx.session;
        let isLogin = session.isLogin;
        let userName = session.userName;

        console.log('session=', session);

        let result = {
            success: false,
            message: '',
            data: null
        };

        if (isLogin === true && userName) {
            let userInfo = await userInfoService.getUserInfoByUserName(userName);

        }

        ctx.body = result;
    }
}