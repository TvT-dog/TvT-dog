---
data: 2024-09-01
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18391569
---
# 环境配置
```
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0"  
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
  
    <groupId>org.example</groupId>  
    <artifactId>JAVA-GRPC</artifactId>  
    <version>1.0-SNAPSHOT</version>  
  
    <properties>        <maven.compiler.source>17</maven.compiler.source>  
        <maven.compiler.target>17</maven.compiler.target>  
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
    </properties>    <dependencies>        <!-- gRPC core library -->  
        <dependency>  
            <groupId>io.grpc</groupId>  
            <artifactId>grpc-netty</artifactId>  
            <version>1.56.0</version> <!-- 使用最新版本 -->  
        </dependency>  
        <dependency>            <groupId>io.grpc</groupId>  
            <artifactId>grpc-protobuf</artifactId>  
            <version>1.56.0</version>  
        </dependency>        <dependency>            <groupId>io.grpc</groupId>  
            <artifactId>grpc-stub</artifactId>  
            <version>1.56.0</version>  
        </dependency>        <!-- Protocol Buffers -->  
        <dependency>  
            <groupId>com.google.protobuf</groupId>  
            <artifactId>protobuf-java</artifactId>  
            <version>3.24.0</version> <!-- 使用最新版本 -->  
        </dependency>  
        <dependency>            <groupId>javax.annotation</groupId>  
            <artifactId>javax.annotation-api</artifactId>  
            <version>1.3.2</version>  
        </dependency>    </dependencies>  
  
    <build>        <extensions>            <extension>                <groupId>kr.motd.maven</groupId>  
                <artifactId>os-maven-plugin</artifactId>  
                <version>1.6.2</version>  
            </extension>        </extensions>        <plugins>            <plugin>                <groupId>org.xolstice.maven.plugins</groupId>  
                <artifactId>protobuf-maven-plugin</artifactId>  
                <version>0.6.1</version>  
                <configuration>                    <!--suppress UnresolvedMavenProperty -->  
                    <protocArtifact>com.google.protobuf:protoc:3.19.2:exe:${os.detected.classifier}</protocArtifact>  
                    <pluginId>grpc-java</pluginId>  
                    <!--suppress UnresolvedMavenProperty -->  
                    <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.44.1:exe:${os.detected.classifier}</pluginArtifact>  
                </configuration>                <executions>                    <execution>                        <goals>                            <goal>compile</goal>  
                            <goal>compile-custom</goal>  
                        </goals>                    </execution>                </executions>            </plugin>        </plugins>    </build>  
  
</project>
```

# 代码生成
```
// 声明版本  
syntax = "proto3";   
  
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
然后点击idea的maven为所有项目生成源代码并更新文件夹，来生成对应的java代码。

# 客户端
## 代码示例
```
public class Main {  
    public static void main(String[] args) {  
        // 创建 gRPC 连接  
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 2333)  
                .usePlaintext() // 使用明文传输  
                .build();  
  
        // 创建客户端存根  
        SayHelloGrpc.SayHelloBlockingStub stub = SayHelloGrpc.newBlockingStub(channel);  
  
        // 创建请求  
        Hello.HelloRequest request = Hello.HelloRequest.newBuilder()  
                .setUsername("World java")  
                .setCode(12345)  
                .build();  
  
        // 发送请求并接收响应  
        Hello.HelloResponse response = stub.sayHello(request);  
        System.out.println("Response: " + response.getResponseMsg());  
  
        // 关闭通道  
        channel.shutdown();  
    }  
}
```
## ManagedChannel创建
ManagedChannel 是 gRPC Java 中用于与 gRPC 服务器进行通信的主要接口。它提供了一种安全且高效的方式来管理连接。
```
// 创建 gRPC 连接
ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 2333).usePlaintext().build();
```
这里usePlaintext()代表使用明文进行传输。
## 存根创建
```
SayHelloGrpc.SayHelloBlockingStub stub = SayHelloGrpc.newBlockingStub(channel);
```
## 方法调用
我们有了存根，那么调用方法就很简单了。
```
Hello.HelloRequest request = Hello.HelloRequest.newBuilder()  
        .setUsername("World java")  
        .setCode(12345)  
        .build();  
  
// 发送请求并接收响应  
Hello.HelloResponse response = stub.sayHello(request);  
System.out.println("Response: " + response.getResponseMsg());
```
创建对应的请求和回应对象，然后通过存根调用方法即可。
# 服务端
## 代码示例
```
  
public class HelloServer extends SayHelloGrpc.SayHelloImplBase {  
  
    @Override  
    public void sayHello(Hello.HelloRequest req, StreamObserver<Hello.HelloResponse> responseObserver) {  
        String message = "Hello " + req.getUsername() + "\nYour code is: " + req.getCode();  
        Hello.HelloResponse response = Hello.HelloResponse.newBuilder()  
                .setResponseMsg(message)  
                .build();  
  
        // 发送响应  
        responseObserver.onNext(response);  
        responseObserver.onCompleted();  
    }  
  
    public static void main(String[] args) throws IOException, InterruptedException {  
        // 创建 gRPC 服务器  
        Server server = ServerBuilder.forPort(2333)  
                .addService(new HelloServer())  
                .build()  
                .start();  
  
        System.out.println("Server started on port 2333...");  
  
        // 等待服务器停止  
        server.awaitTermination();  
    }  
}
```
## 服务端创建
```
public static void main(String[] args) throws IOException, InterruptedException {  
    // 创建 gRPC 服务器  
    Server server = ServerBuilder.forPort(2333)  
            .addService(new HelloServer())  
            .build()  
            .start();  
  
    System.out.println("Server started on port 2333...");  
  
    // 等待服务器停止  
    server.awaitTermination();  
}
```
这里类似于客户端的存根创建，我们这里创建服务端并进行服务绑定。
## 服务创建
```
public class HelloServer extends SayHelloGrpc.SayHelloImplBase {  
  
    @Override  
    public void sayHello(Hello.HelloRequest req, StreamObserver<Hello.HelloResponse> responseObserver) {  
        String message = "Hello " + req.getUsername() + "\nYour code is: " + req.getCode();  
        Hello.HelloResponse response = Hello.HelloResponse.newBuilder()  
                .setResponseMsg(message)  
                .build();  
  
        // 发送响应  
        responseObserver.onNext(response);  
        responseObserver.onCompleted();  
    }
```
直接继承生成的对应类，然后我们在对应的方法中填写对应的逻辑即可。这里的StreamObserver<Hello.HelloResponse> responseObserver类有常用的3个方法：
- onNext(HelloResponse response): 用于发送一个响应对象到客户端。
- onCompleted(): 指示所有响应已经发送完成，客户端可以结束处理。
- onError(Throwable t): 用于在发生错误时向客户端报告错误。
