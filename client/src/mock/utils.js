const Mock = require('better-mock');

module.exports = {
    handleReq: (devServer, config) => {
        const { method, url, json } = config;

        devServer.app[method](url, function (_, res) {
            res.json(Mock.mock(require(json)));
        });
    }
}