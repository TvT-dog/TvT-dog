---
title: CSRF面试篇
data: 2024-10-27
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/CSRF/CSRF|CSRF]]"
---
## CSRF如何防御

### 源站检查
检查Origin Header和Referer Header的值。适合于可以存在梳理出域名服务,同时配置相对简单，适合存量业务员的修复。
### CSRF_TOKEN
即服务端生成一个随机的 CSRF Token,然后进行返回在对应前端页面中。使用请求时，会带上这个cookie进行请求。有时为了减少服务端压力，也可以使用cookie，要求添加在url请求中。
### 先进方案
使用Samesite Cookie属性,Samesite=Strict 为任意不是同源的请求都不回加上cookie。Samesite=Lax为链接跳转会加上，但是异步请求不会。
## 跨域请求中的源和对应的限制

同源即协议相同,端口相同,域名相同。

同源策略会限制不同源的,dom请求,读取cookie等。其中要注意的是ajx请求可以发出，只是无法响应读取。http请求就只可以发出get请求，也可以加载静态资源等,如:html,css,js.

同时服务器也可以设置CORS来取消是否进行同源限制，或者利用可以加载不用源js的原理，使用jsonp技术。
