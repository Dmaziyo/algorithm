### 目录

- [1. display:none 和 visibility:hidden 的区别](#1-display:none-和-visibility:hidden-的区别)

#### 1. display:none 和 visibility:hidden 的区别

```js
共同点:都会将元素隐藏掉
不同点:
    -display会将元素从render tree 中移除,而visibility:只是隐藏,但是仍占据位置
    -display:none会导致reflow和repaint,而visibility只会导致repaint
    -display:none会使得子元素也从文档流中移除,而visibility:hidden,虽然子元素会默认继承,但是可以手动设置,使得子元素显示
```
