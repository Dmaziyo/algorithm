### 目录

- [1. 手写下划线转驼峰命名。](#1-手写下划线转驼峰命名考虑对象的深度递归情况)
- [2. 手写 Promise](#2-手写整个-promise-类要求实现-then-方法和-catch-捕获异常)

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
