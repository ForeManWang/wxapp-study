Page({
    tapHandle: function () {
        // 当我们点击按钮 系统会自动执行这里的代码
        // console.log(1111)
        wx.navigateTo({
          url: '../demo2/demo2?id=123'
        })

        // 相当于加上redirect的 navigator
        // wx.redirectTo({
        //   url: '../demo2/demo2'
        // })
    }
})
