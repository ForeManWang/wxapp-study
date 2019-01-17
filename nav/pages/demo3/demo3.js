// pages/demo3/demo3.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  backHandle: function () {
    // 默认返回到上一页
    // wx.navigateBack()

    // 指定delta 就是返回到指定页面
    // delta 过大（超出历史记录）默认返回最开始的页面
    wx.navigateBack({
      delta: 100
    })
  }
})