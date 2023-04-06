import axios from 'axios';
import qs from 'qs';

// 默认请求为json
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';

export default function request(options) {
    return new Promise((resolve, reject) => {
        const service = axios.create({
            baseURL: process.env.DOT_ENV.VUE_APP_BASE_URL, // 
            timeout: 10000, // 超时
            withCredentials: true // 是否允许带cookie
        });

        //
        service.interceptors.request.use(
            async (config) => {
                switch (config.method) {
                    case 'get':
                        config.params = config.params;
                        break;
                    case 'post':
                        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                        config.data = qs.stringify(config.data);
                        break;
                    default:
                }
                return config;
            },
            (error) => {
                console.log(error);
                Promise.reject(error);
            }
        );

        service.interceptors.response.use(
            (res) => {
                const handleErrCode = res.data.code;
                // console.log(res.data);
                if (handleErrCode === '1') {
                    resolve(res.data);
                } else {
                    console.log('请求防护错误');
                    reject(res.data);
                }
            },
            (error) => {
                console.log('err' + error);
                let { message } = error;
                if (message == 'Network Error') {
                    message = '网络异常，请检查网络';
                } else if (message.includes('timeout')) {
                    message = '系统接口请求超时，请检查网络';
                } else if (message.includes('Request failed with status code')) {
                    message = '系统接口' + message.substr(message.length - 3) + '异常';
                }

                return reject(error);
            }
        );

        service(options);
    });
}