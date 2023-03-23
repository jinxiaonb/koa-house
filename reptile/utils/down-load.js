const https = require('https');
const fs = require('fs');
const downLoad = {
    writeData(_array, _target) {
        fs.writeFile(_target, JSON.stringify(_array), function (err) {
            if (!err) {
                console.log('文件写入完毕');
            } else {
                console.log(err);
            }
        });
    },
    // 下载图片
    images: function (_array, _target) {
        for (let i = 0; i < _array.length; i++) {
            const picUrl = _array[i].pic;
            const path = _target + _array[i].name + '.png';
            // console.log(i, picUrl, path);
            // 请求 -> 拿到内容
            // fs.writeFile('./xx.png','内容')
            https.get(picUrl, function (res) {
                res.setEncoding('binary');
                let str = '';
                res.on('data', function (chunk) {
                    str += chunk;
                })
                res.on('end', function () {
                    fs.writeFile(path, str, 'binary', function (err) {
                        if (!err) {
                            // console.log(`第${i}张图片下载成功`);
                        } else {
                            console.log(err);
                        }
                    })
                });
            });
        }
    }
};


module.exports = downLoad;