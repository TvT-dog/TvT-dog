---
data: 2024-07-22
关联:
  - "[[开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364759
---
# Nginx 的作用
### 代理
正向代理是代理客户端的，让你能正常访问目的服务器。与之相反，反向代理是代理服务器的，让大量的请求均衡地访问到某一台服务器上。
### 动静分离
在我们的软件开发中，有些请求是需要后台处理的；有些请求是不需要后台处理的，比如说 css、js 这些文件请求，这些不需要经过后台处理的文件就叫静态文件。

## 基础命令
```
nginx  启动
nginx -s stop  停止
nginx -s quit  安全退出
nginx -s reload  重新加载配置文件
nginx -t  检查配置文件是否正确
ps aux|grep nginx  查看nginx进程
```
## Nginx 的配置
### 基础结构图
```
main        # 全局配置
├── events  # 配置网络连接
├── http    # 配置代理、缓存、日志等
│   ├── upstream # 配置负载均衡
│   ├── server   # 配置虚拟主机，可以有多个 server
│   ├── server
│   │   ├── location  # 用于匹配 URI（URL 是 URI 的一种），可以有多个 location
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...

```
### 默认配置
```
worker_processes  1; # Nginx 进程数，一般设置为和 CPU 核数一样

events {
    worker_connections  1024; # 每个进程允许最大并发数
}

http {
    include       mime.types; # 文件扩展名与类型映射表
    default_type  application/octet-stream;

    sendfile        on; # 开启高效传输模式
    keepalive_timeout  65; # 保持连接的时间，也叫超时时间，单位秒

    server {
        listen       8080; # 配置监听的端口
        server_name  localhost; # 配置的域名

        location / {
            root   html; # 网站根目录
            index  index.html index.htm; # 默认首页文件
        }

        error_page   500 502 503 504  /50x.html; # 默认50x对应的访问页面
        location = /50x.html {
            root   html;
        }
    }

    include servers/*; # 加载子配置项
}

```

### 反向代理
```
http {
    server {
        listen 80;
        server_name api.example.com;

        location / {            用于匹配特定的请求 URI，并定义这些请求的处理方式。
            proxy_pass http://backend_api_server;   Nginx 将请求转发到的目标服务器地址，即 http://backend_static_server。
            proxy_set_header Host $host;   请求头通常包含原始请求中的主机名（即客户端请求的目标域名）。
            proxy_set_header X-Real-IP $remote_addr;    请求头用于添加客户端 IP 地址到一个链中，这个链包含了客户端到 Nginx 之间所有代理的 IP 地址。
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  是 Nginx 内置变量，它自动将客户端 IP 地址添加到现有的 X-Forwarded-For 头中，如果请求中已经存在这个头，则追加客户端 IP 地址。确保后端服务器能够接收到完整的客户端 IP 地址链
        }
    }

    server {
        listen 80;
        server_name static.example.com;

        location / {
            proxy_pass http://backend_static_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```



## 参考链接
https://javabetter.cn/nginx/nginx.html