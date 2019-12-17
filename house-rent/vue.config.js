module.exports = {
    devServer: {
        proxy: {
            // http://39.106.122.19:8888/UserMgeSvr.assx
            "/LoginRegistMgeSvr.assx": {
                target: "http://192.168.3.5:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            }
        }
    }
};