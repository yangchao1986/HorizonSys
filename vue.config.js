//vue3版本配置参数
/* 如果你的前端应用和后端API服务器没有运行在同一个主机上，你需要在开发环境下将API请求 */

module.exports = {
  devServer: {
    /*
    * 1 写'/api'就等于写'http://localhost:8989'
    * 2 请求 url: '/api/Auto/Login',即等于http://192.158.0.001:5000/Auto/Login
    */
    proxy:{
      '/api': {
        target: 'http://localhost:8989',// 后台接口域名
        ws: true,//如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {//重写路径
          '^/api': '' //// 如果接口本身没有/api需要通过pathRewrite来重写了地址,这里把/api转成‘ ’
        }
      },
    },
  }
}
