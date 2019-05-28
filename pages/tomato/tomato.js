// pages/tomato/tomato.js
const { http } = require('../../utils/http.js')
Page({
  timer: null,
  data: {
    time: 1500,
    showTime: "",
    timerStaus: 'stop',
    confirm: false,
    again: false,
    finishVisible: false
  },

  onShow: function () {
    this.moveTime()
    http.post('/tomatoes').then(res=>{
      this.setData({tomato:res.data.resource})
    })
  },
  moveTime() {
    this.setData({timerStatus: 'stop'})
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.time = this.data.time - 1
      this.changeTime()
      if(this.data.time <= 0) {
        this.setData({again:true})
        this.setData({ finishVisible: true})
        return this.clearTimer()
      }
    }, 1000)
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: "start"})
  },
  changeTime() {
    let min = Math.floor(this.data.time/60)
    let sec = Math.floor(this.data.time%60)
    if(sec === 0) {
      sec = '00'
    }
    if((sec+'').length === 1){
      sec = '0' + sec
    }
    if ((min + '').length === 1) {
      min = '0' + min
    }
    this.setData({showTime: `${min}:${sec}`})
  },

  abandonConfirm(event) {
    let content =  event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description: content,
      aborted: true
    })
    wx.navigateBack({
      to: -1
    })
  },
  abandon() {
    this.setData({ confirm: true })
    this.clearTimer()
  },
  hide() {
    this.setData({ confirm: false})
  },
  againTimer() {
    this.data.time = 1500
    this.setData({ again: false})
    this.moveTime()
  },
  finishCancel() {
    this.setData({ finishVisible:false})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃",
        aborted: true
      })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃",
        aborted: true
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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