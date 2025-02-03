---
data: 2024-08-05
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364750
---
# 什么是Rmi
RMI（Remote Method Invocation）的全称为远程方法调用。远程方法调用是分布式编程中的一个基本思想。实现远程方法调用的技术有很多，比如：CORBA、WebService，这两种都是独立于编程语言的。而Java RMI（Java Remote Method Invocation）是专为Java环境设计的远程方法调用机制，能够让一台Java虚拟机上的对象调用运行在另一台Java虚拟机上的对象的方法。它使客户机上运行的程序可以调用远程服务器上的对象。

具体的通信流程如下

- Server监听一个端口，这个端口是JVM随机选择的
- Client并不知道Server远程对象的通信地址和端口，但是位于Client的Stub中包含了这些信息，并封装了底层网络操作。Client可以调用Stub上的方法，并且也可以向Stub发送方法参数。
- Stub连接到Server监听的通信端口并提交参数
- Server执行具体的方法，并将结果返回给Stub
- Stub返回执行结果给Client。因此在Clinet看来，就好像是Stub在本地执行了这个方法。

# 基本使用
## 远程对象
任何可以被远程调用方法的对象必须继承java.rmi.Remote接口，远程对象的实现类必须继承UnicastRemoteObject类。如果不继承UnicastRemoteObject类，则需要手工初始化远程对象，在远程对象的构造方法的调用UnicastRemoteObject.exportObject()静态方法。
```
package learn.rmi;
 
import java.rmi.Remote;
import java.rmi.RemoteException;
 
public interface IHello extends Remote {
    public String sayHello(String name) throws RemoteException;
}
```
实现类
```
package learn.rmi;
 
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
 
public class RMIServer {
 
    public class RMIHello extends UnicastRemoteObject implements IHello{
        protected RMIHello() throws RemoteException{
            super();
        }
 
//      在没有继承UnicastRemoteObject的时候构造函数也可以写成如下形式
//      protected RMIHello() throws RemoteException{
//          UnicastRemoteObject.exportObject(this,0);
//      }
 
 
        @Override
        public String sayHello(String name) throws RemoteException {
            System.out.println("Hello World!");
            return "Feng";
        }
    }
 
}
```
## 服务器端
```
package learn.rmi;
 
import java.rmi.Remote;
import java.rmi.RemoteException;
 
public interface IHello extends Remote {
    public String sayHello(String name) throws RemoteException;
}
```
实现类
```
package learn.rmi;
 
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.server.UnicastRemoteObject;
 
public class RMIServer {
 
    public class RMIHello extends UnicastRemoteObject implements IHello {
        protected RMIHello() throws RemoteException{
            super();
        }
 
        @Override
        public String sayHello(String name) throws RemoteException {
            System.out.println("Hello World!");
            return name;
        }
    }
 
    private void register() throws Exception{
        RMIHello rmiHello=new RMIHello();
        LocateRegistry.createRegistry(1099);
        Naming.bind("rmi://0.0.0.0:1099/hello",rmiHello);
        System.out.println("Registry运行中......");
    }
 
    public static void main(String[] args) throws Exception {
        new RMIServer().register();
    }
}
```

这里的
```
private void register() throws Exception{
        RMIHello rmiHello=new RMIHello();
        LocateRegistry.createRegistry(1099);
        Naming.bind("rmi://0.0.0.0:1099/hello",rmiHello);
        System.out.println("Registry运行中......");
    }
```
就是实现我们上文中说的Stub的传递功能即RMI Registry的注册。即让RMI Registry中保存了rmiHello远程对象的端口信息。

## 客户端
```
package learn.rmi;
 
import java.rmi.Remote;
import java.rmi.RemoteException;
 
public interface IHello extends Remote {
    public String sayHello(String name) throws RemoteException;
}
```

```
package learn.rmi;
 
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
 
public class RMIClient {
    public static void main(String[] args) throws Exception{
        Registry registry= LocateRegistry.getRegistry("127.0.0.1",1099);
        IHello iHello=(IHello) registry.lookup("hello");
        System.out.println(iHello.sayHello("Feng"));
    }
}
```
客户端先向RMI注册表查询某个远程对象名称，来获取该远程对象的Stub。然后获取到对应的接口信息后，才会真正去获取对应的远程对象信息。

# 参考文章
https://goodapple.top/archives/321