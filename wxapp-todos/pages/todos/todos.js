Page({
  data: {
    // 当可能会发生变化的时候，需要抽象数据模型，方便在页面中调用动态数据
    // 文本框的数据模型
    input: '',
    // 任务清单数据模型
    todos: [
      { name: 'Learning Vue', completed: true },
      { name: 'Learning Angular', completed: false },
      { name: 'Learning React', completed: true }
    ],
    leftCount: 2,
    allCompleted: false
  },
  // 2. 拿到文本框里面的值
  // 2.1. 由于小程序的数据绑定是单向的
  //      必须要给文本注册改变事件，
  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },
  // 1. 先让按钮点击时执行一段代码
  addTodoHandle: function () {
    // 当添加按钮点击事件发生时执行的函数
    if (!this.data.input) return
    var todos = this.data.todos
    todos.push({
      name: this.data.input,
      completed: false
    })
    // 3. 将这个值添加到列表中
    // 必须显式的通过setData去改变数据，这样界面上才会得到变化
    this.setData({
      todos: todos,
      input: '',
      leftCount: this.data.leftCount + 1
    })
  },
  toggleTodoHandle (e) {
    // 切换当前点中的item的完成状态
    // console.log(e.currentTarget)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    // 根据当前任务的完成状态决定增加一个或者减少一个
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    this.setData({ todos: this.data.todos, leftCount: leftCount })
  },
  // 需要注意冒泡的问题
  removeTodoHandle (e) {
    var todos = this.data.todos
    // item 就是splice方法中移除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
    // todos 中会移除掉 index 所指向的元素
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)
    this.setData({ todos: todos, leftCount: leftCount })
  },
  toggleAllHandle () {
    // this 在这里永远指向的是当前页面对象
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    var that = this
    todos.forEach(function (item) {
      item.completed = that.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({ todos: todos, leftCount: leftCount })
  },
  clearHandle () {
    // var todos = []
    // this.data.todos.forEach(function (item) {
    //   if (!item.completed) {
    //     todos.push(item)
    //   }
    // })
    var todos = this.data.todos.filter(function (item) {
      return !item.completed
    })
    // todos => 新的未完成的任务列
    this.setData({ todos: todos })
  }
})

