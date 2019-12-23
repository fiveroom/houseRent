// import axios from '@/axios';
// 登录
import axios from '@/config/axios';

// 账号登录
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

// 登录验证码
export const getCode = data => {
    return axios.post('/LoginRegistMgeSvr.assx/sendLoginCode', {...data, noLoading: true }).then(res => {
        if (res.data.Code == '200') {
            return { status: true, msg: res.data.Msg }
        }
        return { status: false, msg: '验证码获取失败请稍后再试' }
    }).catch(err => {
        return { status: false, msg: '验证码获取失败请稍后再试' }
    })
}

// 验证码登录
export const logByCode = data => {
    return axios.post('/LoginRegistMgeSvr.assx/loginByCode', data).then(res => {
        console.log(res, '验证码登录');
        if (res.date.Code == '200') {
            return { status: true, msg: '登录成功', data: res.data.Data }
        }
        return { status: false, msg: '登录失败，验证码错误' }
    }).catch(err => {
        return { status: false, msg: '登录失败请稍后再试' }
    })
}

// 注册
export const registUser = data => {
    return axios.post('/LoginRegistMgeSvr.assx/registUser', data).then(res => {
        console.log(res);
        if (res.data.Data.code == "200") {
            return { status: true, msg: '注册成功' }
        }
        return { status: false, msg: res.data.Data.Msg }
    }).catch(err => {
        return { status: false, msg: '注册失败，请稍后再试' }
    })
}

// 注册验证码
export const registUserCode = async(data) => {
    return await axios.post('/LoginRegistMgeSvr.assx/sendRegistCode', data).then(res => {
        if (res.data.Code == "200") {
            return { status: true, msg: '验证码获取成功' }
        }
        return { status: false, msg: '验证码获取失败' }

    }).catch(err => {
        return { status: false, msg: '验证码获取失败' }
    })
}


// 查询用户电话

export const queryTel = data => {
    return axios.post('/LoginRegistMgeSvr.assx/queryUserTel', data).then(res => {
        console.log(res, '手机号');
        if (res.data.Code == "600") {
            return { status: true, msg: '此手机号账户已存在，请更换手机号' }
        }
        return { status: false, msg: '' }
    }).catch(err => {
        return { status: false, msg: '' }
    })
}


// 查询用户名称
export const queryUName = data => {
    return axios.post('/LoginRegistMgeSvr.assx/queryUserName', data).then(res => {
        console.log(res, '账户名');
        if (res.data.Code == "700") {
            return { status: true, msg: '此账户名已存在，请更换账户名' }
        }
        return { status: false, msg: '' }
    }).catch(err => {
        return { status: false, msg: '' }
    })
}

// 动态验证码
export const editAuthCode = data => {
    return axios.post('/LoginRegistMgeSvr.assx/sendUpdateCode', data).then(res => {
        // console.log(res, '添加收藏');
        if (res.data.Code == "200") {
            return { status: true, msg: '收藏成功' }
        }
        return { status: false, msg: '收藏失败，请稍后再试' }
    }).catch(err => {
        return { status: false, msg: '收藏失败，请稍后再试' }
    })
}

// 更新信息
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
export const queryOwnCollect = async(data) => {
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
export const queryCtractIn = async(data) => {
    return await axios.post('/UserMgeSvr.assx/queryContractInfoOfUser', data).then(res => {
        console.log('查看合同', res);
        if (res.data.Code == 200) {
            return { status: true, data: res.data.Data._Items }
        }
        return { status: false, data: [] }
    }).catch(err => {
        return { status: false, data: [] }
    })
}

// 查看订单
export const queryOrder = data => {
    return axios.post('/UserMgeSvr.assx/queryOrderInfoOfUser', data).then(res => {
        console.log('查看订单', res);
        if (res.data.Code == 200) {
            return { status: true, data: res.data.Data._Items }
        }
        return { status: false, data: [] }
    }).catch(err => {
        return { status: false, data: [] }
    })
}

// 上传头像
let a = { "total": 1, "code": "200", "msg": "请求成功", "data": [{ "user_id": 35, "user_name": "hahaha", "user_pwd": "A123456", "user_realName": null, "user_age": null, "user_tel": "15182432853", "user_identity": null, "user_email": null, "user_isBreach": "N", "user_avaterPath": "http://39.106.122.19:8888/files/UserAvater/35_UserAvater.jpg" }] }
export const uploadAvator = data => {
    return axios.post('/upImage/addUserAvater', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        console.log(res);
        if (res.data.code == "200") {
            return { status: true, msg: '头像修改成功', url: res.data.data[0].user_avaterPath }
        }
        return { status: false, msg: '头像上传失败，请稍后再试' }
    }).catch(err => {
        return { status: false, msg: '头像上传失败，请稍后再试' }
    })
}