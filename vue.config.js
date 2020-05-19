module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dengheng.top:2222',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      }
    }
  },
  publicPath:""  //项目打包时打开  ，，开发环境关闭
}