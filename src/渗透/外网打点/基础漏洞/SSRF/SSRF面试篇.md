---
title: SSRF面试篇
data: 2024-10-27
---
## 什么是SSRF
即服务器存在一个向其他服务器获取资源等能力，就可以通过这个功能去访问内网等资源，从而实现突破网络隔离限制。
## SSRF中常使用的协议
```
dict协议,file协议,http协议,gopher协议等
```
## 怎么去防御

内网使用白名单进行域名检查，外网使用隔离代理。并限制协议,统一错误信息，添加一些过滤函数等，检查是否为预期返回用户的信息。