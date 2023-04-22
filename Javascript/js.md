### 目录

- [1. 手写下划线转驼峰命名。](#1-手写下划线转驼峰命名考虑对象的深度递归情况)
- [2. 手写 Promise](#2-手写整个-promise-类要求实现-then-方法和-catch-捕获异常)
- [3. 实现数据类型检测(包括对象)](#3-实现数据类型检测包括对象)
- [4. ES5 实现继承](#4-es5实现继承)
- [5. null 和 undefined 区别](#5-null-和-undefined-区别)
- [6. 虚拟列表](#6-虚拟列表)
- [7. 多维数组展开](#7-多维数组展开)
- [8.如何实现深克隆和浅克隆](#8-如何实现深克隆和浅克隆)
- [9.讲讲什么是原型链](#9-讲讲什么是原型链)
- [10.手写 new 操作符](#10-手写-new-操作符)
- [11.以数组的形式获取所有标签,且不重复](#11-以数组的形式获取所有标签且不重复)
- [12.扩展运算符](#12-扩展运算符)
- [13.实现 promise.all，promise.race，promise.any，promise.allSettled](#13-实现-promiseallpromiseracepromiseanypromiseallsettled)
- [14.proto 和 prototype 的区别](#14-proto-和-prototype-的区别)

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

#### 14.proto 和 prototype 的区别

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
