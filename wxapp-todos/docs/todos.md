#微信小程序TODOS

项目地址[微信小程序TODOS案例]()

主要锻炼微信小程序数据绑定逻辑

页面结构和样式可以直接使用`TODOMVC`中的页面和样式，专注于逻辑

##抽象数据模型

当数据可能会发生变化的时候，需要抽象数据模型，方便在页面中调用动态数据

```javascript
// todos.js
Page({
    data: {
        // 文本框的数据模型
        input: '',
        // 任务清单数据模型
        todos: [
          { name: 'Learning Vue', completed: true },
          { name: 'Learning Angular', completed: false },
          { name: 'Learning React', completed: true }
        ],
    }
})
```

##页面数据绑定

将逻辑中的动态数据绑定到页面中去

###逻辑

这些和`art-template`数据绑定语法差不多，用的`{{}}`，前面也都说过

1. 用`wx:for、wx:key`等进行数据的绑定
2. 用`wx:if、wx:elif、wx:else`判断是否该显示该模块
3. 通过事件传递机制进行双向数据绑定，主要依赖`setData`
   1. 由于微信小程序默认只有单向数据流，所以需要通过给文本框绑定`change`事件，当触发`change`事件的时候，调用一个事件处理函数`inputChangeHandle(e)`当然这函数名随意写，提现含义就好，并绑定一个`confirm`用户点击添加完成事件，事件处理函数`addTodoHandle`
   2. 取值：`e.detail.value`
   3. 赋值：严格来说不能是赋值，应该是设置数据，保证双向数据绑定，同步更新，`this.setData({ input: e.detail.value })`,这里的`input`是保存在`data`中的
   4. 拿值：`this.data.input`
   5. 添加到列表：`this.data.todos.push({ name: this.data.input, complated: false }); this.setData({ todos: this.data.input, input: '' })`,注意这里是必须要使用`setData`去设置下的，保证页面数据及时的同步更新
   6. 小bug：假如没有输入文本的时候，依然可以添加，这时候添加的为空，所以应该让没有输入的时候，不能添加，此时更改下添加逻辑就好了`if(!this.data.input) return`

###代码

```xml
// todos.wxml
<view class="container">
  <view class="header">
    <image src="../../images/plus.png" bindtap="addTodoHandle"></image>
    <input type="text" placeholder="Anything here..." value="{{ input }}" bindinput="inputChangeHandle" bindconfirm="addTodoHandle"/>
  </view>
  <block wx:if="{{ todos.length }}">
    <view class="todos">
      <view class="item{{ item.completed ? ' completed' : '' }}" wx:for="{{ todos }}" wx:key="{{ index }}">
        <icon type="{{ item.completed ? 'success' : 'circle' }}"/>
        <text>{{ item.name }}</text>
      </view>
    </view>
    <view class="footer">
      <text>Toggle all</text>
      <text>{{ leftCount }} {{ leftCount > 1 ? 'items' : 'item' }} left</text>
      <text>Clear completed</text>
    </view>
  </block>
  <view>
    <text>null</text>
  </view>
</view>

```

```css
.container {
  border-top: 1rpx solid #e0e0e0;
}

.header {
  display: flex;
  align-items: center;
  margin: 20rpx;
  padding: 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 5rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
}

.header image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.todos {
  margin: 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 5rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
}

.todos .item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #e0e0e0;
}

.todos .item:last-child {
  border-bottom: 0;
}

.todos .item text {
  flex: 1;
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #444;
}

.todos .item.completed text {
  color: #888;
  text-decoration: line-through;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  font-size: 30rpx;
  color: #333;
}

```

```javascript
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
  },
  // 2. 拿到文本框里面的值
  // 2.1. 由于小程序的数据绑定是单向的
  //      必须要给文本注册改变事件，
  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },
  // 1. 先让按钮点击时执行一段代码
  addTodoHandle: function () {
    // 当添加按钮点击手机上的完成按钮事件发生时执行的函数
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
      
    })
  },
})


```

##任务完成状态切换

点击实现切换`complated`状态

###逻辑

1. 给完成状态绑定`tap`事件,事件处理函数为`toggleTodoHandle`
2. 书写事件处理函数`toggleTodoHandle`
   1. 切换当前点中的`item`完成状态，这时候通过自定义属性`data-index={{index}}`去传参，拿到当前点击的元素`item`的事件源对象`e.currentTarget`
   2. 拿到当前元素：`var item = this.data.todos[e.currentTarget.dataset.index]`
   3. 给完成状态取非实现切换状态`item.complated = !item.complated`
   4. 同步到界面列表，`this.setDta({ todos: this.data.todos })`

###代码

```xml
<view class="container">
  ...
  <block wx:if="{{ todos.length }}">
    <view class="todos">
      <view class="item{{ item.completed ? ' completed' : '' }}" wx:for="{{ todos }}" wx:key="{{ index }}" bindtap="toggleTodoHandle" data-index="{{ index }}">
    ...
</view>

```

```javascript
Page({
  data: {
    input: '',
    todos: [
      ...
    ],
    allCompleted: false
  },
 	...
  toggleTodoHandle (e) {
    // 切换当前点中的item的完成状态
    // console.log(e.currentTarget)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    // 根据当前任务的完成状态决定增加一个或者减少一个
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    this.setData({ todos: this.data.todos, leftCount: leftCount })
  },
  ...
})


```

