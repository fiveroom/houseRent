class WebS {
    constructor(url, times) {
        this.url = url;
        this.times = times;
        this.init()
        console.log('成功');
    }

    init() {
        this.webS = new WebSocket(this.url);
        this.webS.onerror = this.error
    }

    // 发送数据
    send(data) {
        this.webS.send(data)
    }

    // 关闭连接
    close() {
        console.log('关闭连接');
        this.webS.close();
    }

    // 接受消息
    message(call) {
        this.webS.onmessage = (event) => {
            let data = JSON.parse(event.data);
            call(data)
        };
    }

    // 连接成功
    conSuss(call) {
        this.webS.onopen = call;
    }

    // 保存信息
    saveMsg() {

    }

    error() {
        while (this.times) {
            console.log('失败重连中');
            setTimeout(() => {
                this.init()
                this.times--;
            }, 1000)
        }
    }
}

export default WebS