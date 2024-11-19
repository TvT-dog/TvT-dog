---
data: 2024-08-11
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/基础漏洞]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364760
---
# 基础概念
在部署SOP的情况下，为了实现跨域通信，开发人员必须使用不同的技术来绕过SOP，以便传递敏感信息。这种“绕过”发生了太多次，本身已经成为一个安全问题。因此，为了在不影响应用程序安全状态的前提下实现信息共享，HTML5中引入了跨域资源共享（CORS）这种机制，但这并没有解决所有问题。当人们想偷工减料，或者没有意识到潜在风险而开始使用默认配置或者错误配置的CORS时，就会出现一些问题。
## 错误配置的通配符
```
HTTP/1.0 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```
在这个例子中，头部字段中包含一个通配符（`*`），这意味着任何域都可以访问目标资源。

## 利用错误匹配的不完整域名
```
HTTP/1.0 200 OK
Access-Control-Allow-Origin: requester.com
Access-Control-Allow-Credentials: true

if ($_SERVER['HTTP_HOST'] == '*requester.com')
 {
  //Access data
  else{ // unauthorized access}
}
```

使用如下请求头也可以成功获取到相应的请求。
```
GET /api/userinfo.php
Host: example.com
Connection: close
Origin: attackerrequester.com
```