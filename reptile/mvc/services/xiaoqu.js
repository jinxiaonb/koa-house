
const xiaoQuModel = require('../models/xiaoqu');

/**
 * 
*/

const xiaoqu = {
    getRemoteXiaoQuByCity: function () {
        xiaoQuModel.getRemoteXiaoQuByCity();
    }
};


module.exports = xiaoqu;