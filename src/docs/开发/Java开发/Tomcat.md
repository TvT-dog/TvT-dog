---
data: 2024-08-12
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364758
title: Tomcat学习
---
# Tomcat基础
Tomcat是由Apache软件基金会属下Jakarta项目开发的Servlet容器，实现了对Servlet和JavaServer Page（JSP）的支持。由于Tomcat本身也内含了HTTP服务器，因此也可以视作单独的Web服务器。

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1723462873586-83f8928c-e4ca-4d87-a88c-1266659dc2a4.png)

Tomcat能够通过Connector组件接收并解析HTTP请求，然后将一个ServletRequest对象发送给Container处理。容器处理完之后会将响应封装成ServletRespone返回给Connector，然后Connector再将ServletRespone解析为HTTP响应文本格式发送给客户端，至此Tomcat就完成了一次网络通信。
# 架构
Tomcat Server大致可以分为三个组件，Service、Connector、Container。
## Server
Tomcat Server可以包含多个Service，比如Tomcat默认的Service服务Catalina。每一个Service都是独立的，他们共享一个JVM以及系统类库。这些 Service 可以提供不同的功能,如 AJP Connector、JMX 管理等。
## Connector 连接器
Connector用于连接Service和Container，解析客户端的请求并转发到Container，以及转发来自Container的响应。每一种不同的Connector都可以处理不同的请求协议，包括HTTP/1.1、HTTP/2、AJP等等。

## Container 容器
Tomcat设计了四种容器，分别是Engine、Host、Context和Wrapper，其关系如下
![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1723462474991-5cafb7d3-6236-4022-90bc-ac3a062e77fb.png)

一个Container对应一个Engine，一个Engine可以包含多个Host，一个Host可以包含多个Context，Context又包含多个Wrapper。

此时，设想这样一个场景：我们此时要访问https://manage.xxx.com:8080/user/list，那tomcat是如何实现请求定位到具体的servlet的呢？为此tomcat设计了Mapper，其中保存了容器组件与访问路径的映射关(注解同理)。

然后就开始四步走：

- 根据协议和端口号选定Service和Engine。

我们知道Tomcat的每个连接器都监听不同的端口，比如Tomcat默认的HTTP连接器监听8080端口、默认的AJP连接器监听8009端口。上面例子中的URL访问的是8080端口，因此这个请求会被HTTP连接器接收，而一个连接器是属于一个Service组件的，这样Service组件就确定了。我们还知道一个Service组件里除了有多个连接器，还有一个容器组件，具体来说就是一个Engine容器，因此Service确定了也就意味着Engine也确定了。

- 根据域名选定Host。

Service和Engine确定后，Mapper组件通过url中的域名去查找相应的Host容器，比如例子中的url访问的域名是manage.xxx.com，因此Mapper会找到Host1这个容器。

- 根据url路径找到Context组件。

Host确定以后，Mapper根据url的路径来匹配相应的Web应用的路径，比如例子中访问的是/user，因此找到了Context1这个Context容器。

- 根据url路径找到Wrapper（Servlet）。

Context确定后，Mapper再根据web.xml中配置的Servlet映射路径来找到具体的Wrapper和Servlet，例如这里的Wrapper1的/list。
![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1723463824266-06ca5b24-64ff-4b48-b66a-578073c8bede.png)

# 参考文章
https://github.com/W01fh4cker/LearnJavaMemshellFromZero