// pages/shopper/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: 'http://192.168.100.152:8933',
    numInfo:[],
    permCount:0,
    hairCutCount:0,
    nowPage:1,
    token:null
  },


  /**
   * 开始操作
   * @param {*} event 
   */
  start:function(event) {
    var uuid = event.currentTarget.dataset.id;
    var openid = event.currentTarget.dataset.openid;
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['F-gd0nI4EJNRHmIlYIk-lnO3MNlYK8ZeFiuvr9yMFf8'],
      success(res) {
        console.log("授权成功")
        //请求接口
        that.doing(uuid,openid);
      },
      fail(res) {
        console.log("授权失败",res)
      }
    })
  },

  doing:function(uuid,openid) {
    var uuid = uuid;
    var openid = openid;
    let that = this;
    wx.request({
      method: 'get',
      url: that.data.serverUrl+'/moon/info/num/start',
      data:{
        uuid:uuid,
        openId:openid
      },
      success: function (res) {
        if (res.data.success) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
          that.getInfo();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },


/**
   * 完成操作
   * @param {*} event 
   */
  complete:function(event) {
    var uuid = event.currentTarget.dataset.id;
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['F-gd0nI4EJNRHmIlYIk-lnO3MNlYK8ZeFiuvr9yMFf8'],
      success(res) {
        console.log("授权成功")
        //请求接口
        that.completeOper(uuid);
      },
      fail(res) {
        console.log("授权失败",res)
      }
    })
  },

  completeOper:function(uuid) {
    var uuid = uuid;
    let that = this;
    wx.request({
      method: 'get',
      url: that.data.serverUrl+'/moon/info/num/complete',
      data:{
        uuid:uuid,
      },
      success: function (res) {
        if (res.data.success) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
          that.getInfo();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },


  /**
   * 作废操作
   * @param {*} event 
   */
  refuse:function(event) {
    var uuid = event.currentTarget.dataset.id;
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['F-gd0nI4EJNRHmIlYIk-lnO3MNlYK8ZeFiuvr9yMFf8'],
      success(res) {
        console.log("授权成功")
        //请求接口
        that.refuseOper(uuid);
      },
      fail(res) {
        console.log("授权失败",res)
      }
    })
  },

  refuseOper:function(uuid) {
    var uuid = uuid;
    let that = this;
    wx.request({
      method: 'get',
      url: that.data.serverUrl+'/moon/info/num/invalidate',
      data:{
        uuid:uuid,
      },
      success: function (res) {
        if (res.data.success) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
          that.getInfo();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      token:wx.getStorageSync('token')
    })
     this.getRuleNum();
     this.getInfo();
  },

  getInfo:function(){
    let that = this;
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        method: 'POST',
        url: that.data.serverUrl+'/moon/info/num/list',
        success: function (res) {
          try {
           that.setData({
            numInfo:res.data.data.data,
           })
          } catch (e) {
          }
        }
      })
  },


  getRuleNum:function(){
    let that = this;
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        method: 'POST',
        url: that.data.serverUrl+'/moon/info/num/type/count',
        success: function (res) {
          try {
           that.setData({
            permCount:res.data.data.permCount,
            hairCutCount:res.data.data.hairCutCount
           })
          } catch (e) {
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      let that = this;
      let nowPage = that.data.nowPage;
      nowPage = nowPage + 1
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})