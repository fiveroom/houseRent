import { Loading } from 'element-ui';

let lodding;
let needLoadingRequestCount = 0
const startLoading = (dom) => {
    let obj = { lock: true, text: '拼命加载中……', customClass: 'loadding-animation', background: 'rgba(0, 0, 0, 0.9)' }
    if (dom) {
        obj.target = dom
    }
    lodding = Loading.service(obj)
}

const endLoading = () => { lodding.close() }

export const showLoading = () => {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++;
}

export const tryHideLoading = () => {
    if (needLoadingRequestCount <= 0) { return }
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        let timer = setTimeout(() => {
            endLoading()
            clearTimeout(timer)
        }, 1000)
    }
}