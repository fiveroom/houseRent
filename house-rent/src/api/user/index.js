// import axios from '@/axios';
import qs from 'qs';
// 登录
import axios from '@/config/axios';

export const login = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/loginByUserNameOrTel', data).then(res => {
        if (res.data.Code === "200") {
            return { status: true, Data: res.data.Data, msg: '登录成功' }
        }
        return { status: false, msg: res.data.Msg }

    }).catch(err => {
        return { status: false, msg: '登录失败请稍后再试', errData: err }
    })
}

export const getCode = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/sendLoginCode', data).then(res => {
        call(res)
    }).catch(err => {
        return err
    })
}

export const logByCode = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/loginByCode', data).then(res => {
        call && call(res)
        return res
    }).catch(err => {
        return err
    })
}

// 注册
export const registUser = (data, call) => {
    return axios.post('/LoginRegistMgeSvr.assx/registUser', data).then(res => {
        // console.log(res, '注册啊啊啊');
        return res
    }).catch(err => {
        return err
    })
}

// 注册验证码
export const registUserCode = async (data) => {
    return await axios.post('/LoginRegistMgeSvr.assx/sendRegistCode', data).then(res => {
        if (res.data.Code == "200") {
            return { status: true, msg: '验证码获取成功' }
        }
        return { status: false, msg: '验证码获取失败' }

    }).catch(err => {
        return { status: false, msg: '验证码获取失败' }
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

// 预约
export const addBespeak = (data, call) => {
    return axios.post('/UserMgeSvr.assx/addBespeak', data).then(res => {
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

// 添加收藏
export const addOwnCollect = (data, call) => {
    return axios.post('/UserMgeSvr.assx/addOwnCollect', data).then(res => {
        // console.log(res, '添加收藏');
        if (res.data.Code == "200") {
            return { status: true, msg: '收藏成功' }
        }
        return { status: false, msg: '收藏失败，请稍后再试' }
    }).catch(err => {
        return { status: false, msg: '收藏失败，请稍后再试' }
    })
}

// 删除收藏
// {
//     house_idStr: '1,2,3',
//     user_id: '2'
// }
export const deleteOwnCollectBatch = (data, call) => {
    return axios.post('/UserMgeSvr.assx/deleteOwnCollectBatch', data).then(res => {
        // console.log(res, '删除收藏');
        if (res.data.Code == "200") {
            return { status: true, msg: '移除收藏成功' }
        }
        return { status: false, msg: '移除收藏失败' }
    }).catch(() => {
        return { status: false, msg: '移除收藏失败' }
    })
}



// 查看用户收藏
// {
//     user_id: '2'
// }
export const queryOwnCollect = async (data) => {
    return await axios.post('/UserMgeSvr.assx/queryOwnCollect', data).then(res => {
        // console.log('查询收藏', res);
        if (res.data.Code == 200) {
            return { status: true }
        }
        return { status: false }
    }).catch(err => {
        return { status: false }
    })
}

// 查看合同
export const queryCtractIn = async (data) => {
    return await axios.post('/UserMgeSvr.assx/queryContractInfoOfUser', data).then(res => {
        console.log('查看合同', res);
        if (res.data.Code == 200) {
            return { status: true, data: res.data.Data._Items }
        }
        return { status: false, data: []}
    }).catch(err => {
        return { status: false, data: []}
    })
}
