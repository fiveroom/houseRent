import axios from 'axios';
import qs from 'qs';

export const searchHouse = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseByColumn', qs.stringify(data)).then(res => {
        call(res.data)
    }).catch(err => {
        call(err)
    })
}

export const houseDetail = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseById', qs.stringify(data)).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}