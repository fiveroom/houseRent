import axios from 'axios';
import qs from 'qs';
// 登录
export const login = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/loginByUserNameOrTel', qs.stringify(data)).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

export const getCode = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/sendLoginCode', qs.stringify(data)).then(res => {
        call(res)
    }).catch(err => {
        return err
    })
}

export const logByCode = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/loginByCode', qs.stringify(data)).then(res => {
        call && call(res)
        return res
    }).catch(err => {
        return err
    })
}