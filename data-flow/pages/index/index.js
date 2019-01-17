Page({
    data: {
        demo: 11,
        message: 'initial'
    },
    inputHandle: function (e) {
        // this.data.message = e.detail.value
        // console.log(this.data.message)
        this.setData({
            message: e.detail.value
        })
        console.log(this.data)

        //  this.setData 是用来改变data中的数据 
        // 他与直接赋值区别在于setData可以通知界面做出变化
        // 直接赋值没有办法实现这一点（早期的的JS）
    }
})
