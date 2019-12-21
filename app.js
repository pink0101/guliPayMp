/**
 * 小程序入口
 */
// api
let Api = require('./http/api.js')
// 请求
let request = require('./http/request.js')
// 环境变量
let config = require('./env/index.js')
// 路由
let router = require('./utils/router.js')
// 当前环境
let env = 'Dev';
App.version = '1.0.0';//开发版本
App.config = config[env];//根据环境变量获取对应的配置信息
App.config.env = env;
App.config.mockApi = config.mockApi;
App({
  config: config[env],
  Api,
  router,
  get: request.fetch,
  post: (url,data,option)=>{
    option.method = 'post';
    return request.fetch(url, data, option);
  },
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  }
})