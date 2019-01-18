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
    }
})
