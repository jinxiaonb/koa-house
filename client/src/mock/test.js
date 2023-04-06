const { handleReq } = require('./utils.js');

module.exports = {
    getUser: (devServer) => {
        return handleReq(devServer, {
            url: '',
            method: 'get',
            json: '../json/userInfo.json'
        });
    }
}