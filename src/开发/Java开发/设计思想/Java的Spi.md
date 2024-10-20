---
data: 2024-08-05
关联:
  - "[[设计思想]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364680
title: Java的Spi
---
# 什么是SPI？
SPI 全称:Service Provider Interface，是Java提供的一套用来被第三方实现或者扩展的接口，它可以用来启用框架扩展和替换组件。

面向的对象的设计里，我们一般推荐模块之间基于接口编程，模块之间不对实现类进行硬编码。一旦代码里涉及具体的实现类，就违反了可拔插的原则，如果需要替换一种实现，就需要修改代码。

为了实现在模块装配的时候不用在程序里动态指明，这就需要一种服务发现机制。java spi就是提供这样的一个机制：为某个接口寻找服务实现的机制。这有点类似IOC的思想，将装配的控制权移到了程序之外。

# SPI 案例实现
假设我们有一个日志记录系统,需要支持不同的日志实现。使用 Java SPI，我们可以将日志记录器的实现与应用程序解耦,实现更好的灵活性和可扩展性。
```
// Logger.java
public interface Logger {
    void log(String message);
}
```
然后,我们实现几个具体的日志记录器:
```
// ConsoleLogger.java
public class ConsoleLogger implements Logger {
    public void log(String message) {
        System.out.println(message);
    }
}

// FileLogger.java
public class FileLogger implements Logger {
    public void log(String message) {
        // 将消息写入文件
    }
}

// DatabaseLogger.java
public class DatabaseLogger implements Logger {
    public void log(String message) {
        // 将消息写入数据库
    }
}
```

接下来,我们在 META-INF/services 目录下创建一个名为 com.example.Logger的文件,并在其中列出所有的日志记录器实现类:
```
com.example.ConsoleLogger
com.example.FileLogger
com.example.DatabaseLogger
```

最后,在应用程序中使用 ServiceLoader来动态加载和使用这些日志记录器:
```
// Application.java
import java.util.ServiceLoader;

public class Application {
    public static void main(String[] args) {
        ServiceLoader<Logger> loader = ServiceLoader.load(Logger.class);
        for (Logger logger : loader) {
            logger.log("This is a log message.");
        }
    }
}
```
# 参考文档
https://www.cnblogs.com/better-farther-world2099/articles/17092783.html