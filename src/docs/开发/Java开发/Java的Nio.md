---
data: 2024-08-02
关联:
  - "[[Java开发]]"
title: Java的Nio
---

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1722599207073-765f221a-3d93-448b-b48d-9c244e9b5407.png)
传统 IO 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用 Socket 和 ServerSocket 进行网络传输。

NIO 使用通道（Channel）和缓冲区（Buffer）进行文件操作，以及使用 SocketChannel 和 ServerSocketChannel 进行网络传输。

传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。

NIO 使用非阻塞模型，允许线程在等待 I/O 时执行其他任务。这种模式通过使用选择器（Selector）来监控多个通道（Channel）上的 I/O 事件，实现了更高的性能和可伸缩性。

## 参考链接

https://javabetter.cn/nio/nio-better-io.html#_01%E3%80%81nio-%E5%92%8C%E4%BC%A0%E7%BB%9F-io-%E5%9C%A8%E6%93%8D%E4%BD%9C%E6%96%87%E4%BB%B6%E6%97%B6%E7%9A%84%E5%B7%AE%E5%BC%82