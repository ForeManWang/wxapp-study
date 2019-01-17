Page({
  buttonTapHandle: function (e) {
    console.log(123)
    // console.dir() 将一个对象以树状形式打印到控制台
    console.dir(e)
  },
  innerHandle: function () {
    console.log('inner')
  },
  outterHandle: function () {
    console.log('outter')
  },
  tap2Handle: function (e) {
    // e.target 拿到的就是点击的元素
    // dataset指的是元素上所有以data-开头的属性集合
    console.dir(e.target.dataset) 
    // console.log(this) // 事件处理函数中的this指向的还是页面对象！！！跟跟HTML不一样
  }
})
