import request from '@api/request.js';


export function httpPost(data, url) {
    return request({
        url: url,
        method: 'post',
        data
    });
}

export function httpGet(data, url) {
    return request({
        url: url,
        method: 'get',
        data
    });
}