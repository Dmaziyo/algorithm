### 目录

- [目录](#目录)
  - [1. display:none 和 visibility:hidden 的区别](#1-displaynone-和-visibilityhidden-的区别)
  - [2. 什么是 scoped?](#2-什么是-scoped)
  - [3. 常见的选择器有哪些?](#3-常见的选择器有哪些)
  - [4. 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的?](#4-介绍一下标准的-css-的盒子模型低版本-ie-的盒子模型有什么不同的)
  - [5. link 和@import 区别?](#5-link-和import-区别)
  - [6. position 有哪些属性](#6-position-有哪些属性)
  - [7. 垂直居中的方法有哪些](#7-垂直居中的方法有哪些)
  - [8. 实现两栏布局和三栏布局](#8-实现两栏布局和三栏布局)
  - [9. rem和em的区别](#9-rem和em的区别)


#### 1. display:none 和 visibility:hidden 的区别

```js
共同点:都会将元素隐藏掉
不同点:
    -display会将元素从render tree 中移除,而visibility:只是隐藏,但是仍占据位置
    -display:none会导致reflow和repaint,而visibility只会导致repaint
    -display:none会使得子元素也从文档流中移除,而visibility:hidden,虽然子元素会默认继承,但是可以手动设置,使得子元素显示
```

#### 2. 什么是 scoped?

[[带你理解 scoped、>>>、/deep/、::v-deep 的原理]](https://juejin.cn/post/7023343999909888037)[[你知道 Vue scoped 原理吗？这波你在第几层？]](https://juejin.cn/post/7098569051860893709)[[样式穿透]](https://juejin.cn/post/7083051766874374174#comment)

```js
review times：√
作用:只会作用于当前组件的样式,使得各组件之间的样式互不影响,实现了样式隔离
实现原理:
    1.组件实例使用scoped的时候,会随机生成一段hash值
    2.给组件内的每一个DOM元素添加属性值data-v-hash <div> --> <div data-v-asdjaskldj="">
    3.在每个style的样式选择器的最后一项添加一个属性选择器 #id > div --> #id > div[data-v-asdjaskdl]

//样式穿透的原理
在scoped中,data-v-hash默认会添加到选择器的最后一个,而使用::v-deep就会将data-v-hash添加到前面一个选择器中
#id > div --> #id[data-v-asdjaskdl] > div
```

#### 3. 常见的选择器有哪些?

```js
- 标签选择器:div
- 类选择器:.className
- id选择器:#id
- 子元素选取:div > li
- 后代选择器:div li
- 属性选择器:div[data-v-hash]
- 伪类选择器:div:hover
- 伪元素选择器:div::before
```

#### 4. 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的?

```js
盒模型一般由content, padding, border, margin组成
W3c标准盒模型: width和height只包含content
IE盒模型: width和height包含content, padding, border
相关属性: box - sizing //默认为content-box(标准盒模型),修改为border-box即为IE盒模型
```

#### 5. link 和@import 区别?

[@import 和 link 引入样式的区别](https://juejin.cn/post/6844903581649207309#heading-0)

```js
1.link是html提供的标签, 可以引入外部资源文件, @import只能导入css文件
2.link引入的资源会在页面渲染之前加载处理,而@import是在页面渲染完后再处理
3.可以通过js操作添加link标签来引入css资源,而@import不可以,因为只存在于css文件中,DOM方法无法操作CSS文件
```

#### 6. position 有哪些属性

[[MDN position]](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

```js
review times：√
- static:元素遵循正常的文本流布局
- relative:元素在layout中的位置仍然是static的位置,但是可以基于自身进行偏移展示
- absolute:元素脱离正常文本流,相对于最近的positioned的元素进行偏移布局展示
- fixed:脱离正常文本流,相对于视图进行偏移布局展示
- sticky:...(先pass)
```

#### 7. 垂直居中的方法有哪些

```js
review times：√
// 方法一
.className{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
}
// 方法二
.className{
    position:absolute;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    margin:auto
}
// 方法三
.className{
    display:flex;
    justify-content:center;
    align-items:center
}
```

#### 8. 实现两栏布局和三栏布局

```js
// 双栏布局：左边一个定宽栏，右边则是自适应的栏
<body>
    <div class="box">
        <div class="left">左边</div>
        <div class="right">右边</div>
    </div>
    内容内容内容
</body>
// review √
// 方法1:因为浮动元素是固定的且不在正常文本流，而同级的元素虽然还在文本流，但是显示的时候会避开浮动元素
.left {
    float: left;
    width: 200px;
    background-color: gray;
    height: 400px;

}
.right {
    margin-left: 210px;
    background-color: lightgray;
    height: 200px;
}
.box{
  // 使用BFC(Block Formatting Context)会将浮动元素也考虑在内
  overflow: hidden;
}
// 方法2:利用flex布局
.left {
    float: left;
    width: 200px;
    background-color: gray;
    height: 400px;

}
.right {
    flex: 1;
    background-color: lightgray;
}
.box{
  display: flex;
  align-items: flex-start //该功能可以使得item的高度自适应
}
// 三栏布局:两边固定,中间自适应
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
// 方法1:使用flex实现
.wrap{
    display:flex;
    justify-content:space-between;
}
.left,.right{
    width:100px;
    height:100px;
    background-color:pink;
}
.middle{
    width: 100%;
    background-color:yellow;
}
// 方法2:使用grid实现
.wrap{
    display:grid;
    grid-template-columns:100px 1fr 100px //fr表示占据剩余空间的比例
}
.left,.right{
    height:100px;
    background-color:pink;
}
.middle{
    background-color:yellow;
}
```

#### 9. rem和em的区别
```
相同点：两个都是css的长度单位，并且都是相对单位，而不是绝对单位。
em:是相对于父元素字体的大小，例如父元素字体大小为14px，那么2em就是24px。
rem(root em):大小是相对于根元素字体的大小。
适用场景：
1.当页面收缩时，文档整个字体都需要缩放时，可以让所有元素的字体都相对于根元素字体大小来进行自适应。
2.em更适用于使某一块区域内的元素相对于父元素动态适配
```