const router = require('koa-router')();
const xiaoQuController = require('./../mvc/controllers/hz_xiaoqu');

// const routers = router.get('/xiaoqu/getHz.action', xiaoQuController.getRemoteHzXiaoQu);
// xiaoQuController.getRemoteHzXiaoQu


const apiTest = {
    getRemoteHzXiaoQu: function () {
        xiaoQuController.getRemoteHzXiaoQu()
    }
}
// apiTest.getRemoteHzXiaoQu();

module.exports = apiTest;