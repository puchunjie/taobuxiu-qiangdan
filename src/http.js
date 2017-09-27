import axios from 'axios'
import Qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://192.168.0.251'; //配置接口地址
// axios.defaults.baseURL = 'http://192.168.0.128:8080'; //配置接口地址
// axios.defaults.baseURL = 'http://192.168.0.138:8080'; //配置接口地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(config => {
    config.data = Qs.stringify(config.data);
    return config;
}, err => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break

            case 401:
                error.message = '未授权，请登录'
                break

            case 403:
                error.message = '拒绝访问'
                break

            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break

            case 408:
                error.message = '请求超时'
                break

            case 500:
                error.message = '服务器内部错误'
                break

            case 501:
                error.message = '服务未实现'
                break

            case 502:
                error.message = '网关错误'
                break

            case 503:
                error.message = '服务不可用'
                break

            case 504:
                error.message = '网关超时'
                break

            case 505:
                error.message = 'HTTP版本不受支持'
                break
            default:
                error.message = '服务器收到宇宙能量的干扰，已经变异成机甲！'
        }
    }
    console.log(error.message)
    return Promise.reject(error)
});

export default axios;