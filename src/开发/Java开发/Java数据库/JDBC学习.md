---
data: 2024-07-29
关联:
  - "[[Java-SQL注入风险]]"
  - "[[JAVA数据库]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364684
title: JDBC学习
---
## 基础概念

DBC API是一个Java API，可以访问任何类型表列数据，特别是存储在关系数据库中的数据。JDBC代表Java数据库连接。

## 简单使用
```
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        try {
            // 1. 加载驱动程序
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 建立数据库连接
            String url = "jdbc:mysql://localhost:3306/test_db";
            String username = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, username, password);

            // 3. 执行 SQL 语句
            String sql = "SELECT * FROM users";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            // 4. 处理结果集
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }

            // 5. 关闭资源
            rs.close();
            stmt.close();
            conn.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## 预编译的原理

在java中JDBC中，我们写 SQL 语句的时候，有个预处理功能，这个功能一大优势就是能提高执行速度，尤其是多次操作数据库的情况，再一个优势就是预防SQL注入，严格的说，应该是预防绝大多数的SQL注入。

#### 简单使用
如下面的代码
```
import java.sql.*;

public class PreparedStatementExample {
    public static void main(String[] args) {
        try {
            // 1. 加载驱动程序
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 建立数据库连接
            String url = "jdbc:mysql://localhost:3306/test_db";
            String username = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, username, password);

            // 3. 创建预编译语句
            String sql = "SELECT * FROM users WHERE name = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            // 4. 设置参数
            pstmt.setString(1, "John Doe");

            // 5. 执行查询
            ResultSet rs = pstmt.executeQuery();

            // 6. 处理结果集
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }

            // 7. 关闭资源
            rs.close();
            pstmt.close();
            conn.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
```

#### 底层原理
当运行时，JDBC动态地把参数传给PreparedStatement时，即使参数里有敏感字符，如： ' or ' 1' = '1 、updatexml(2,concat(0x7e,(version())),0)等，preparedStatement 会对入参中的关键字进行转义，比如单引号转义成\'，其流程大致如下：

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1722255052379-72cc21d8-b1dc-4d7a-87a0-a10870b7158b.png)