---
data: 2024-08-24
关联:
  - "[[开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18378126
---
# 什么是protobuf
数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等
gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。
# 简单使用
定义一种源文件，扩展名为 `.proto`，使用这种源文件，可以定义存储类的内容(消息类型)。
protobuf有自己的编译器 `protoc`，可以将 `.proto` 编译成对应语言的文件，就可以进行使用了。
### 工具安装
```
brew install protobuf
get github.com/golang/protobuf/protoc-gen-go
```
## 文件创建
```
// 指定的当前proto语法的版本，有2和3  
syntax = "proto3";  
//option go_package = "path;name"; path 表示生成的go文件的存放地址，会自动生成目录的  
// name 表示生成的go文件所属的包名  
option go_package="/service";  
// 指定等会文件生成出来的package  
package service;  
  
message User {  
  string username = 1;  
  int32 age = 2;  
}
```
使用命令生成对应的GO文件
```
 protoc --go_out=. user.proto
```
## 代码使用
```
package main  
  
import (  
    "clinet/service"  
    "fmt"    "google.golang.org/protobuf/proto")  
  
func main() {  
    user := &service.User{  
       Username: "mszlu",  
       Age:      20,  
    }  
    //转换为protobuf  
    marshal, err := proto.Marshal(user) //将这个 User 对象编码为 Protobuf 格式的字节数组 ([]byte)。  
    if err != nil {  
       panic(err)  
    }  
  
    newUser := &service.User{}  
    err = proto.Unmarshal(marshal, newUser)//将字节数组解码回 User 对象  
    if err != nil {  
       panic(err)  
    }  
    fmt.Println(newUser.String())  
}
```
# proto文件介绍
### message使用
一个消息类型是通过关键字message字段指定的。
```
message User {
  string username = 1;
  int32 age = 2;
}
```
#### 字段规则
- required string name = 1;
这个字段是必填的,意味着在创建和序列化 Person 消息时,必须设置 name 字段的值。否则会报错。在 Go 中,这个字段会被生成为 string 类型。
- optional int32 age = 2;
这个字段是可选的,意味着在创建和序列化 Person 消息时,可以不设置 age 字段。如果不设置,则会使用该字段类型的默认值,在这里是 0。在 Go 中,这个字段会被生成为 int32 类型。
- repeated string phoneNumbers = 3;
这个字段是可重复的,意味着一个 Person 消息可以有多个电话号码。在序列化和反序列化过程中,这些电话号码的顺序会被保留。在 Go 中,这个字段会被生成为 []string 类型的切片。

```
message Person {
  required string name = 1;
  optional int32 age = 2;
  repeated string phoneNumbers = 3;
}
```

```
// 创建一个 Person 消息
person := &Person{
    Name:         "Alice",
    Age:          30,
    PhoneNumbers: []string{"123-456-7890", "987-654-3210"},
}

// 序列化为 Protobuf 二进制数据
data, err := proto.Marshal(person)
if err != nil {
    // 处理错误
}

// 反序列化回 Person 对象
newPerson := &Person{}
err = proto.Unmarshal(data, newPerson)
if err != nil {
    // 处理错误
}

// 输出反序列化后的 Person 对象
fmt.Println(newPerson)
```
#### 标识号
在消息体的定义中，每个字段都必须要有一个唯一的标识号，标识号是[0,2^29-1]范围内的一个整数。
```
message Person { 
  string name = 1;  // (位置1)
  int32 id = 2;  
  optional string email = 3;  
  repeated string phones = 4; // (位置4)
}
```
#### 消息复杂使用
```
message PersonInfo {
    message Person {
        string name = 1;
        int32 height = 2;
        repeated int32 weight = 3;
    } 
	repeated Person info = 1;
}
```
如果你想在它的父消息类型的外部重用这个消息类型，你需要以PersonInfo.Person的形式使用它，如：
```
message PersonMessage {
	PersonInfo.Person info = 1;
}
```

## 定义服务
如果想要将消息类型用在RPC系统中，可以在.proto文件中定义一个RPC服务接口，protocol buffer 编译器将会根据所选择的不同语言生成服务接口代码及存根。

```
service SearchService {
	//rpc 服务的函数名 （传入参数）返回（返回参数）
	rpc Search (SearchRequest) returns (SearchResponse);
}
```
上述代表表示，定义了一个RPC服务，该方法接收SearchRequest返回SearchResponse
```
service MyService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);
}

message GetUserRequest {
  string userId = 1;
}

message GetUserResponse {
  User user = 1;
}

message UpdateUserRequest {
  User user = 1;
}

message UpdateUserResponse {
  bool success = 1;
}

message User {
  string name = 1;
  int32 age = 2;
}
```

MyService 是一个服务,它定义了两个 RPC 方法:
- GetUser: 输入一个 GetUserRequest，返回一个 GetUserResponse。
- UpdateUser: 输入一个 UpdateUserRequest，返回一个 UpdateUserResponse。

# 参考文章
https://mszlu.com/grpc/01/01.html#_3-3-proto%E6%96%87%E4%BB%B6%E4%BB%8B%E7%BB%8D