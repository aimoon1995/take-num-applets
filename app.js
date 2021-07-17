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
              } catch (e) {
              }
            }
          })
        }
      })
    }
    
    // if(openid!=null&&openid!=''){
    //   // 获取用户信息
    //   wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             // 可以将 res 发送给后台解码出 unionId
    //             that.globalData.userInfo = res.userInfo
    //             console.log(res.userInfo)
    //             let userInfo = res.userInfo
                
    //             wx.setStorageSync("userInfo", userInfo)

    //             var params = 'nickName=' + userInfo.nickName + '&avatarUrl=' + userInfo.avatarUrl 
    //             + '&gender=' + userInfo.gender + '&province=' + userInfo.province + '&city=' + userInfo.city 
    //             + '&country=' + userInfo.country+"&"+that.globalData.tokenKey+"="+that.globalData.token;
    //             wx.request({
    //               url: that.globalData.serverUrl+'/api/user/auth.do?'+params,
    //               method: 'POST',
    //               success: function(res){
    //                 console.log(res.data)
    //               }
    //             })
    //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //             // 所以此处加入 callback 以防止这种情况
    //             if (this.userInfoReadyCallback) {
    //               this.userInfoReadyCallback(res)
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // }
  },
  globalData: {
    userInfo: null,
    tokenKey: 'API_TOKEN',
    token: null,
    serverUrl: 'http://192.168.100.152:8933'
  }
})
