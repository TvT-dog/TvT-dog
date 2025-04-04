---
data: 2024-08-02
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364752
title: JAVA反射
---
## 基础概念
一般情况下，我们在使用某个类之前已经确定它到底是个什么类了，拿到手就直接可以使用 new关键字来调用构造方法进行初始化，之后使用这个类的对象来进行操作。
```
Writer writer = new Writer();
writer.setName("沉默王二");
```
像上面这个例子，就可以理解为“正射”。而反射就意味着一开始我们不知道要初始化的类到底是什么，也就没法直接使用 new 关键字创建对象了。

我们只知道这个类的一些基本信息，就好像我们看电影的时候，为了抓住一个犯罪嫌疑人，警察就会问一些目击证人，根据这些证人提供的信息，找专家把犯罪嫌疑人的样貌给画出来——这个过程，就可以称之为反射。

```
Class clazz = Class.forName("com.itwanger.s39.Writer");
Method method = clazz.getMethod("setName", String.class);
Constructor constructor = clazz.getConstructor();
Object object = constructor.newInstance();
method.invoke(object,"沉默王二");
```

反射的主要应用场景有：
- 开发通用框架：像 Spring，为了保持通用性，通过配置文件来加载不同的对象，调用不同的方法。
- 动态代理：在面向切面编程中，需要拦截特定的方法，就会选择动态代理的方式，而动态代理的底层技术就是反射。
- 注解：注解本身只是起到一个标记符的作用，它需要利用发射机制，根据标记符去执行特定的行为。


## 具体使用
### 获取 Class 类对象
- 通过实例获取
- 通过类名获取
- 通过全限定名获取
```
public class reflectdemo1 {
    public static void main(String[] args) {
        try {
            Class<?> stuclz1 = Class.forName("org.basicdemo.reflect.student");
            System.out.println("Class.forName: " + stuclz1);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        student stu = new student();
        Class stuclz2 = stu.getClass();
        System.out.println("对象.getClass(): " + stuclz2);

        Class stuclz3 = student.class;
        System.out.println("类名.class: " + stuclz3);
    }
}
```
### 创建对应实例
```
public class m {
    public static void main(String[] args) throws NoSuchMethodException {
        Class<?> stuclz1 = null;
        try {
            stuclz1 = Class.forName("javax.swing.AbstractAction");
            System.out.println("Class.forName: " + stuclz1);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


        Class stuclz3 = AbstractAction.class;
        System.out.println("类名.class: " + stuclz3);

        // 获取所有公有(public)构造方法
        System.out.println("===========获取所有公有构造方法=========");
        Constructor[] consarr = stuclz1.getConstructors();
        for (Constructor c : consarr) {
            System.out.println(c);
        }

        // 获取所有(public,protected,private,default)的构造方法
        System.out.println("===========获取所有的构造方法=========");
        Constructor[] consall = stuclz1.getDeclaredConstructors();
        for(Constructor c : consall) {
            System.out.println(c);
        }

        // 获取单个构造方法，公有无参的构造方法
        System.out.println("===========获取单个公有、无参数的构造方法=========");
        try {
            Constructor con = stuclz1.getConstructor(null);
            System.out.println("con: " + con);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        System.out.println("===========获取单个私有private构造方法=========");
        Constructor con = stuclz1.getDeclaredConstructor(String.class);
        System.out.println(con);

    }
}
```
### 字段的获取
```
// 获取所有 public 权限的字段
        System.out.println("==========获取所有 public 权限的字段===========");
        Field[] fieldArr = stuclz1.getFields();
        for(Field f : fieldArr) {
            System.out.println(f+" - ("+f.getDeclaringClass() +") - ("+f.getName()+":"+f.getType()+")");
        }

// 获取所有权限的字段，包括private
        System.out.println("==========获取所有权限的字段，包括private===========");
        Field[] fieldsArr = stuclz1.getDeclaredFields();
        for(Field f : fieldsArr) {
            System.out.println(f);
        }
        // 根据名字获取单个public字段
        System.out.println("===========根据名字获取public字段============");
        Field addressField = stuclz1.getField("DEFAULT");
        System.out.println(addressField);


// 根据名字获取某个字段，字段权限包括所有，也包括private
        System.out.println("=========根据名字获取某个字段，字段权限包括所有，也包括private=======");
// 来获取一个 private 字段
        Field nameField = stuclz1.getDeclaredField("arrayTable");
        System.out.println(nameField);
        nameField.setAccessible(true); // 因为是private，所以先要设置可访问。相当于打开一个开关，原本是不可以写的。
```
### 方法的获取
```
// 获取所有public method方法
System.out.println("=============获取所有public method方法，包括继承父类的===============");
Method[] methodArr =  stuclz1.getMethods();
for(Method m:methodArr) {
    System.out.println(m); // 不仅打印出了 TomStudent 所有 public 方法，它继承的方法也打印出来
}
System.out.println("=============获取所有 method方法，包括继承父类的===============");
Method[] methodArr2 =  stuclz1.getDeclaredMethods();
for(Method m:methodArr2) {
    System.out.println(m); // 不仅打印出了 TomStudent 所有 public 方法，它继承的方法也打印出来
}
```
那么打包成一个单独的方法类
```
public class reflact {
    //对属性进行更改
    public  static   Object getFied(Object classname ,Object value,String name) throws Exception {
        Class object=classname.getClass();
        Field field=object.getDeclaredField(name);
        field.setAccessible(true);
        field.set(classname ,value);
        return classname;


    }
    //对属性方法进行获取
    public  static   Method  getMethod(Object classname , String methodName ,Class ...partar) throws Exception {
        Class object=classname.getClass();
        Method method = object.getDeclaredMethod(methodName,  partar);
        method.setAccessible(true);
        return  method;

    }
}
```
## 参考文章
[https://www.cnblogs.com/jiujuan/p/16659488.html](https://www.cnblogs.com/jiujuan/p/16659488.html)
https://javabetter.cn/basic-extra-meal/fanshe.html