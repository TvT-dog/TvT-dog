---
data: 2024-08-24
关联:
  - "[[Go开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18378149
---
# RPC是什么
RPC 是远程过程调用的简称，是分布式系统中不同节点间流行的通信方式。它允许客户端程序调用位于远程计算机上的服务器程序上的方法或函数,就像调用本地程序一样。
# 简单使用
## 服务端

RPC方法只能有两个可序列化的参数，其中第二个参数是指针类型，并且返回一个 error 类型，同时必须是公开的方法
```
package main  
  
import (  
    "fmt"  
    "log"    "net"    "net/rpc")  
  
type HelloService struct{}  
  
func (p *HelloService) Hello(request string, reply *string) error {  
    *reply = "hello:" + request  
    return nil  
}  
  
func main() {  
    // 注册 HelloService    rpc.RegisterName("HelloService", new(HelloService))  
  
    // 创建 TCP 监听器  
    listener, err := net.Listen("tcp", ":1234")  
    if err != nil {  
       log.Fatal("ListenTCP error:", err)  
    }  
  
    fmt.Println("RPC server listening on :1234")  
  
    // 等待并处理连接  
    for {  
       conn, err := listener.Accept()  
       if err != nil {  
          log.Fatal("Accept error:", err)  
       }  
       go rpc.ServeConn(conn)  
    }  
}
```
其中 rpc.Register 函数调用会将对象类型中所有满足 RPC 规则的对象方法注册为 RPC 函数，所有注册的方法会放在 “HelloService” 服务空间之下。然后我们建立一个唯一的 TCP 连接，并且通过 rpc.ServeConn 函数在该 TCP 连接上为对方提供 RPC 服务。

## 客户端

```
package main  
  
import (  
    "fmt"  
    "log"    "net/rpc")  
  
func main() {  
    client, err := rpc.Dial("tcp", "localhost:1234")  
    if err != nil {  
       log.Fatal("dialing:", err)  
    }  
  
    var reply string  
    err = client.Call("HelloService.Hello", "xxx", &reply)  
    if err != nil {  
       log.Fatal(err)  
    }  
  
    fmt.Println(reply)  
}
```
首先是通过 rpc.Dial 拨号 RPC 服务，然后通过 client.Call 调用具体的 RPC 方法。在调用 client.Call 时，第一个参数是用点号连接的 RPC 服务名字和方法名字，第二和第三个参数分别我们定义 RPC 方法的两个参数。
# 参考文章
https://chai2010.cn/advanced-go-programming-book/ch4-rpc/ch4-01-rpc-intro.html
