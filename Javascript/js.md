### 目录

- [目录](#目录)
  - [1. 手写下划线转驼峰命名(考虑对象的深度递归情况)](#1-手写下划线转驼峰命名考虑对象的深度递归情况)
  - [2. 手写整个 Promise 类要求实现 then 方法和 catch 捕获异常](#2-手写整个-promise-类要求实现-then-方法和-catch-捕获异常)
  - [3. 实现数据类型检测(包括对象)](#3-实现数据类型检测包括对象)
  - [4. es5 实现继承](#4-es5-实现继承)
  - [5. null 和 undefined 区别](#5-null-和-undefined-区别)
  - [6. 虚拟列表](#6-虚拟列表)
  - [7. 多维数组展开](#7-多维数组展开)
  - [8. 如何实现深克隆和浅克隆](#8-如何实现深克隆和浅克隆)
  - [9. 讲讲什么是原型链](#9-讲讲什么是原型链)
  - [10. 手写 new 操作符](#10-手写-new-操作符)
  - [11. 以数组的形式获取所有标签,且不重复](#11-以数组的形式获取所有标签且不重复)
  - [12. 扩展运算符](#12-扩展运算符)
  - [13. 实现 promise.all，promise.race，promise.any，promise.allSettled](#13-实现-promiseallpromiseracepromiseanypromiseallsettled)
  - [14. proto 和 prototype 的区别](#14-proto-和-prototype-的区别)
  - [15. 箭头函数的特点](#15-箭头函数的特点)
  - [16. 手写 bind call apply 函数](#16-手写-bind-call-apply-函数)
  - [17. 不使用 json.stringify 实现去重数组对象](#17-不使用-jsonstringify-实现去重数组对象)
  - [18. Array 构造函数只有一个参数值时的表现？](#18-array-构造函数只有一个参数值时的表现)
  - [19. ParseInt()和Number的区别](#19-parseint和number的区别)
  - [20. js脚本延迟加载的方式有哪些?](#20-js脚本延迟加载的方式有哪些)
  - [21. javascript规定了几种语言类型](#21-javascript规定了几种语言类型)
  - [22.模拟实现Symbol类型 【模拟实现symbol】](#22模拟实现symbol类型-模拟实现symbol)
  - [23.基本类型对应的内置对象，以及装箱拆箱操作](#23基本类型对应的内置对象以及装箱拆箱操作)

#### 1. 手写下划线转驼峰命名(考虑对象的深度递归情况)

```js
//该函数能够将对象的所有key或者字符串转换都转换成camelCase
function underscore2Camel(target) {
  if (target instanceof Array) {
    for (let idx in target) {
      if (typeof target[idx] === 'object') {
        underscore2Camel(target[idx])
      } else if (typeof target[idx] === 'string') {
        target[idx] = underscore2Camel(target[idx])
      }
    }
  } else if (typeof target === 'object') {
    for (let key in target) {
      if (typeof target[key] === 'object') {
        underscore2Camel(target[key])
      } else {
        let newKey = format2Hump(key)
        if (newKey !== key) {
          target[newKey] = target[key]
          delete target[key]
        }
      }
    }
  } else if (typeof target === 'string') {
    return format2Hump(target)
  }
}

function format2Hump(str) {
  const regExp = /\_(\w)/g
  return str.replace(regExp, (_, letter) => letter.toUpperCase())
}
```

#### 2. 手写整个 Promise 类要求实现 then 方法和 catch 捕获异常

```js
// 传入调用,提供resolve,reject
// then的回调函数在resolve之后执行
// resolve可以解决多层promise;
const PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'

class Commitment {
  constructor(fn) {
    this.val = null
    this.state = PENDING
    this.succeedFns = []
    this.failedFns = []
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(error)
    }
  }

  resolve(val) {
    if (this.state === PENDING) {
      this.val = val
      this.state = FULFILLED
      this.succeedFns.forEach(fn => {
        fn()
      })
    }
  }

  reject(val) {
    if (this.state === PENDING) {
      this.val = val
      debugger
      this.state = REJECTED
      this.failedFns.forEach(fn => {
        fn()
      })
    }
  }

  then(succeedFn, failedFn) {
    let commitment2 = new Commitment((resolve, reject) => {
      let sFnWrapper = () => {
        setTimeout(() => {
          try {
            let result = succeedFn(this.val)
            this.resolvePromise(result, commitment2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      let fFnWrapper = () => {
        setTimeout(() => {
          try {
            let result = failedFn(this.val)
            this.resolvePromise(result, commitment2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === PENDING) {
        this.succeedFns.push(sFnWrapper)
        this.failedFns.push(fFnWrapper)
      } else if (this.state === FULFILLED) {
        sFnWrapper()
      } else if (this.state === REJECTED) {
        fFnWrapper()
      }
    })
    return commitment2
  }

  // 将then中回调函数的返回值赋给then()返回的promise
  resolvePromise(x, commitment2, resolve, reject) {
    if (typeof x === 'object') {
      let then = x.then
      // 默认为promise
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            this.resolvePromise(y, commitment2, resolve, reject)
          },
          y => {
            this.resolvePromise(y, commitment2, resolve, reject)
          }
        )
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  }
}

// testCase
let promise = new Commitment(resolve => {
  resolve(1)
})

promise
  .then(result => {
    console.log(result)
    throw Error('eeeeeeeeee')
  })
  .then(
    () => {},
    () => {
      console.log('报错')
      return new Commitment(resolve => {
        resolve(2)
      })
    }
  )
  .then(result => {
    console.log(result)
  })
```

#### 3. 实现数据类型检测(包括对象)

```js
function getType(data) {
  if (typeof data === 'object') {
    return Object.prototype.toString.call(data).slice(8, -1)
  } else {
    return typeof data
  }
}
```

#### 4. es5 实现继承

```js
// 该方法为寄生式组合继承
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function () {
  debugger
  console.log(this.name)
}

function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade
}
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
let student = new Student('小明', '16', '六年级')
student.sayName()
```

#### 5. null 和 undefined 区别

```js
null的含义是空对象, 用于初始化
undefined表示变量声明了但是未赋值
```

#### 6. 虚拟列表

[「前端进阶」高性能渲染十万条数据(虚拟列表)](https://juejin.cn/post/6844903982742110216)

```js
什么是虚拟列表?
  - 是一种懒加载方式,只对可见区域进行渲染,对不可见区域则进行部分渲染或者不渲染
为什么要使用虚拟列表?
  - 当有大量数据需要被浏览器渲染加载时,采用该方式,可以减少渲染时间,即用户等待时间,提高用户体验
实现方法:
 所需数据:
  - listData:所有数据
  - scrollTop:滚动距离
  - listHeight: listData.length * itemSize   列表总高度(用于支撑滚动)
  - visibleCount:Math.ceil(screenHeight/itemSize) 可显示个数
  - visibleData:listData.slice(Math.floor(scrollTop/itemSize),visibleCount+ Math.floor(scrollTop/itemSize)) 可显示数据
  - startOffset:scrollTop - (scrollTop % itemSize),类似于Math.floor(scrollTop/itemSize)*itemSize
  - screenHeight:可视区域高度              -itemSize:列表每项的长度

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        height: 100%;
        overflow: hidden;
      }
      #app {
        height: 100%;
      }
      .infinite-list-container {
        height: 100%;
        overflow: auto;
        position: relative;
        -webkit-overflow-scrolling: touch;
      }

      .infinite-list {
        /* 使得元素一开始处于最顶端 */
        top: 0px;
        left: 0px;
        right: 0px;
        text-align: center;
        position: absolute;
      }

      .infinite-list-phantom {
        position: absolute;
        width: 100%;
      }
      .infinite-list-item {
        backgroundcolor: 'pink';
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border: 1px solid;
      }
    </style>
  </head>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

  <body>
    <div id="app">
      <div ref="container" class="infinite-list-container" @scroll="scrollEvent">
        <div class="infinite-list-phantom" :style="{height:listHeight}"></div>
        <div class="infinite-list" :style="{transform:transformOffSet}">
          <div class="infinite-list-item" v-for="item in visibleData" :style="{height:`${itemSize}px`}">
            {{item.value}}
          </div>
        </div>
      </div>
    </div>
    <script>
      let vm = new Vue({
        el: '#app',
        data() {
          return {
            listData: [],
            visibleData: [],
            itemSize: 200,
            startOffSet: 0,
            screenHeight: null
          }
        },
        methods: {
          // change the showing data
          scrollEvent(e) {
            let scrollTop = this.$refs.container.scrollTop
            let numberOfItem = Math.floor(scrollTop / this.itemSize)
            this.visibleData = this.listData.slice(numberOfItem, numberOfItem + this.visibleCount)
            this.startOffSet = numberOfItem*this.itemSize
          }
        },
        computed: {
          //用于支撑滚动的高度
          listHeight() {
            return `${this.listData.length * this.itemSize}px`
          },
          //用于实现滚动效果
          transformOffSet() {
            return `translate(0,${this.startOffSet}px)`
          },
          // 可显示个数
          visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize)
          }
        },
        mounted() {
          // initialize the arr
          let arr = []
          for (let i = 0; i < 1000; i++) {
            arr.push({
              value: i
            })
          }
          this.listData = arr
          this.screenHeight = window.screen.height
          debugger
          this.visibleData = this.listData.slice(0, this.visibleCount)
        }
      })
    </script>
  </body>
</html>

```

#### 7. 多维数组展开

[JS：展开多维数组的 10 种方法（可控制深度）](https://www.jianshu.com/p/2c1544ac160b)

```js
// ES2019 新增 Array.prototype.flat(), 使用Array.prototype.flat()
let arr = [1, [2, 3, [4, 5, [6, 7, 8, [9, 10]]]]]
console.log(arr.flat()) //默认只展开一层  [1, 2, 3, [4, 5, [6, 7, 8, [9, 10]]]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// 使用for循环进行递归
let arr = [1, [2, 3, [4, 5, [6, 7, 8, [9, 10]]]]]

function flatByFor(arr, depth) {
  const res = []
  for (let item of arr) {
    Array.isArray(item) && depth > 0 ? res.push(...flatByFor(item, depth - 1)) : res.push(item)
  }
  return res
}
console.log(flatByFor(arr, 1))
```

#### 8. 如何实现深克隆和浅克隆

[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

```js
浅克隆: 创建一个对象的副本, 副本的值都是直接拷贝来的, 值是原始类型就是拷贝原始类型, 是引用类型就直接拷贝引用地址
深克隆: 创建一个完全独立的对象的副本, 但是对于副本的值操作不会影响origin对象
//方法1
// 缺点:只能处理类似json格式的对象
JSON.parse(JSON.stringify())
// 方法2
function clone(target, map = new WeakMap()) {
  // weakMap在对象赋值为null时,不会强制绑定target在map(target,clone)中,会让垃圾回收机制自动清理target
  if (typeof target === 'object') {
    // 判断是数组还是对象
    let targetClone = Array.isArray(target) ? [] : {}
    // 处理循环引用
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, targetClone)
    for (let key in target) {
      // 深层遍历
      targetClone[key] = typeof target[key] === 'object' ? clone(target[key], map) : target[key]
    }
    return targetClone
  } else {
    return target
  }
}
let target = {
  prop1: 'prop1',
  prop2: 'prop2',
  fnProp: function () {
    console.log('abc')
  }
}
target.fnProp()
target.self = target
let target1 = clone(target)
console.log(target.self === target1.self)
target1.fnProp()
```

#### 9. 讲讲什么是原型链

```js
每个构造函数都有个属性prototype, 指向一个对象, 该对象为所有由构造函数产生的实例共享
每一个对象实例都会有一个属性__proto__
该属性指向对象的原型.当在一个对象中访问属性时.如果访问不到.则会通过__proto__去原型对象上去查询.而原型对象又有__proto__
直至查询到该属性或者直到原型链的尽头Object.prototype才结束
// 获取原型的方法
Object.getPrototypeOf()
```

#### 10. 手写 new 操作符

```js
function newSimulator() {
  let args = Array.from(arguments)
  let constructor = args.shift()
  let obj = Object.create(constructor.prototype)
  let result = constructor.apply(obj, args)
  if (typeof result === 'object') return result
  else return obj
}
function Person(age, name) {
  this.age = age
  this.name = name
}
let person = newSimulator(Person, '13', 'Leon')
console.log(person)
```

#### 11. 以数组的形式获取所有标签,且不重复

```js
// 获取到所有的元素,然后用set过滤,最终使用扩展运算符解析成数组
let tagNames = Array.from(document.querySelectorAll('*')).map(item => item.tagName)
let uniqueNames = [...new Set(tagNames)]
console.log(uniqueNames)
```

#### 12. 扩展运算符

```js
// 扩展运算符会将可迭代的,例如数组,string 在函数传参中或数组定义中扩展出预期的位置,并按需填充
function sum(x, y, z) {
  return x + y + z
}

const numbers = [1, 2, 3, 4]
// 因为预期是x,y,z 所以只会扩展三个
console.log(sum(...numbers))
// Expected output: 6

// 在对象定义中,会枚举所有对象的值,并且以键值对的形式添加至正在被创建的对象中
let obj1 = {
  a: '1',
  b: '2'
}
let obj2 = {
  c: '3',
  ...obj1 //枚举所有的值并以键值对的形式添加进去
}
console.log(obj2)
// 在函数参数定义中为剩余语法,会将参数整合为一个数组的形式
var obj1 = { foo: 'bar', x: 42 }
var obj2 = { foo: 'baz', y: 13 }
const merge = (...objects) => ({ ...objects })
```

#### 13. 实现 promise.all，promise.race，promise.any，promise.allSettled

[字节飞书面试——请实现 promise.all](https://juejin.cn/post/7069805387490263047#heading-1)

```js
// promise.all
作用: 将多个异步请求传来的数据按照指定顺序进行处理
功能特点:
      -接收可遍历的promise[数组]，
      -返回一个promise
      -如果所有promises运行成功,将所有的成功结果按照顺序作为数组传给resolve
      -promises中只要有一个失败,就会立刻返回reject,返回第一个reject传的值
// 具体实现
Promise.MyAll = function (arguments) {
  let arr = []
  let cnt = 0;
  return new Promise((resolve, reject) => {
    arguments.forEach((item, index) => {
      Promise.resolve(item).then(result => {
        arr[index] = result;
        cnt++;
        if (cnt === arguments.length) resolve(arr);
      }, reject)
    })
  })
}
// promise.race
功能特点:返回promises中最快响应的值
Promise.MyRace = function(arguments){
  return new Promise((resolve,reject)=>{
    arguments.forEach((promise)=>{
      Promise.resolve(promise).then(resolve,reject)
    })
  })
}
// promise.any
功能特点:与all相反,只要有一个成功就返回,而当所有promises都报错时,返回所有报错集合


// Promise.allSettled ,将所有的promise的结果就集合在一起返回,即将reject和resolve的结果混合在一起
```

#### 14. proto 和 prototype 的区别

[彻底搞懂 Function，Object，proto，prototype 之间的关系](https://juejin.cn/post/6844903930216841230)

```js
 * 除原始数据类型外，js一切皆为对象
 * 对象都有属性__proto__
 * 函数还具有属性prototype
 * 每个函数对象生成时，会同时创建一个Object实例，prototype指向该实例
 * __proto__指向的是构造函数的prototype
 * 函数对象的__proto__指向Function的prototype
 Function.__proto__ === Function.prototype //因为Function本身也是函数，所以__proto__指向构造函数的prototype
 * Object也是个函数，所以Object.__proto__ === Function.prototype
 * Object.prototype是根节点
// instanceOf原理就是判断该构造函数的prototype是否在对象的原型链中
  instanceOf(leftVal,rightVal){
    let leftProto = leftVal.__proto__
    let rightPrototype = rightVal.prototype
    while(true){
      if(leftProto===null)return false

      else if(leftProto===rightPrototype){
          return true
      }
      leftProto = leftProto.__proto__
    }
  }
```

#### 15. 箭头函数的特点

[ES6 系列之箭头函数](https://juejin.cn/post/6844903616231260174#heading-2)

```js
1. 参数不能使用arguments来访问
2. 函数this是通过作用域链的this来确定的
3. 无法使用new关键词调用
4. 箭头函数没有prototype
```

#### 16. 手写 bind call apply 函数

[手撕 call、apply、bind](https://juejin.cn/post/7128233572380442660)

```js
// 核心是将调用函数借用给target对象
Function.prototype.myCall = function (target, ...args) {
  let symbolKey = Symbol()
  target[symbolKey] = this
  target[symbolKey](...args)
  delete target[symbolKey]
}
Function.prototype.apply = function (target, args) {
  let symbolKey = Symbol()
  target[symbolKey] = this
  target[symbolKey](...args)
  delete target[symbolKey]
}

Function.prototype.bind = function (target, ...args) {
  let symbolKey = Symbol()
  target[symbolKey] = this
  return function () {
    target[symbolKey](...args)
  }
}
```

#### 17. 不使用 json.stringify 实现去重数组对象

```js
// 类似于普通去重，建立一个新的数组，存放唯一值，用两层for循环将对象之间进行比较
const arr = [{ a: 2 }, { a: 2 }, { a: 2, b: 1 }, { a: { b: 1, c: { a: 1 } } }, { a: { b: 1, c: { a: 1 } } }]
/**
 * obj1: new
 * obj2: old
 */
function diff(obj1: Object, obj2: Object): boolean {
  debugger
  let keys1 = Object.keys(obj1).sort()
  let keys2 = Object.keys(obj2).sort()
  if (keys1.join() === keys2.join()) {
    for (let key of keys1) {
      let val1 = obj1[key]
      let val2 = obj2[key]
      if (val1 !== val2) {
        if (typeof val1 === 'object' && typeof val2 === 'object') {
          if (!diff(val1, val2)) return false
        } else {
          return false
        }
      }
    }
    return true
  } else {
    return false
  }
}
let result = [arr[0]]
for (let i = 1; i < arr.length; i++) {
  let flag = true
  for (let j = 0; j < result.length; j++) {
    if (diff(arr[i], result[j])) {
      // 相同则不添加至result
      flag = false
      break
    }
  }
  if (flag) result.push(arr[i])
}
console.log(result)
```
#### 18. Array 构造函数只有一个参数值时的表现？
```js
生成的数组的长度为传入参数值
let arr = new Array(5); // 调用 Array() 时可以使用或不使用 new。两者都会创建一个新的 Array 实例。
arr.length === 5 //true
```
#### 19. ParseInt()和Number的区别
```js
parseInt可以解析类似12ad这样的前一段是有效的字符串，即从左向右解析，遇到字符串就停止
而Number只能解析正确的数字字符串
```
#### 20. js脚本延迟加载的方式有哪些?
```js
  defer：异步加载，当文档解析完成后才会正式按照原先定义的顺序执行js文件
  async：异步加载，但是文件一旦加载完成，便会立即执行，同时暂停文档解析
```

#### 21. javascript规定了几种语言类型
```js
 js可以分为原始数据类型和引用数据类型
 原始数据类型：undefined null boolean number string bigInt symbol，原始数据型的值存储在栈中，因为要频繁调用，所以方便在运行时直接找到
 引用数据类型：object array function  ，引用数据类型值存储在堆中，因为如果存储栈中会导致运行速度很慢，在栈中会存储引用数据类型值的地址
Tips:
  原始数据类型在复制的时候会重新开拓一个内存空间赋值，a=10 b=a;这时会在栈中新开拓一个空间进行赋值
  引用数据类型的复制则会将地址进行复制，所以即使开辟了一个新的栈空间，但仍然指向同一个地址
```
#### 22.模拟实现Symbol类型 [【模拟实现symbol】](https://github.com/mqyqingfeng/Blog/issues/87)
```js
概述：Symbol是Es6引入的新的原始数据类型，表示独一无二的值，Symbol是一个函数，可以返回一个独一无二的"值"，而不是对象,不能使用new来创建
手写一个Symbol可以加深Object的descriptor的了解，以及熟悉Object.prototype默认提供的方法
特点：
1.instanceof 结果为false
  let s = Symbol('foo');
  console.log(s instanceof Symbol)//false
2.可以接受字符串或对象，打印的结果类似Symbol(转为字符串的结果)
  const obj={
    toString(){
      return 'abc';
    }
  }
3. 相同参数的symbol返回的值是不相等的
    let s1 = Symbol('1')
    let s2 = Symbol('1')
    s1===s2 //false
    作用：可以作为属性名存在，防止他人修改
    let s = Symbol();
    let a ={};
    Object.defineProperty(a,s,{value:'hello'})
    console.log(a[s])//只有在知道s的情况下才能获取到值

4. Symbol作为属性名，不会出现在for in 中，也不会出现在Object.keys,Object.getOwnPropertyNames(类似于keys)，
 但是可以通过Object.getOwnPropertySymbols获取所有Symbol属性名
6.可以使用Symbol.for来获取以相同传参得到的Symbol
  s1= Symbol.for(1)
  s2= Symbol.for(1)
  s1 === s2 //true
7.使用Symbol.keyFor可以查询一个已经登记(for生成的)Symbol是传入什么参数得到的
  let s1 = Symbol.for(1)
  let key =Symbol.keyFor(s1);
  key === 1 

实现功能  
  var generateName = (function(){
        var postfix = 0;
        return function(descString){
            postfix++;
            return '@@' + descString + '_' + postfix
        }
    })()

  function SymbolPolyFill(description){
    1.不能使用new命令创建,因为new会将this的__proto__指向构造函数的prototype
    if(this instanceof SymbolPolyFill)throw new TypeError('Symbol is not a constructor')


    let descString = description === undefined ? undefined:String(description);
    // 由于为了模仿出[[description]]属性，所以还需要创建一个对象
    // 使得symbol instanceof !== SymbolPolyFill
    let symbol = Object.create({
      2.实现显示打印,打印的时候调用toString方法
      toString:function(){
        // 方案1
        return `Symbol(${descString})`

        // 方案2 避免String相同的情况
        return this.__Name__;
      }
      3.symbol不能与任何其他类型进行运算,因为隐式类型转换会调用ValueOf,但是显示调用又不能报错，所以目前只能这么写
      valueOf:function(){
        return this;
      }
    });
    Object.defineProperties(symbol,{
      '__Description__':{
        value:descString,
          writable:false,
          enumerable:false,
          configurable:false
      },
      3.相同的Symbol函数返回值是不相等的（在不使用for的情况下）,为了防止作为属性重复。所以使用__Name__
      '__Name__':{
        value:descString,
          writable:false,
          enumerable:false,
          configurable:false  
      }
    })
    return symbol
  }
    // 实现函数记忆,当使用for方法的时候，会去寻找是否之前有使用过相同的description创造出的symbol
    let forMap = {}
    Object.defineProperties(SymbolPolyfill,{
      'for':{
        value:function(description){
          let descString = description === undefined?undefined:string(description)
          return forMap[descString]?forMap[descString]:forMap[descString] = SymbolPolyFill(description)
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'keyFor':{
        value：function(symbol){
            for(let key in forMap){
              if(forMap[key]===symbol)return key;
            }
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    })

```
#### 23.基本类型对应的内置对象，以及装箱拆箱操作
```
1. number 对应的是Number
2. boolean 对应的是Boolean
3. string 对应的是String
装箱：在后台创建一个基本类型对应的基本类型包装对象（即上述所述），以此来提供可以调用的方法，但是在方法调用完成之后，会立即销毁该对象，
因此在基本数据类型上添加属性或方法是不会识别到和报错的，因为会添加进去，但是之后会立马被删除
...
```