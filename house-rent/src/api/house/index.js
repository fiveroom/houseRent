import axios from 'axios';
import qs from 'qs';

export const searchHouse = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseByColumn', qs.stringify(data)).then(res => {
        call && call(res.data)
    }).catch(err => {
        call && call(err)
    })
}

export const houseDetail = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseById', qs.stringify(data)).then(res => {
        if (res.data.Code === "200") {
            call && call({ status: true, Data: res.data.Data });
        } else {
            call && call({ status: false, Data: res.data.Msg });
        }
        return res
    }).catch(err => {
        call && call({ status: false, Data: res.data.Msg });
        return err
    })
}

// 房屋收藏量
// {
//    house_id: '22'
// }
export const queryHouseCollectAmount = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseCollectAmount', qs.stringify(data)).then(res => {
        if (res.data.Code === "200") {
            call && call({ status: true, Data: res.data.Data });
        } else {
            call && call({ status: false, Data: res.data.Msg });
        }
        return res
    }).catch(err => {
        call && call({ status: false, Data: res.data.Msg });
        return err
    })
}