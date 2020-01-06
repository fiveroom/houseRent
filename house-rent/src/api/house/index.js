import axios from '@/config/axios';
// 条件搜索房源
export const searchHouse = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseByColumn', data).then(res => {
        // console.log(res, '房屋信息');
        call && call(res.data)
    }).catch(err => {
        call && call(err)
    })
}

// 根据标题搜索房屋
export const queryByT = async(data) => {
    return await axios.post('/UserMgeSvr.assx/queryHouseByTitle', data).then(res => {
        if (res.data.Code === "200") {
            return { status: true, data: res.data.Data._Items };
        } else {
            return ({ status: false, data: [] });
        }
    }).catch(err => {
        return ({ status: false, data: [] });
    })
}


export const houseDetail = (data, call) => {
    return axios.post('/UserMgeSvr.assx/queryHouseById', data).then(res => {
        // console.log(res, '------------------------------------');
        if (res.data.Code === "200") {
            call && call({ status: true, Data: res.data.Data });
        } else {
            call && call({ status: false, Data: { House: {} } });
        }
        return res
    }).catch(err => {
        call && call({ status: false, Data: { House: {} } });
        return err
    })
}

// 房屋收藏量
// {
//    house_id: '22'
// }
export const queryHouseCollectAmount = async(data) => {
    return await axios.post('/UserMgeSvr.assx/queryHouseCollectAmount', data).then(res => {
        if (res.data.Code === "200") {
            return { num: res.data.Data }
        }
        return { num: 0 }
    }).catch(err => {
        return { num: 0 }
    })
}

// 推荐房源
export const queryHotH = () => {
    return axios.get('/UserMgeSvr.assx/queryHouseByCollectAmount').then(res => {
        // console.log(res, '推荐');
        if (res.data.Code === "200") {
            return { status: true, data: res.data.Data }
        }
        return { status: false, data: [] }
    }).catch(err => {
        return { status: false, data: [] }
    })
}



/**
 * 上传合同签名
 * con_id 合同id
 * conPic 签名
 */
export const upConName = data => {
    return axios.post('/contract/upLoadWord', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        // console.log(res, '上传合同');
        if (res.data.code === "200") {
            return { status: true, msg: '合同上传成功' }
        }
        return { status: false, msg: '合同上传失败，请稍后再试' }
    }).catch(err => {
        return { status: false, msg: '合同上传失败，请稍后再试' }
    })
}