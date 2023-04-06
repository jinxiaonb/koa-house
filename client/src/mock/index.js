

// const Test = require('./test.js');

// const obj = {
//     ...Test
// };

// console.log(obj);
// module.exports = function (middlewares, devServer) {
//     Object.keys(obj).forEach((v) => {
//         // console.log(v);
//         // obj[v](devServer);
//     });

//     return middlewares;
// }

const Mock = require('better-mock');

module.exports = function (middlewares, devServer) {
    if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
    }

    devServer.app.get('/mock/test', (_, res) => {
        // res.send({
        //     code: '1',
        //     msg: 'mock 成功'
        // });
        res['json'](Mock.mock(require('../json/userInfo.json')));
    });

    return middlewares;
}