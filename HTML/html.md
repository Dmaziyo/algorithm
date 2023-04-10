### 目录

- [1. html css 是否区分大小写](#1-html-css-是否区分大小写)
- [2. 如果不添加 DOCTYPE 声明会怎样](#1-如果不添加doctype声明会怎样)

#### 1. html css 是否区分大小写

```js
html的attribute是大小写不敏感的, 但是通常浏览器会将attribute名称统一格式, 一般为lowerCase, 而属性值是区分大小写的
css也是大小写不敏感, 但是通常建议写小写
```

#### 2. 如果不添加 DOCTYPE 声明会怎样

```js
添加DOCTYPE的作用是使浏览器以标准模式渲染页面
如果不添加DOCTYPE, 会导致浏览器以兼容方式或者其他非标准的方式渲染, 可能会导致出现js或css的问题, 布局问题等
```
