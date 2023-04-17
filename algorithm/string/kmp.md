#### KMP 算法

[如何更好地理解和掌握 KMP 算法?](https://www.zhihu.com/question/21923021/answer/281346746)
[KMP 算法详解](https://zhuanlan.zhihu.com/p/83334559)

```js
作用：在一个字符串str中找到与另一个字符串pat相同的子串
特点：
-与暴力求解不同，kmp会记录之前的信息，跳过一些不必要的操作
例如 a a a c a a a b
     a a a b  //当c与b不匹配的时候，直接跳到c后面开始重新寻找子串
-当前字符不匹配时,将可以利用的后缀当作前缀来使用.再来匹配
    a a a a a a a b    ->  a a a a a a a b
    a a a a b                a a a a b
PMT:value为当前子串中最长相对前后缀的长度
    char   a b a b a b c a
    index  0 1 2 3 4 5 6 7
    value  0 0 1 2 3 4 0 1
```
