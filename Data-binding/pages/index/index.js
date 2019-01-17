//index.js
//获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })

// Page({
//   data: {
//     nodes: [{
//       name: 'div',
//       attrs: {
//         class: 'div_class',
//         style: 'line-height: 60px; color: red;'
//       },
//       children: [{
//         type: 'text',
//         text: 'Hello&nbsp;World!'
//       }]
//     }]
//   },
//   tap() {
//     console.log('tap')
//   }
// })

// Page({
//   data: {
//     items: [
//       { name: 'USA', value: '美国' },
//       { name: 'CHN', value: '中国', checked: 'true' },
//       { name: 'BRA', value: '巴西' },
//       { name: 'JPN', value: '日本' },
//       { name: 'ENG', value: '英国' },
//       { name: 'TUR', value: '法国' },
//     ]
//   },
//   checkboxChange(e) {
//     console.log('checkbox发生change事件，携带value值为：', e.detail.value)
//   }
// })


// Page({
//   data: {
//     items: [
//       { name: 'USA', value: '美国' },
//       { name: 'CHN', value: '中国', checked: 'true' },
//       { name: 'BRA', value: '巴西' },
//       { name: 'JPN', value: '日本' },
//       { name: 'ENG', value: '英国' },
//       { name: 'TUR', value: '法国' },
//     ]
//   },
//   radioChange(e) {
//     console.log('radio发生change事件，携带value值为：', e.detail.value)
//   }
// })

// const pageData = {}
// for (let i = 1; i < 5; i++) {
//   (function (index) {
//     pageData['slider' + index + 'change'] = function (e) {
//       console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
//     }
//   }(i))
// }
// Page(pageData)
Page({
  data: {

  },
  btnTodo() {
    // 当点击按钮触发
    // console.log('111')
    wx.showActionSheet({
      // 显示出来的项目列表
      itemList: ['a', 'b', 'c'],
      // 成功回调
      success: function (res) {
        if(!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    })
  }
})
// Page({

//   /**
//    * 页面的初始数据，给页面供数据的，就是界面和逻辑之间的桥梁
//    */
//   data: {
//     message: 'hello'
//   },
//   buttonTap(e) {
//     console.log(e)
//     console.log(e.target)
//   },
//   handleTap1() {
//     console.log('我是handleTap1')
//   },
//   handleTap2() {
//     console.log('我是handleTap2')
//   },
//   handleTap3() {
//     console.log('我是handleTap3')
//   },
//   handleTap4() {
//     console.log('我是handleTap4')
//   },
//   inputHandle(e) {
//     // console.log(e.detail.value)
//     // console.log(this.data.message)
//     // this.data.message = e.detail.value 
//     this.setData({
//       message: e.detail.value
//     }) 
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
    
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
    
//   }
// })