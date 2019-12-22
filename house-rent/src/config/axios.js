import axios from 'axios';
import Qs from 'qs';
import axiosExtra from "axios-extra";
// import { showLoading, tryHideLoading } from '@/config/lodding';
import { showLoading, tryHideLoading } from './otherLoadding';
const Axios = axiosExtra.create({
    axios,
    timeout: 2000,
    queueOptions: {
        retry: 2,
        retryIsJump: true
    },

})
Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
Axios.interceptors.request.use(config => {
    if (!config.data.noLoading) {
        showLoading()
    }
    delete config.data.noLoading;
    config.data = Qs.stringify(config.data);
    return config;
}, err => {
    return Promise.reject(err);
});

Axios.interceptors.response.use(res => {
    tryHideLoading()
    // Vue.$myLoadding.hide()
    return res
}, err => {
    // Vue.$myLoadding.hide()
    tryHideLoading()
    return Promise.reject(err);
});
export default Axios
