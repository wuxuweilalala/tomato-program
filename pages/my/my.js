// pages/me/me.js
const { http } = require('../../utils/http.js');

Page({
  data: {
    tab: "tomato",
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow() {
    this.fetchTomatoes()
    this.fetchTodos()
    this.setData({ me: wx.getStorageSync('me') })
  },
  fetchTomatoes() {
    http.get('/tomatoes', { is_group: "yes" })
      .then(res => {
        this.setData({ tomatoes: res.data.resources })
      })
  },
  fetchTodos() {
    http.get('/todos', { is_group: "yes" })
      .then(res => {
        this.setData({ todos: res.data.resources })
      })
  },
  changeTab(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})