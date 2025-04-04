---
data: 2024-08-24
关联:
  - "[[Go开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18378889
---
# 什么是GRPC
gRPC是一款语言中立、平台中立、开源的远程过程调用系统，gRPC客户端和服务端可以在多种环境中运行和交互，例如用java写一个服务端，可以用go语言写客户端调用。

数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等
gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。在学习gRPC之前，需要先了解protocol buffers
# 基础使用
## 依赖安装
安装一个对应的go插件
```
brew install protoc-gen-go-grpc
brew install protobuf
go get google.golang.org/grpc
```

## Protobuf文件
定义对应的一个中间文件
```
// 声明版本
syntax = "proto3";
//option go_package = "path;name" path表示生成go的存放地址,自动生成目录,name表示go文件所属包名
option go_package = ".;service";

//服务方法,接受客户端参数,返回服务端响应
service SayHello {
  rpc SayHello(HelloRequest) returns (HelloResponse) {}
}

//类似结构体
message HelloRequest {
  string username = 1;
  int64 code = 2;
}

message HelloResponse {
  string responseMsg = 1;
}
```

使用命令生成对应的go文件
```
protoc --go_out=./  ./hello.proto
protoc --go-grpc_out=./ ./hello.proto 
```

## 服务端代码
```
package main  
  
import (  
    "context"  
    "fmt"    "google.golang.org/grpc"    "google.golang.org/grpc/reflection"    "log"    "net"    "rpc_project/service"    "strconv")  
  
type server struct {  
    service.UnimplementedSayHelloServer  
}  
  
func (s *server) SayHello(ctx context.Context, req *service.HelloRequest) (*service.HelloResponse, error) {  
    fmt.Println("recv from " + req.Username)  
    return &service.HelloResponse{ResponseMsg: "hello " + req.Username + "\nyour code is: " + strconv.Itoa(int(req.Code))}, nil  
}  
func main() {  
    lis, err := net.Listen("tcp", ":2333")  
    if err != nil {  
       log.Fatalf("failed to listen: %v", err)  
    }  
    grpcServer := grpc.NewServer()  
    service.RegisterSayHelloServer(grpcServer, &server{})  
    reflection.Register(grpcServer)  
    fmt.Println("Listening on port 2333...")  
    grpcServer.Serve(lis)  
  
}
```

## 客户端代码
```
package main  
  
import (  
    "clinet/service"  
    "context"    "fmt"    "google.golang.org/grpc"    "google.golang.org/grpc/credentials/insecure")  
  
func main() {  
    conn, err := grpc.Dial("127.0.0.1:2333", grpc.WithTransportCredentials(insecure.NewCredentials()))  
    if err != nil {  
       return  
    }  
    defer conn.Close()  
  
    client := service.NewSayHelloClient(conn)  
    resp, _ := client.SayHello(context.Background(), &service.HelloRequest{  
       Username: "qqw",  
       Code:     3377,  
    })  
  
    fmt.Println(resp.GetResponseMsg())  
}
```
# 服务端
## 方法增强
gRPC 插件会为服务端和客户端生成不同的接口
```
type SayHelloClient interface {  
    SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloResponse, error)  
}

type SayHelloServer interface {  
    SayHello(context.Context, *HelloRequest) (*HelloResponse, error)  
    mustEmbedUnimplementedSayHelloServer()  
}

```

基于服务端的 SayHelloServer接口可以重新实现 SayHellol服务：

```
func (s *server) SayHello(ctx context.Context, req *service.HelloRequest) (*service.HelloResponse, error) {  
    fmt.Println("recv from " + req.Username)  
    return &service.HelloResponse{ResponseMsg: "hello " + req.Username + "\nyour code is: " + strconv.Itoa(int(req.Code))}, nil  
}
```
这里就对原本的SayHello方法进行了一个对应的增强。
## 服务创建
gRPC 服务的启动流程和标准库的 RPC 服务启动流程类似。
```
func main() {  
    lis, err := net.Listen("tcp", ":2333")  
    if err != nil {  
       log.Fatalf("failed to listen: %v", err)  
    }  //创建一个 TCP 监听器,它将监听 2333 端口上的传入连接。
    grpcServer := grpc.NewServer()  //创建一个新的 gRPC 服务器实例
    service.RegisterSayHelloServer(grpcServer, &server{})  //将 SayHello 服务的实现注册到 gRPC 服务器上
    reflection.Register(grpcServer)  //启用了 gRPC 服务器反射功能,允许客户端检查服务器上可用的服务和方法。
    fmt.Println("Listening on port 2333...")  //启动 gRPC 服务器并阻塞,等待传入的连接。服务器将处理传入的请求,并将它们转发给注册的 SayHelloServer 实现。
    grpcServer.Serve(lis)  
  
}
```
# 客户端
```
func main() {
	// 创建一个到 gRPC 服务器的不安全连接
	conn, err := grpc.Dial("127.0.0.1:2333", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		// 如果连接失败,直接返回
		return
	}
	defer conn.Close() // 程序退出时关闭连接

	// 创建 SayHello 服务的客户端
	client := service.NewSayHelloClient(conn)

	// 创建一个 HelloRequest 并发送给服务器
	resp, _ := client.SayHello(context.Background(), &service.HelloRequest{
		Username: "qqw",
		Code:     3377,
	})

	// 打印服务器返回的响应消息
	fmt.Println(resp.GetResponseMsg())
}
```
## 连接凭证
grpc.WithTransportCredentials 是一个 gRPC 连接选项,用于指定连接的安全凭证。它是用于配置 gRPC 客户端与服务器之间的安全通信的重要功能。
```
conn, err := grpc.Dial("127.0.0.1:2333", grpc.WithTransportCredentials(insecure.NewCredentials()))
```
这里我们使用insecure.NewCredentials() 返回一个不提供任何安全凭证的 gRPC 凭证。
## 方法调用

```
client := service.NewSayHelloClient(conn)  
resp, _ := client.SayHello(context.Background(), &service.HelloRequest{  
    Username: "qqw",  
    Code:     3377,  
})
```
这里我们使用service.NewSayHelloClient(conn)来创建一个存根。

存根是一个代理对象，它在客户端和服务器之间充当中介，负责处理远程过程调用（RPC）。它封装了与远程服务器的通信细节。简单来说就是他代表远程的方法对象。

其中HelloRequest 和client.SayHello均为Protocol Buffers 定义的消息类型。

# 参考文章
https://mszlu.com/grpc/01/01.html#_4-2-%E5%AE%9E%E4%BE%8B
https://blog.xmcve.com/2023/03/23/GRPC%E5%AD%A6%E4%B9%A0/#title-7