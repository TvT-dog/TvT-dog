---
data: 2024-08-05
关联:
  - "[[Java开发]]"
title: Java中的Grpc
---
# 什么是Grpc
RPC是Remote Procedure Call的简称，中文叫远程过程调用。用于解决分布式系统中服务之间的调用问题。通俗地讲，就是开发者能够像调用本地方法一样调用远程的服务。

而gRPC 是由Google开发的一个语言中立、高性能、通用的开源RPC框架，基于ProtoBuf(Protocol Buffers) 序列化协议开发，且支持众多开发语言。
# Protocol Buffer
Protocol Buffer(简称Protobuf) 是语言中立、平台无关、实现结构化数据序列化的可扩展机制。它就像JSON, 但比JSON体积更小，传输更快。

Protobuf在 gRPC 的框架中主要有三个作用：定义数据结构、定义服务接口，通过序列化和反序列化方式提升传输效率。

Protobuf文件的后缀是.proto，定义以下服务：
```
syntax = "proto3"; // 表示使用的protobuf版本是proto3。还有一个版本是proto2，建议使用最新版本。

import "google/protobuf/wrappers.proto";// 引入包装类型，没有默认值。下面会讲

option java_multiple_files = true; // 如果是false，则只生成一个java文件。反之生成多个。
option java_package = "com.khlin.grpc.proto"; // 类的包名
option java_outer_classname = "UserProto"; // 想要生成的类的名字
option objc_class_prefix = "khlin"; // 设置Objective-C类前缀，该前缀位于此.proto中所有Objective-C生成的类和枚举之前。似乎Java没用上。

package user; // protobuf消息类型的包类，同样是为了防止命名冲突。

// 定义一个服务
service UserService{
  // 简单模式
  rpc getUserInfo(UserRequest) returns (UserResponse);
  // 客户端流
  rpc batchGetUserInfo(stream UserRequest) returns (google.protobuf.StringValue);
  // 服务端流
  rpc getUserInfoStream(UserRequest) returns (stream UserResponse);
  // 双向流
  rpc biGetUserInfo(stream UserRequest) returns (stream UserResponse);
}

// 定义一个入参类型
message UserRequest{
  string id = 1;
}

// 定义一个出参类型
message UserResponse{
  string id = 1;
  int32 phoneNumber = 2; // 电话号码
  string email = 3; // 邮箱地址
  int32 serialNumber = 4; // 序列号
}

```
## 数据结构
grpc是可以跨语言的，那么他们肯定就存在一种类型的映射。

| .proto Type | Notes                                                                                | Java/Kotlin Type |
| ----------- | ------------------------------------------------------------------------------------ | ---------------- |
| double      |                                                                                      | double           |
| float       |                                                                                      | float            |
| int32       | 使用变长编码方式，不适用于负数。负数使用sint32。                                                          | int              |
| int64       | 使用变长编码方式，不适用于负数。负数使用sint64。                                                          | long             |
| uint32      | 使用变长编码方式                                                                             | int              |
| uint64      | 使用变长编码方式                                                                             | long             |
| sint32      | 使用变长编码。有符号的整型值。它们比普通的int32能更有效地编码负数。                                                 | int              |
| sint64      | 使用变长编码。有符号的整型值。它们比普通的int64能更有效地编码负数。                                                 | long             |
| fixed32     | 固定4字节                                                                                | int[2]           |
| fixed64     | Always eight bytes. More efficient than uint64 if values are often greater than 256. | long[2]          |
| sfixed32    | Always four bytes.                                                                   | int              |
| sfixed64    | 固定8字节                                                                                | long             |
| bool        |                                                                                      | boolean          |
| string      | 字符串必须始终包含UTF-8编码或7位ASCII文本，且长度不能超过232。                                               | String           |
| bytes       | 可以包含不超过232的任意字节序列。                                                                   | ByteString       |
|             |                                                                                      |                  |
|             |                                                                                      |                  |
同时这些数据也是存在对应的默认值的

|类型|默认值|
|---|---|
|string|空字符串|
|bytes|空byte数组|
|bool|false|
|数值类型|0|
|enums|定义的枚举第一个元素（默认必须为0）|
|定义的message类型|不赋值|
|repeated *|空列表|
其实就相当于一个中间语言
# 参考链接
https://www.cnblogs.com/kingsleylam/p/17069320.html