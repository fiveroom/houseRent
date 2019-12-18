module.exports = {
    devServer: {
        proxy: {
            // http://39.106.122.19:8888/UserMgeSvr.assx
            "/UserMgeSvr.assx": {
                target: "http://192.168.3.26:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/TopAdminMgeSvr.assx/": {
                target: "http://192.168.3.5:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            }
        }
    }
};