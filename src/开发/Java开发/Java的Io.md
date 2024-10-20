---
data: 2024-07-29
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364749
---
![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1722259445886-a910006a-d45e-48b0-9002-9f01466ed04f.png)

# Java IO基础

IO，即in和out，也就是输入和输出，指应用程序和外部设备之间的数据传递，常见的外部设备包括文件、管道、网络连接。

Java 中是通过流处理IO 的，那么什么是流？

流（Stream），是一个抽象的概念，是指一连串的数据（字符或字节），是以先进先出的方式发送信息的通道。

当程序需要读取数据的时候，就会开启一个通向数据源的流，这个数据源可以是文件，内存，或是网络连接。类似的，当程序需要写入数据的时候，就会开启一个通向目的地的流。这时候你就可以想象数据好像在这其中“流”动一样。

一般来说关于流的特性有下面几点：

- 先进先出：最先写入输出流的数据最先被输入流读取到。
- 顺序存取：可以一个接一个地往流中写入一串字节，读出时也将按写入顺序读取一串字节，不能随机访问中间的数据。（RandomAccessFile除外）
- 只读或只写：每个流只能是输入流或输出流的一种，不能同时具备两个功能，输入流只能进行读操作，对输出流只能进行写操作。在一个数据传输通道中，如果既要写入数据，又要读取数据，则要分别提供两个流。

# 传输方式的区别
传输方式有两种，字节和字符：
- 字节（byte）是计算机中用来表示存储容量的一个计量单位，通常情况下，一个字节有 8 位（bit）。
- 字符（char）可以是计算机中使用的字母、数字、和符号，比如说 A 1 $ 这些。

通常来说，一个字母或者一个字符占用一个字节，一个汉字占用两个字节。字节流用来处理二进制文件，比如说图片啊、MP3 啊、视频啊。字符流用来处理文本文件，文本文件可以看作是一种特殊的二进制文件，只不过经过了编码，便于人们阅读。

换句话说就是，字节流可以处理一切文件，而字符流只能处理文本。

# Java 对象的序列化和反序列化
序列化是指将一个对象转换为一个字节序列（包含对象的数据、对象的类型和对象中存储的属性等信息），以便在网络上传输或保存到文件中，或者在程序之间传递。在 Java 中，序列化通过实现 java.io.Serializable 接口来实现，只有实现了 Serializable 接口的对象才能被序列化。

## 对象的序列化
即一个对象要想序列化，必须满足两个条件:

- 该类必须实现java.io.Serializable 接口，否则会抛出NotSerializableException 。
- 该类的所有字段都必须是可序列化的。如果一个字段不需要序列化，则需要使用transient 关键字进行修饰。

把一个对象序列化保存到一个文件
```
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.ObjectOutputStream;  
import java.io.Serializable;  
  
public class ObjectOutputStreamDemo {  
    public static void main(String[] args) {  
        Person person = new Person("沉默王二", 20);  
        try {  
            FileOutputStream fos = new FileOutputStream("person.dat");  
            ObjectOutputStream oos = new ObjectOutputStream(fos);  
            oos.writeObject(person);  
            oos.close();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
}  
class Person implements Serializable {  
    private String name;  
    private int age;  
  
    public Person(String name, int age) {  
        this.name = name;  
        this.age = age;  
    }  
  
    public String getName() {  
        return name;  
    }  
  
    public int getAge() {  
        return age;  
    }  
}
```

创建了一个 Person 对象，然后使用 FileOutputStream 和 ObjectOutputStream 将 Person 对象序列化并输出到 person.dat 文件中。在 Person 类中，实现了 Serializable 接口，表示该类可以进行对象序列化。
## 字节流反序列化
代码如下：
```
String filename = "logs/person.dat"; // 待反序列化的文件名
try (FileInputStream fileIn = new FileInputStream(filename);
     ObjectInputStream in = new ObjectInputStream(fileIn)) {
     // 从指定的文件输入流中读取对象并反序列化
     Object obj = in.readObject();
     // 将反序列化后的对象强制转换为指定类型
     Person p = (Person) obj;
     // 打印反序列化后的对象信息
     System.out.println("Deserialized Object: " + p);
} catch (IOException | ClassNotFoundException e) {
     e.printStackTrace();
}
```
## 魔法函数
实现了java.io.Serializable接口的类，还可以定义如下方法(反序列化魔术方法)，这些方法将会在类序列化或反序列化过程中调用。

private void writeObject(java.io.ObjectOutputStream out) throws IOException
当对象被序列化时,会自动调用这个方法。在这个方法中,您可以自定义序列化的过程,比如添加加密、压缩等操作。

private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException
当对象被反序列化时,会自动调用这个方法。在这个方法中,您可以自定义反序列化的过程,比如解密、解压缩等操作。

private void readObjectNoData() throws ObjectStreamException
当对象被反序列化时,如果在序列化数据中没有找到该对象的任何数据,就会调用这个方法。您可以在这个方法中进行一些初始化操作。

private Object writeReplace() throws ObjectStreamException
当对象被序列化时,会先调用这个方法。您可以在这个方法中返回一个替代对象,从而改变被序列化的对象。


# 参考链接
https://javabetter.cn/io/shangtou.html