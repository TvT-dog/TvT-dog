---
data: 2024-07-22
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364683
title: JAVA数据库
---
## 基础概念
### ORM 框架
- ORM 框架是一种技术,用于在面向对象的编程语言(如 Java)和关系型数据库之间建立映射关系。
- ORM 框架允许开发者使用面向对象的方式操作数据库,而不需要直接编写 SQL 语句。
### JPA
- JPA 是一种 Java 持久化 API 规范,定义了一套标准的 Java 持久化 API。
- JPA 规范为 ORM 框架提供了统一的接口和抽象层,使得开发者可以在不同的 ORM 框架之间轻松切换。

JPA 的提出主要是为了整合市面上已有的 ORM 框架，比如说 Hibernate、EclipseLink 等。官方觉得你们搞框架可以，但不要乱搞，得按照我的标准来。

## 常见框架
### JDBC
JDBC (Java Database Connectivity) 是 Java 编程语言中用于访问和操作数据库的标准 API。它提供了一组 Java 类和接口,使得 Java 程序可以以统一的方式连接、查询和更新各种关系型数据库。

```
// 1. 加载驱动程序
Class.forName("com.mysql.cj.jdbc.Driver");

// 2. 获取数据库连接
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/test", "username", "password");

// 3. 创建 Statement 对象
Statement stmt = conn.createStatement();

// 4. 执行 SQL 语句并获取结果集
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// 5. 处理结果集
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    System.out.println("ID: " + id + ", Name: " + name);
}

// 6. 关闭资源
rs.close();
stmt.close();
conn.close();
```

### MyBatis
- MyBatis 是一个持久层框架,建立在JDBC之上,用于简化数据库操作。
- MyBatis 通过XML或注解的方式配置SQL语句和结果映射,大幅减少了JDBC样板代码的编写。
- MyBatis 提供了灵活的SQL语句编写和结果集映射功能,适合对性能要求较高的场景。
首先,我们定义 User 实体类:

```
public class User {
    private int id;
    private String name;
    private String email;
    
    // getters and setters
}
```

然后,我们创建一个 UserMapper 接口,定义操作数据库的方法:
```
public interface UserMapper {
    List<User> getAllUsers();
    User getUserById(int id);
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
}
```

接下来,我们在 `resources/mapper/UserMapper.xml` 文件中定义 SQL 语句:
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.UserMapper">
    <select id="getAllUsers" resultType="com.example.demo.entity.User">
        SELECT * FROM user
    </select>
    
    <select id="getUserById" parameterType="int" resultType="com.example.demo.entity.User">
        SELECT * FROM user WHERE id = #{id}
    </select>
    
    <insert id="insertUser" parameterType="com.example.demo.entity.User">
        INSERT INTO user (name, email) VALUES (#{name}, #{email})
    </insert>
    
    <update id="updateUser" parameterType="com.example.demo.entity.User">
        UPDATE user SET name = #{name}, email = #{email} WHERE id = #{id}
    </update>
    
    <delete id="deleteUser" parameterType="int">
        DELETE FROM user WHERE id = #{id}
    </delete>
</mapper>
```

最后,我们在应用程序中使用 MyBatis 执行 CRUD 操作:
```
// 创建 SqlSessionFactory
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder()
        .build(Resources.getResourceAsStream("mybatis-config.xml"));

// 获取 SqlSession
try (SqlSession session = sqlSessionFactory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);
    
    // 查询所有用户
    List<User> users = mapper.getAllUsers();
    
    // 根据 ID 查询用户
    User user = mapper.getUserById(1);
    
    // 插入用户
    User newUser = new User("John Doe", "john.doe@example.com");
    mapper.insertUser(newUser);
    session.commit();
    
    // 更新用户
    user.setName("Jane Doe");
    mapper.updateUser(user);
    session.commit();
    
    // 删除用户
    mapper.deleteUser(user.getId());
    session.commit();
}
```

这就是 MyBatis 的基本使用方式。MyBatis 提供了更多高级特性,如动态 SQL、分页、缓存等,可以根据实际需求进一步探索。

### Spring Data JPA
   Spring Data JPA 是 Spring 提出的，它增加了一个抽象层，用来屏蔽不同 ORM 的框架差异。通常Spring Data JPA 底层的 ORM 框架是 Hibernate。
我们定义 User 实体类:

```
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Getters, setters, and constructors
}
```

在Spring Data JPA中，只需要编写这样的接口就可实现数据访问。不再像我们以往编写了接口时候还需要自己编写接口实现类，直接减少了我们的文件清单。

同时Spring-data-jpa还有一大特性就是通过解析方法名创建查询。

接下来,我们创建一个 UserRepository 接口,该接口继承自 JpaRepository 接口:
```
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

在上例中，我们可以看到函数：

-  findByEmail(String email);

实现了按email查询User实体.现在,我们可以在应用程序中使用 UserRepository 执行 CRUD 操作:

```
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init() {
        // Create a new user
        User user = new User("John Doe", "john.doe@example.com");
        userRepository.save(user);

        // Find a user by email
        Optional<User> optionalUser = userRepository.findByEmail("john.doe@example.com");
        optionalUser.ifPresent(System.out::println);

        // Update the user
        user.setName("Jane Doe");
        userRepository.save(user);

        // Delete the user
        userRepository.delete(user);
    }
}
```

## 参考链接
https://javabetter.cn/springboot/jpa.html#spring-boot-%E6%95%B4%E5%90%88-spring-data-jpa