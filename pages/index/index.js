//index.js
//获取应用实例
const app = getApp()
let store = require('./../../utils/store.js')
let Api = app.Api;
let router = app.router;
Page({
  data: {
    userId:store.getItem('userId')
  },
  onLoad: function () {
    // 判断用户是否登录
    if(!this.data.userId){
      this.getSession();
    }
  },
  // 获取登录的code
  getSession(){
    wx.login({
      success:(res)=>{
        if(res.code){
          app.get(Api.getSession,{
            code:res.code
          }).then((res)=>{// 存储
            store.setItem('openId',res.openid);
            console.log(res.openid)
          }).catch((res)=>{
            console.log('error:'+res.message)
          })
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo(e){
    // e.detail.userInfo 用户信息
    let userInfo = e.detail.userInfo; 
    // 取到openid 存到用户信息里面去
    userInfo.openid = store.getItem('openId');
    // 调用登录接口
    app.get(Api.login,{
      userInfo
    }).then((res)=>{
      // 存储到本地
      store.setItem('userId', res.userId);
      // 设置data数据
      this.setData({
        userId:res.userId
      })
    })
  },
  recharge(){// 跳转到支付
    router.push('pay');
  },
  activity(){// 跳转活动详情
    router.push('activity');
  },
  onShareAppMessage() { // 指定分享内容
    return { 
      title:'欢迎体验慕课支付',
      path:'/pages/index/index',
      imageUrl: '/assets/images/share_mp_logo.png'
    }
  }
})
