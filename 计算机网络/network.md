## 计算机网络 面试知识点总结

### 目录

- [1. 设置了强制缓存后,如何更新资源](#1-设置了强制缓存后如何更新资源)
- [2. 从输入 url 到浏览器出现画面的过程](#2-从输入-url-到浏览器出现画面的过程)
- [3. csrf 攻击](#3-csrf-攻击)
- [4. 什么是浏览器的同源策略,如何处理](#4-什么是浏览器的同源策略如何处理)

#### 1. 设置了强制缓存后,如何更新资源

```js
    强制缓存的expires 或者 Cache-Control 中设置的时间过期后,才会去更新资源
```

#### 2. 从输入 url 到浏览器出现画面的过程

[[键入网址到网页显示，期间发生了什么?]](https://xiaolincoding.com/network/1_base/what_happen_url.html)[[你不知道的浏览器页面渲染机制]](https://juejin.cn/post/6844903815758479374#heading-9)

```js
    1.浏览器首先解析url,确定服务器和资源路径,生成发送给服务器的请求报文
    2.通过DNS查询服务器域名对应的真实ip地址
    3.与服务器建立TCP连接,利用TCP/IP协议栈将数据包发送至服务器
    4.服务器接收到请求报文后,将响应报文发送至客户端
    5.浏览器将响应报文进行解析,将HTML生成DOM tree,CSS 解析成 css rule tree,用于将样式匹配到对应元素上去
    6.DOM tree 和 CSS rule tree 会组合在一起形成render tree,里面只包含了要显示的元素,而display:none这样的不会出现在render tree中
    7.浏览器根据render tree 计算出大致的layout,然后再将layout实际渲染出来
```

#### 3. csrf 攻击

[前端安全系列之二：如何防止 CSRF 攻击?](https://juejin.cn/post/6844903689702866952#heading-5)

```js
    CSRF(cross site request forgery):利用用户本地存储的验证信息,来绕过被攻击者网站的验证,进行相应的攻击操作
    流程:
        1.用户登录被攻击网站,存储了登录验证信息(cookie)
        2.hacker引诱用户在不知觉的情况下访问被攻击网站(通过第三方网站或者图片链接)
        3.被攻击者网站验证身份通过,执行对应操作
        4.最终hacker冒充用户在被攻击网站执行了操作
    实现方式:img跨域加载请求,form提交,超链接
    防护策略:
        - 同源策略:在访问url时,验证访问的来源,利用origin或者referer
        - 利用token来进行用户的验证(每次请求时需要附带一个token,而token放在攻击者无法获取的位置)
```

#### 4. 什么是浏览器的同源策略,如何处理

[浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

```js
在协议 + 域名 + 端口号不同的情况下, 浏览器会对js进行一些限制
- js不能访问其他域名下的cookie，localStorage，indexDB．
- ajax请求只能发给同源地址.
// 规避同源机制的方法
- 使用代理服务器，因为服务器之前的请求没有同源策略
- JSONP 只支持get请求
- CORS  现代浏览器在请求时会在请求头添加origin,让服务器进行判断是否能够返回数据
```
