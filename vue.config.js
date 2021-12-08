module.exports = {
  // 前端
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        // target: 'http://localhost:9001', // 本地后端接口地址
        target: 'http://139.224.12.115:9001', // 服务器端接口地址
        changOrigin: true, // 允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': '/'
        }
      },
      '/img': {
        // target: 'http://localhost:9001', // 本地后端接口地址
        target: 'http://139.224.12.115:8003', // 服务器端接口地址
        changOrigin: true, // 允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/img': ''
        }
      }

    }
  }
}
