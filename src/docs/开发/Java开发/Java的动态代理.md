---
data: 2024-08-05
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364748

---
# 代理模式
代理模式给某一个(目标)对象提供一个代理对象，并由代理对象持有目标对象的引用。所谓代理，就是一个对象代表另一个对象执行相应的动作程序。而代理对象可以在客户端和目标对象之间起到中介的作用。

代理模式在实际的生活中场景很多，例如中介、律师、代购等行业，都是简单的代理逻辑，在这个模式下存在两个关键角色：

目标对象角色：即代理对象所代表的对象。
代理对象角色：内部含有目标对象的引用，可以操作目标对象；AOP编程就是基于这个思想。
## 静态代理
假设我们有一个接口 `HelloService`，以及它的实现类 `HelloServiceImpl`:
```
// 接口
public interface HelloService {
    void sayHello();
}

// 实现类
public class HelloServiceImpl implements HelloService {
    @Override
    public void sayHello() {
        System.out.println("Hello from HelloServiceImpl!");
    }
}
```

现在我们创建一个静态代理类 `HelloServiceProxy`，它实现了 `HelloService` 接口,并持有 `HelloServiceImpl` 的实例:

```
public class HelloServiceProxy implements HelloService {
    private HelloService helloService;

    public HelloServiceProxy(HelloService helloService) {
        this.helloService = helloService;
    }

    @Override
    public void sayHello() {
        System.out.println("Before calling sayHello()");
        helloService.sayHello(); // 调用目标对象的方法
        System.out.println("After calling sayHello()");
    }
}
```

在 `HelloServiceProxy` 中,我们在调用 `sayHello()` 方法前后分别添加了一些额外的操作。

现在,我们可以在客户端代码中使用静态代理来调用 `HelloService`:
```
public class Main {
    public static void main(String[] args) {
        // 创建目标对象
        HelloService helloService = new HelloServiceImpl();

        // 创建代理对象
        HelloService proxyService = new HelloServiceProxy(helloService);

        // 通过代理对象调用方法
        proxyService.sayHello();
    }
}
```

```
Before calling sayHello()
Hello from HelloServiceImpl!
After calling sayHello()
```

在这个示例中,我们创建了一个 `HelloServiceProxy` 类来代理 `HelloServiceImpl` 类。在 `sayHello()` 方法中,我们在调用目标方法前后添加了一些额外的操作。这种方式可以在不修改目标类的情况下,为目标类添加新的功能。
## 动态代理
### 基本使用
在代购刚兴起的初期，是一些常去海外出差的人，会接代购需求，即代理人固定；后来就兴起海外代购平台，海淘等一系列产品，即用户代购需求（目标对象）由代购平台去实现，但是具体谁来操作这个就看即时分配，这个场景与动态代理的原理类似。


```
// 动态代理的 InvocationHandler 实现
public class HelloServiceInvocationHandler implements InvocationHandler {
    private HelloService helloService;

    public HelloServiceInvocationHandler(HelloService helloService) {
        this.helloService = helloService;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before calling " + method.getName());
        Object result = method.invoke(helloService, args);
        System.out.println("After calling " + method.getName());
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        // 创建目标对象
        HelloService helloService = new HelloServiceImpl();

        // 创建动态代理对象
        HelloService proxyService = (HelloService) Proxy.newProxyInstance(
            helloService.getClass().getClassLoader(),
            new Class[]{HelloService.class},
            new HelloServiceInvocationHandler(helloService)
        );

        // 通过代理对象调用方法
        proxyService.sayHello();
    }
}
```

### 进阶特性
我们甚至可以更极端一点，直接不要实现类，直接创建接口的逻辑。
```
public interface Greeter {
    void greet();
}


import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class GreeterProxy {
    public static Greeter createGreeter() {
        Greeter greeter = (Greeter) Proxy.newProxyInstance(
            Greeter.class.getClassLoader(),
            new Class<?>[] { Greeter.class },
            new InvocationHandler() {
                private Logger logger = new Logger();

                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    logger.log("Calling " + method.getName());
                    Object result = method.invoke(this, args);
                    logger.log("Method " + method.getName() + " returned");
                    return result;
                }

                public void greet() {
                    System.out.println("Hello, user!");
                }
            }
        );
        return greeter;
    }
}

```

同时我们注意，我们是代理类。也就是调用某个动态代理对象的方法时，都会触发代理类的invoke方法，并传递对应的内容。

假设我们有一个 Calculator 接口:
```
public interface Calculator {
    int add(int a, int b);
    int subtract(int a, int b);
}
```
然后我们创建一个 CalculatorImpl 类来实现这个接口:
```
public class CalculatorImpl implements Calculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public int subtract(int a, int b) {
        return a - b;
    }
}
```

现在,我们来创建一个动态代理类,在 invoke() 方法中添加一些额外的逻辑:
```
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class CalculatorProxy {
    public static Calculator createCalculatorProxy() {
        return (Calculator) Proxy.newProxyInstance(
            CalculatorImpl.class.getClassLoader(),
            new Class<?>[] { Calculator.class },
            new CalculatorInvocationHandler(new CalculatorImpl())
        );
    }

    private static class CalculatorInvocationHandler implements InvocationHandler {
        private final Calculator calculator;

        public CalculatorInvocationHandler(Calculator calculator) {
            this.calculator = calculator;
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 在调用目标方法前记录日志
            System.out.println("Calling method: " + method.getName());

            // 调用目标方法
            Object result = method.invoke(calculator, args);

            // 在调用目标方法后记录日志
            System.out.println("Method " + method.getName() + " returned: " + result);

            return result;
        }
    }
}
```

```
Calculator calculatorProxy = CalculatorProxy.createCalculatorProxy();
int result = calculatorProxy.add(5, 3);
System.out.println("Result: " + result);
```
# 参考链接
https://cloud.tencent.com/developer/article/1843361