##剩余任务数量展示

当前任务列表当中所有未完成任务的总和和选择切换

###逻辑

1. 抽象数据模型到`data`，`leftCount: 2` 默认值先给2，去页面渲染下`{{leftCount}}{{leftCount > 1 ? 'items' : 'item'}}left`，看看能不能呈现成功，成功之后进行下一步
2. `wx:if='{{leftCount}}'`控制该模块显示或者隐藏
3. 在添加逻辑上当添加数据并设置`setData`数据的时候，增加一个键值对`leftCount: this.data.leftCount + 1`
4. 切换逻辑
   1. 计算当前`leftCount`值，取决于切换之后当前的`complated`的值
   2. `var leftCount = this.data.leftCount + (item.complated ? -1 : 1)`
   3. 设置回页面`this.setDta({... , leftCount: leftCount})`

###代码

```xml
<text wx:if="{{ leftCount }}">{{ leftCount }} {{ leftCount > 1 ? 'items' : 'item' }} left</text>
```

```javascript
Page({
    data: {
        input: '',
        todos: [
            ...
        ],
        leftCount: 2,
        ...
    },
    addTodoHandle: function () {
        ...
        this.setData({
          ...
          leftCount: this.data.leftCount + 1
    	})
   },
})
```

##删除任务

点击`X`实现删除对应项的任务

###逻辑

1. 给删除按钮绑定`tap`事件，事件处理函数为`removeTodoHandle`
2. 书写`removeTodoHandle`事件处理函数
   1. 通过自定义属性`data-index = {{ index }}`拿到当前点击任务项的索引，根据索引进行删除
   2. 拿到`todos`,`var todos = this.data.todos`
   3. 根据下标删除当前项`todos.splice(e.currentTarget.dataset.idnex, 1)[0]`
   4. 设置回列表`this.setData({ todos: todos })`
   5. **注意：事件冒泡**由于删除按钮的父元素绑定了一个`toggleTodoHandle`，这样会导致删除按钮任务项之后，其他任务项的完成状态会发生切换，所以当触发`removeTodoHandle`的时候并不想去触发`toggleTodoHandle`，所以这时候绑定事件，应该阻止冒泡，用`catchtap`去绑定
   6. 当任务删除，将剩余任务数量改变一下，当然依然是看`complated`来决定加一还是减一`var leftCount = this.data.leftCount - (item.completed ? 0 : 1)`
   7. 将`leftCount`设置回列表`this.setData({ todos: todos, leftCount: leftCount })`

###代码

```xml
<icon type="clear" size="16" catchtap="removeTodoHandle" data-index="{{ index }}"/>
```

```javascript
  removeTodoHandle (e) {
    var todos = this.data.todos
    // item 就是splice方法中移除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
    // todos 中会移除掉 index 所指向的元素
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)
    this.setData({ todos: todos, leftCount: leftCount })
  },
```

##全选切换

点击全选按钮，切换所有任务完成状态

###逻辑

1. **抽象数据模型：**在`data`中抽象一个全部完成状态的数据模型`allCompleted: false`，默认为false
2. 绑定事件`<text bindtap="toggleAllHandle">Toggle all</text>`
3. 书写事件处理函数
   1. 当用户点击的时候，给`allCompleted`取非`this.data.allCompleted = !this.data.allCompleted`
   2. 拿到当前`todos`，`var todos = this.data.todos`
   3. 循环遍历每一项，循环遍历之前，需要先保存当前`this`的值，这里的`this`永远指向当前的页面对象，防止下面`this`指向改变发生错误，`var that = this`
   4. 将每一项`complated`属性设置为`allCompalted`的值`todos.forEach(function (item) {item.completed = that.data.allCompleted})`
   5. 重新设置剩余任务数量`var leftCount = this.data.allCompleted ? 0 : this.data.todos.length`
   6. 将数据设置回页面列表`this.setData({ todos: todos, leftCount: leftCount })`

###代码

```xml
<text bindtap="toggleAllHandle">Toggle all</text>
```



```javascript
Page({
    data: {
        ...
        allComplated: false,
        ...
    },
    ...
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
})
```

##清空任务项

点击`Clear completed`按钮，清空列表

###逻辑

1. 绑定事件`<text bindtap="clearHandle">Clear completed</text>`
2. 书写事件处理函数
   1. 给所有状态取非
      1. `filter`过滤逻辑根据function，返回的为`true`则满足，为`false`则不满足
      2. 所以当`!complated`的时候刚好满足要求
   2. 给页面设置更新的数据

###代码

```javascript
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
```

##小优化

1. 当用户清空列表或者没有任务项的时候，不渲染，启用`<block></block>`元素，并配合`wx:if`和`wx:else`选择性的渲染页面，提高页面性能

```xml
<view class="container">
    ...
  <block wx:if="{{ todos.length }}">
      ...
  </block>
  <view wx:else>
    <text>null</text>
  </view>
</view>
```

1. 数据持久化可以借助`wx.setStorage`等`API`进行本地化数据存储，从而完成数据持久化

##真机演示

1. 找到微信开发者工具上方的工具栏中有`真机调试`，之后弹出一个二维码，微信扫描二维码可以真机调试

   