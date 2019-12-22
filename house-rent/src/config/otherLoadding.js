import vue from 'vue';
let Vue = new vue();

let needLoadingRequestCount = 0
const startLoading = () => {
    Vue.$myLoadding.open()
}

const endLoading = () => { Vue.$myLoadding.hide() }

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