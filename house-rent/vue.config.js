module.exports = {
    devServer: {
        proxy: {
            // http://39.106.122.19:8888/UserMgeSvr.assx
            "/LoginRegistMgeSvr.assx": {
                target: "http://39.106.122.199:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            }
        }
    }
};