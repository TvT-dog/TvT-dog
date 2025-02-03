---
data: 2024-07-29
关联:
  - "[[Java开发]]"
  - "[[Java-SQL注入风险]]"
title: Mybatis学习
---
## 基本介绍
ORM 框架的本质是简化操作数据库的编码工作，常用的框架有两个，一个是可以灵活执行动态 SQL 的 MyBatis；一个是崇尚不用写 SQL 的 Hibernate。前者互联网行业用的多，后者传统行业用的多。

Hibernate 的特点是所有的 SQL 通过 Java 代码生成，发展到最顶端的就是 Spring Data JPA，基本上根据方法名就可以生成对应的 SQL 了。

MyBatis 早些时候用起来比较繁琐，需要各种配置文件，需要实体类和 DAO 的映射关联，经过不断地演化和改进，可以通过 [generator](https://javabetter.cn/kaiyuan/auto-generator.html) 自动生成实体类、配置文件和 DAO 层代码，简化了不少开发工作。
## 简单使用
准备一个实体类用来映射数据库中的表
```
public class Employee {

    private Integer empId;
    private String empName;
    private Double empSalary;

    public Integer getEmpId() {
        return empId;
    }

    public String getEmpName() {
        return empName;
    }

    public Double getEmpSalary() {
        return empSalary;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public void setEmpSalary(Double empSalary) {
        this.empSalary = empSalary;
    }
}
```
准备 Mapper 接口和 MapperXML 文件.
```
public interface EmployeeMapper {

    // 根据 ID 查询员工信息
    Employee queryById(Integer id);

    int deleteById(Integer id);

}
```
对应的一个xml语句```
```
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<!-- namespace 填写对应接口的全限定符 -->
<mapper namespace="org.alen.mapper.EmployeeMapper">

    <!-- 声明式标签写 SQL， 每个标签代表方法的一个实现 mapper 接口不能重载-->
    <select id="queryById" resultType="org.alen.pojo.Employee">
        select emp_id empId , emp_name empName, emp_salary empSalary from emp where emp_id = #{id}
    </select>

    <delete id="deleteById">
        delete from emp where emp_id = #{id}
    </delete>

</mapper>
```

配置数据库连接信息
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>

            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>

        </environment>
    </environments>
    <mappers>
        <mapper resource="mappers/mybatis-config.xml"/>
    </mappers>
</configuration>
```
业务调用
```
public class MybatisTest {

    // 通过 mybatis 的 api 进行调用
    @Test
    public void test_01() throws IOException {

        // 1. 读取外部配置文件
        InputStream ips = Resources.getResourceAsStream("mybatis-config.xml");

        // 2. 创建 sqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(ips);

        // 3. 根据 sqlSessionFactory 创建 sqlSession 用完就释放
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 4. 获取接口的代理对象
        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
        Employee employee = mapper.queryById(1);
        System.out.println("employee = " + employee);

        // 5. 提交事务 释放资源
        sqlSession.commit();
        sqlSession.close();

    }
}

```

## 预编译使用

```
 <!--
        #{key} 占位符 + 赋值，相当于 emp_id = ? ? = 赋值
        ${key} 字符串拼接 ， 相当于 "emp_id = " + id

        推荐使用#{key}的方式，因为可以防止注入攻击的问题

        但是如果面对列名也是动态的情况，则只能使用 $ 符号，例如 ${columnName} = ${columnValue}
    -->
```

## 参考文章
https://javabetter.cn/springboot/mybatis.html#%E6%9E%81%E7%AE%80-xml-%E7%89%88%E6%9C%AC
https://www.wylunpro.top/index.php/archives/115/