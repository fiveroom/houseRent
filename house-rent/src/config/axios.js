import axios from 'axios';
import Qs from 'qs';
import axiosExtra from "axios-extra";
// import { showLoading, tryHideLoading } from '@/config/lodding';
import { showLoading, tryHideLoading } from './otherLoadding';
const Axios = axiosExtra.create({
    axios,
    timeout: 2000,
    queueOptions: {
        retry: 0, // 重试次数
        retryIsJump: true
    },
})
Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
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
    console.log(err, '----------------');
    tryHideLoading()
    return Promise.reject(err);
});
export default Axios