---
data: 2024-07-23
关联:
  - "[[设计思想]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364682
title: Spring设计理念
---
## AOP
### 基础概念
AOP，也就是 Aspect-oriented Programming，译为面向切面编程，我们可以简单的把 AOP 理解为贯穿于方法之中，就好比我们今天的主题——日志功能，就是一个典型的案例。
### 简单使用
1）横切关注点，从每个方法中抽取出来的同一类非核心业务。

2）切面（Aspect），对横切关注点进行封装的类，每个关注点体现为一个通知方法；通常使用 @Aspect 注解来定义切面。

3）通知（Advice），切面必须要完成的各个具体工作，比如我们的日志切面需要记录接口调用前后的时长，就需要在调用接口前后记录时间，再取差值。通知的方式有五种：
- @Before：通知方法会在目标方法调用之前执行
- @After：通知方法会在目标方法调用后执行
- @AfterReturning：通知方法会在目标方法返回后执行
- @AfterThrowing：通知方法会在目标方法抛出异常后执行
- @Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法

4）连接点（JoinPoint），通知应用的时机，比如接口方法被调用时就是日志切面的连接点。

5）切点（Pointcut），通知功能被应用的范围，比如本篇日志切面的应用范围是所有 controller 的接口。通常使用 @Pointcut 注解来定义切点表达式。

主要的注解有这几种：

- @Before：通知方法会在目标方法调用之前执行
- @After：通知方法会在目标方法调用后执行
- @AfterReturning：通知方法会在目标方法返回后执行
- @AfterThrowing：通知方法会在目标方法抛出异常后执行
- @Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法
- @Pointcut 注解来定义切点表达式。
- @Aspect-它用于定义一个切面(Aspect)类。切面类包含了一个或多个切入点(Pointcut)以及相关的增强(Advice)方法。

例子如下：
```// 定义切面
@Aspect
public class LoggingAspect {
    // 定义切入点
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void logPointcut() {}

    // 定义前置增强
    @Before("logPointcut()")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("Calling method: " + joinPoint.getSignature().getName());
    }
}

// 目标类
@Service
public class UserService {
    public void createUser(String name) {
        System.out.println("Creating user: " + name);
    }

    public void deleteUser(String name) {
        System.out.println("Deleting user: " + name);
    }
}
```

## IOC
### 基础概念
控制反转就是把创建和管理 bean 的过程转移给了第三方。而这个第三方，就是 Spring IoC Container，对于 IoC 来说，最重要的就是容器。

容器或者说Bean 其实就是包装了的 Object，无论是控制反转还是依赖注入，它们的主语都是 object，而 bean 就是由第三方包装好了的 object（想一下别人送礼物给你的时候都是要包装一下的，自己造的就免了）。

通俗点讲，因为项目中每次创建对象是很麻烦的，所以我们使用 Spring IoC 容器来管理这些对象，需要的时候你就直接用，不用管它是怎么来的、什么时候要销毁，只管用就好了。

### IOC容器
Spring 设计容器使用的是`ApplicationContext`，它是 `BeanFactory` 的子类，更好的补充并实现了 `BeanFactory` 的。

`BeanFactory` 简单粗暴，可以理解为 HashMap：

- Key - bean name
- Value - bean object

但它一般只有 get, put 两个功能，所以称之为“低级容器”。

而 `ApplicationContext` 多了很多功能，因为它继承了多个接口，可称之为“高级容器”。在下文的搭建项目中，我们会使用它。

`ApplicationContext` 的里面有两个具体的实现子类，用来读取配置配件的：

- `ClassPathXmlApplicationContext` - 从 class path 中加载配置文件，更常用一些；
- `FileSystemXmlApplicationContext` - 从本地文件中加载配置文件，不是很常用，如果再到 Linux 环境中，还要改路径，不是很方便。
### 代码实现
我们假定一个在线书店，通过`BookService`获取书籍：

传统代码编写
```
public class BookService {
    private HikariConfig config = new HikariConfig();
    private DataSource dataSource = new HikariDataSource(config);

    public Book getBook(long bookId) {
        try (Connection conn = dataSource.getConnection()) {
            ...
            return book;
        }
    }
}
```

IoC模式下编写
```
public class BookService {
    private DataSource dataSource;

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
```

不直接`new`一个`DataSource`，而是注入一个`DataSource`，这个小小的改动虽然简单，却带来了一系列好处：

1. `BookService`不再关心如何创建`DataSource`，因此，不必编写读取数据库配置之类的代码；
2. `DataSource`实例被注入到`BookService`，同样也可以注入到`UserService`，因此，共享一个组件非常简单；
3. 测试`BookService`更容易，因为注入的是`DataSource`，可以使用内存数据库，而不是真实的MySQL配置。


因为IoC容器要负责实例化所有的组件，因此，有必要告诉容器如何创建组件，以及各组件的依赖关系.

在spring中就是使用的注解来进行配置，这里简单看一下就行，在sping使用中会详细介绍。
```
// UserService Bean
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        userRepository.save(user);
    }
}

// UserRepository Bean
@Repository
public class UserRepository {
    public void save(User user) {
        // 保存用户数据的逻辑
    }
}

// Spring 配置类
@Configuration
@ComponentScan("com.example")
public class AppConfig {
    // 其他 Bean 定义
}

// 使用 UserService
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok(user);
    }
}
```

### 几个关键问题：

**何为控制，控制的是什么？**

答：是 bean 的创建、管理的权利，控制 bean 的整个生命周期。

**何为反转，反转了什么？**

答：把这个权利交给了 Spring 容器，而不是自己去控制，就是反转。由之前的自己主动创建对象，变成现在被动接收别人给我们的对象的过程，这就是反转。

举个生活中的例子，主动投资和被动投资。

自己炒股、选股票的人就是主动投资，主动权掌握在自己的手中；而买基金的人就是被动投资，把主动权交给了基金经理，除非你把这个基金卖了，否则具体选哪些投资产品都是基金经理决定的。

## 参考链接
https://javabetter.cn/springboot/aop-log.html#%E4%B8%80%E3%80%81%E5%85%B3%E4%BA%8E-aop