import axios from 'axios';
import Qs from 'qs';
import axiosExtra from "axios-extra";
// import { showLoading, tryHideLoading } from '@/config/lodding';
import { showLoading, tryHideLoading } from './otherLoadding';
const Axios = axiosExtra.create({
    axios,
    timeout: 6000,
    queueOptions: {
        retry: 2, // 重试次数
        retryIsJump: true
    },
})


// http://192.168.3.5:8888  李晓东
// http://39.106.122.19:8888
// http://192.168.3.26:8888  余展鹏
Axios.defaults.baseURL = 'http://39.106.122.19:8888';
Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(config => {
    if (config.method !== 'get') {
        if (!config.data.noLoading && config.data.toString() != '[object FormData]') {
            showLoading()
        }
        delete config.data.noLoading;
        if (config.data.toString() != '[object FormData]') {
            config.data = Qs.stringify(config.data);
        }
    } else {
        showLoading()
    }
    return config;
}, err => {
    return Promise.reject(err);
});

Axios.interceptors.response.use(res => {
    tryHideLoading()
    return res
}, err => {
    tryHideLoading()
    return Promise.reject(err);
});
export default Axios