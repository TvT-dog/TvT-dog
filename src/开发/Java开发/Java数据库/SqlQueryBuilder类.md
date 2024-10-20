---
data: 2024-08-15
关联:
  - "[[JAVA数据库]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364684
title: SqlQueryBuilder类
---
# 基础认知
SqlQueryBuilder 类是一个工具类,用于动态构建 SQL 查询语句。它通常会接受以下参数:

- 表名: 需要构建查询的数据库表的名称。
- 选择列: 在 SELECT 子句中需要选择的列的列表。
- Where 条件: 需要添加到 WHERE 子句中的条件列表。
- 排序列: 用于在 ORDER BY 子句中对结果进行排序的列的列表。
- 限制/偏移: 需要返回的最大行数以及从哪里开始返回。
- Join 条件: 需要添加到 JOIN 子句中的连接条件列表。
- 分组列: 用于在 GROUP BY 子句中对结果进行分组的列的列表。
- Having 条件: 需要添加到 HAVING 子句中的条件列表。
# 简单使用
```
SqlQueryBuilder builder = new SqlQueryBuilder("users")
    .select("id", "name", "email")
    .where("age", ">", 18)
    .orderBy("name", "ASC")
    .limit(10, 0);

String query = builder.build();
// 生成的查询语句为:
// SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10 OFFSET 0
```