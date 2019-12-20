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

export const updateUserInfo = (data) => {
    return {
        status: true
    }
    // return axios.post('/UserMgeSvr.assx/updateUserInfo', qs.stringify(data)).then(res => {
    //     return res
    // }).catch(err => {
    //     return err
    // })
}

// ????
export const addBespeak = (data, call) => {
    return axios.post('/UserMgeSvr.assx/addBespeak', qs.stringify(data)).then(res => {
        if (res.data.Code === "200") {
            call && call({ status: true, Data: res.data.Data });
        } else {
            call && call({ status: false, Data: res.data.Msg });
        }
        return res
    }).catch(err => {
        return err
    })
}

// addBespeak(
//     {
//         bespeak: JSON.stringify({
// Bs_type: 1,
// User_id: 12,
// User_tel: 15182432853,
// House_id: 1,
// Admin_id: 1,
// Bs_time: new Date(),
// Bs_isDeal: "fasle"
//         })
//     },
//     res => {
//         console.log(res, "??");
//     }
// );

// ????
// {
//     house_id: '1',
//     user_id: '3'
// }
export const addOwnCollect = (data, call) => {
    return axios.post('/UserMgeSvr.assx/addOwnCollect', qs.stringify(data)).then(res => {
        call && call(res)
        return res
    }).catch(err => {
        return err
    })
}

// ????
// {
//     house_idStr: '1,2,3',
//     user_id: '2'
// }
export const deleteOwnCollectBatch = (data, call) => {
    return axios.post('/UserMgeSvr.assx/deleteOwnCollectBatch', qs.stringify(data)).then(res => {
        call && call(res)
        return res
    }).catch(err => {
        return err
    })
}



// ????
// {
//     user_id: '2'
// }
export const queryOwnCollect = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryOwnCollect', qs.stringify(data)).then(res => {
        call && call(res)
        return res
    }).catch(err => {
        return err
    })
}