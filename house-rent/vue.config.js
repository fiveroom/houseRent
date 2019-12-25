module.exports = {
    devServer: {
        proxy: {
            // 192.168.3.5  李晓东
            // 39.106.122.19
            // 192.168.3.26  余展鹏
            "/UserMgeSvr.assx": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/LoginRegistMgeSvr.assx": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/TopAdminMgeSvr.assx/": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/upImage": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/payController": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/files": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            },
            "/contract": {
                target: "http://39.106.122.19:8888/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            }
            
            // "/UserMgeSvr.assx": {
            //     target: "http://192.168.3.33:8888/",
            //     changeOrigin: true,
            //     autoRewite: true,
            //     cookieDomainRewrite: true
            // }
        }
    }
};