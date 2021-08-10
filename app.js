// app.js
App({
  onLaunch() {
    let that = this;
    
    // 登录
    let openid = that.globalData.token
    console.log(that.globalData.token)
    if(openid===null||openid===undefined){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            method: 'POST',
            url: that.globalData.serverUrl+'/moon/take/num/openid/get?code=' + res.code,
            success: function (res) {
              try {
                that.globalData.userInfo = res.data.data
                that.globalData.token = res.data.data.openid
                wx.setStorageSync('token', res.data.data.openid)
                // 根据openid查询是不是商户，如果是商户就跳转到商户页面
                that.getShopper(res.data.data.openid)
              } catch (e) {
              }
            }
          })
        }
      })
    } else {
      that.getShopper(openid)
    }    
  },

  getShopper:function(openid){
    let that = this;
    var openId = openid
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        method: 'GET',
        url: that.globalData.serverUrl+'/moon/take/num/getUser',
        data: {
          openId:openId
        },
        success: function (res) {
          if (res.data.success) {
            if (res.data.data != null && res.data.data.mobile === "888888") {
              wx.redirectTo({
                  url: '../shopper/index',
                })
            } else{
              wx.redirectTo({
                url: '../take/take',
              })
            }   
          }
        }
      })
  },
  globalData: {
    userInfo: null,
    tokenKey: 'API_TOKEN',
    token: null,
    //serverUrl: 'https://moon.idoge.mobi'
    serverUrl: 'http://192.168.100.152:8933'
  }
})
