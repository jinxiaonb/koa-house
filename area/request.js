const https = require('https');
let request = {
    get: function (url) {
        return new Promise(function (resolve, reject) {

            https.get(url, function (res) {
                // 分段返回的 自己拼接
                let html = '';
                // 有数据产生的时候 拼接
                res.on('data', function (chunk) {
                    html += chunk;
                })
                // 拼接完成
                res.on('end', function () {
                    // console.log(html);
                    resolve(html);
                });
            }).on('error', function (e) {
                reject(e)
                console.log('出错')
            });
        });
    }
}

module.exports = request;