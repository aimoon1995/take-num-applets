// pages/take/take.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    permCount:0,
    haircutCount:0,
    permCountSec:0,
    haircutCountSec:0,
    name:null
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
  },

  clickIcon:function (event) {
    console.log(event.detail.value)
   this.setData({
     name:event.detail.value
   });
  },

  permCountChange:function (event) {
   this.setData({
    permCountSec:event.detail
   });
  },
  
  haircutCountChange:function (event) {
   this.setData({
    haircutCountSec:event.detail
   });
  },
  takeNum:function() {
    var name = this.data.name;
    var permCountSec = this.data.permCountSec;
    var haircutCountSec = this.data.haircutCountSec;
    console.log("");
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
    let  that = this;

    queryInfo(this.userI);
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