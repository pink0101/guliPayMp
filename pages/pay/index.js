//获取应用实例
const app = getApp();
const Api = app.Api;
const Store = require('./../../utils/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1
  },
  // 获取文本框金额
  getMoney(e) {
    let amount = e.detail.value;
    console.log(amount)
    this.setData({
      index: amount * 100
    })
  },
  // 选择充值金额
  choose(e) {
    let data = e.currentTarget.dataset;
    this.setData({
      index: data.amount,
    });
  },
  pay() {
    let index = this.data.index
    if (/^\d*$/.test(index) && index > 0){
      app.get(Api.payWallet, {
        openId: Store.getItem('openId'),
        money: index
      }).then((res) => {
        // 支付
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: function (errmsg) {
            if (errmsg == 'requestPayment:ok') {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              });
            }
          },
          fail: function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '支付取消',
                icon: 'none'
              });
            } else {
              wx.showToast({
                title: res.errmsg,
                icon: 'none'
              });
            }
          }
        })
      });
    }else{
      wx.showToast({
        title: '请输入正确的金额',
        icon:'none'
      })
    }
  }
})