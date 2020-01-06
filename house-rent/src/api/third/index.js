import axios from 'axios';
import { FW_WEBSERVER } from '@/api/type';

// 区域查询
export const getDistrict = (data) => {
    return axios.get('https://restapi.amap.com/v3/config/district', {
        params: {
            ...data,
            subdistrict: 1,
            extensions: 'base',
            key: FW_WEBSERVER
        }
    }, {
        headers: {
            'Set-Cookie': 'widget_session=abc123; SameSite=None; Secure'
        }
    }).then(res => res).catch(err => err)
}

// 当前位置城市
export const getCurrCity = () => {
    return axios.get('https://restapi.amap.com/v3/ip', {
        params: {
            output: 'JSON',
            key: FW_WEBSERVER
        }
    }, {
        headers: {
            'Set-Cookie': 'widget_session=abc123; SameSite=None; Secure'
        }
    }).then(res => res).catch(err => errr)
}