---
data: 2024-09-19
关联:
  - "[[知识/知识笔记/开发/SQL学习/SQL学习|SQL学习]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18421276
---
# 前置知识
默认你已经掌握了基础的SQL使用，本文为复杂SQL查询编写。
## 需求场景
### 限制条数
限制结果为 10 条
```
SELECT * FROM table_name
LIMIT 10;
```
跳过前 5 条，返回接下来的 10 条
```
SELECT * FROM table_name LIMIT 5,10;
```
### 添加条件
#### 基本格式
```
SELECT <列名>
  FROM <表名>
 WHERE <条件表达式>;
```
#### 条件表达式
##### 基本表达式
```
SELECT * 
FROM table_name 
WHERE column_name = 'value';//等于

SELECT * 
FROM table_name 
WHERE column_name <> 'value';//不等于
```
##### 多重逻辑
```
SELECT * 
FROM table_name 
WHERE column1 = 'value1' AND column2 = 'value2'; //且

SELECT * 
FROM table_name 
WHERE column1 = 'value1' OR column2 = 'value2';//或

SELECT * 
FROM table_name 
WHERE NOT column_name = 'value';//非
```
##### 范围条件
```
SELECT *
FROM products
WHERE price BETWEEN 10 AND 50;//在10和50之间


SELECT * 
FROM table_name 
WHERE column_name IN ('value1', 'value2', 'value3');//在这个三个数之间
```
##### 模糊匹配
```
SELECT * 
FROM table_name 
WHERE column_name LIKE '%pattern%'; //包含 'pattern'


SELECT * 
FROM table_name 
WHERE column_name LIKE '%suffix';  //以 'suffix' 结尾
```
##### NULL 值检查
```
SELECT * 
FROM table_name 
WHERE column_name IS NULL;
```
### 处理结果
#### 行处理
即改变行的数量
##### 切分
即将一个大表，按照一个字段分为几个小表。
```
SELECT product_type, COUNT(*)
  FROM product
 GROUP BY product_type;// 按照商品种类统计数据行数
```
##### 聚合
即配合上文的切分，组合特定的几个小表结果
```
SELECT department, COUNT(*) AS employee_count
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING COUNT(*) > 5;//计算每个部门的员工数量，但只考虑工资大于 50000 的员工，并只返回员工数量超过 5 的部门
```
这里先使用GROUP BY 按照部门进行切分，在使用HAVING组合出员工数量大于5的部门
##### 排序
```
SELECT name, salary
FROM employees
ORDER BY salary ASC (DESC);//按照工资从低到高排序(高到低)。
```
##### 集合运算
```
SELECT name FROM employees
UNION
SELECT name FROM contractors;//并集

SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;//不去重
```
#### 列处理
即改变列的数量
##### 内连结
```
SELECT customers.customer_name, orders.order_id
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;//重
```
这里的
```
FROM customers
INNER JOIN orders
```
说明了表，然后
```
ON customers.customer_id = orders.customer_id;
```
配置了合并条件
##### 外连结
内连结会丢弃两张表中不满足 ON 条件的行，和内连结相对的就是外连结。外连结会根据外连结的种类有选择地保留无法匹配到的行。

外连结有三种形式：
- 左连结会保存左表中无法按照 ON 子句匹配到的行，此时对应右表的行均为缺失值；
- 右连结则会保存右表中无法按照 ON 子句匹配到的行，此时对应左表的行均为缺失值；
- 而全外连结则会同时保存两个表中无法按照 ON子句匹配到的行，相应的另一张表中的行用缺失值填充。
```
SELECT customers.customer_name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;


SELECT customers.customer_name, orders.order_id
FROM customers
RIGHT JOIN orders ON customers.customer_id = orders.customer_id;

SELECT customers.customer_name, orders.order_id
FROM customers
FULL OUTER JOIN orders ON customers.customer_id = orders.customer_id;
```