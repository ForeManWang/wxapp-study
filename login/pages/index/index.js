/*
  1. 设计数据的结构（data属性）
  2. 将数据绑定到特定的元素上
  3. 登录按钮的点击事件（具体的登录逻辑）
 */

// Page({
//   data: {
//     username: 'admin',
//     password: '123'
//   },
//   usernameChangeHandle: function (e) {
//     // this.data.username = e.detail.value 不要用这种方式，因为界面层无法得知
//     this.setData({
//       username: e.detail.value
//     })
//   },
//   passwordChangeHandle: function (e) {
//     // this.data.password = e.detail.value 不要用这种方式，因为界面层无法得知
//     this.setData({
//       password: e.detail.value
//     })
//   },
//   // 用于处理登录按钮点击的事件
//   loginHandle: function () {
//     // TODO: 完成逻辑
//     // 1. 先需要知道用户输入了什么
//     console.log(this.data)
//     // 2. 根据用户输入的值判断

//     // 3. 根据判断的结果做出响应
//   }
// })







// version 2

// Page({
//   data: {
//     username: 'admin',
//     password: '123'
//   },
//   inputChangeHandle: function (e) {
//     // var prop = 'username' // ?? 可变的
//     var prop = e.target.dataset['prop']
//     var changed = {}
//     changed[prop] = e.detail.value

//     this.setData(changed)
//   },
//   // 用于处理登录按钮点击的事件
//   loginHandle: function () {
//     // TODO: 完成逻辑
//     // 1. 先需要知道用户输入了什么
//     console.log(this.data)
//     // 2. 根据用户输入的值判断

//     // 3. 根据判断的结果做出响应
//   }
// })






// version 3 form提交

Page({
  data: {
    username: 'admin',
    password: '123'
  },
  // 用于处理表单提交事件
  loginHandle: function (e) {
    console.log(e)
  }
})