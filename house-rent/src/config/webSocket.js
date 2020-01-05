export class myWebS {
    constructor(url, times) {
        this.url = url;
        this.times = times;
        this.init()
    }

    init() {
        console.log('连接啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊');
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
        console.log('连接成功');
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

// 192.168.3.5  李晓东
// 39.106.122.19
// 192.168.3.26  余展鹏
export const webChatU = 'ws://39.106.122.19:8888/websocket/';
export const webMsg = 'ws://39.106.122.19:8888/socketServer/';

// export default {
//     myWebS,
//     webChatU,
//     webMsg
// }