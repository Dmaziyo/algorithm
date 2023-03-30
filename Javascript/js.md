### 目录

- [1. 手写下划线转驼峰命名。](#1-手写下划线转驼峰命名考虑对象的深度递归情况)
- [2. 手写Promise](#2-手写整个promise类要求实现then方法和catch捕获异常)


#### 1. 手写下划线转驼峰命名(考虑对象的深度递归情况)
```js
    //该函数能够将对象的所有key或者字符串转换都转换成camelCase
    function underscore2Camel(target){
        if(target instanceof Array){
            for(let idx in target){
                if(typeof target[idx] ==='object'){
                    underscore2Camel(target[idx]);
                }
                else if(typeof target[idx] ==='string'){
                    target[idx] = underscore2Camel(target[idx]);
                }
            }
        }
        else if(typeof target ==='object'){
            for(let key in target){
                if(typeof target[key] ==='object'){
                    underscore2Camel(target[key])
                }
                else{
                    let newKey = format2Hump(key);
                    if(newKey!==key){
                        target[newKey]=target[key];
                        delete target[key];
                    }
                }
            }
        }
        else if(typeof target ==='string'){
            return format2Hump(target);
        }
    }

    function format2Hump(str){
        const regExp = /\_(\w)/g
        return str.replace(regExp,(_,letter)=>letter.toUpperCase())
    }

```

#### 2. 手写整个Promise类要求实现then方法和catch捕获异常
