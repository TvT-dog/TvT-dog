---
data: 2024-08-02
关联:
  - "[[Java开发]]"
title: Unsafe类使用
---
# 类的获取
Unsafe是Java内部API，外部是禁止调用的，在编译Java类时如果检测到引用了Unsafe类也会有禁止使用的警告：Unsafe是内部专用 API, 可能会在未来发行版中删除。
## 反射调用
```
// 获取Unsafe无参构造方法
Constructor constructor = Unsafe.class.getDeclaredConstructor();

// 修改构造方法访问权限
constructor.setAccessible(true);

// 反射创建Unsafe类实例，等价于 Unsafe unsafe1 = new Unsafe();
Unsafe unsafe1 = (Unsafe) constructor.newInstance();
```

# 基本使用
## 创建对象
### allocateInstance方法
使用allocateInstance方法，这允许开发者创建一个类的实例,而不需要调用构造函数。这在某些情况下非常有用,比如创建某些需要特殊初始化的对象,或者在反序列化时创建对象。

```
MyClass obj = (MyClass) unsafe.allocateInstance(MyClass.class);
```

在渗透测试中也会经常遇到这样的限制，比如RASP限制了java.io.FileInputStream类的构造方法导致我们无法读文件或者限制了UNIXProcess/ProcessImpl类的构造方法导致我们无法执行本地命令等。

### defineClass方法
该方法允许开发者在运行时动态地定义一个新的 Java 类。它需要传入类的二进制字节码数组、类加载器和保护域等参数。

```
byte[] classBytes = ...  // 获取类的字节码
Class<?> clazz = unsafe.defineClass("com.example.MyClass", classBytes, 0, classBytes.length, null, null);
```
