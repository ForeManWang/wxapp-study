//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    show: false
  },
  //事件处理函数
  toggle: function () {
    this.setData({ show: !this.data.show })
  }
})
