---
data: 2024-07-29
关联:
  - "[[设计思想]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364681
title: Java数据库框架设计
---
# 什么是 ORM？
ORM（Object-Relational Mapping） 表示对象关系映射。

在面向对象的软件开发中，通过ORM，就可以把对象映射到关系型数据库中。只要有一套程序能够做到建立对象与数据库的关联，操作对象就可以直接操作数据库数据，就可以说这套程序实现了ORM对象关系映射

简单的说：ORM就是建立实体类和数据库表之间的关系，从而达到操作实体类就相当于操作数据库表的目的。

## 代码体现
具体到代码就是我们在使用各种框架的时候，我们创建的对应实体类。

```
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    // Getters, setters, and other methods
}
```

# 参考链接

原文链接：https://blog.csdn.net/nanhuaibeian/article/details/107238859