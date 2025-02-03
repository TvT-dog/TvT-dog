---
data: 2024-11-06
关联:
  - "[[book/知识笔记/渗透/外网打点/Nginx漏洞/Nginx漏洞|Nginx漏洞]]"
title: HOST碰撞
---
## HOST碰撞
### 反向代理配置
我们先了解一下nginx是如何配置内外网api
```
http {
    server {
        listen 80;
        server_name api.example.com;

        location / {
            proxy_pass http://backend_api_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
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


我们来看看一个正常网站访问使用了反向代理网站的基本流程：

1. **用户**：用户开始访问网站。
2. **打开浏览器**：用户在浏览器中输入网址。
3. **输入 `http://user.testmiao.com`**：用户在地址栏输入目标网址。
4. **解析主机名 `user.testmiao.com`**：浏览器开始解析这个域名。
    - **5.1. 查询本地hosts文件**：浏览器首先检查本地的 `hosts` 文件，看是否有对应的IP地址映射。
        - `C:\Windows\System32\drivers\etc\hosts`
        - `ip地址 主机名`
        - `127.0.0.1 localhost`
    - **5.2. DNS服务器（互联网域名服务器）**：如果本地 `hosts` 文件中没有找到，浏览器会查询DNS服务器来获取IP地址。
        - `主机名 ip地址`
        - `xxx.xxx.xxx.xxx xxx.xxx.xxx.xxx`
        - `203.119.202.223 user.testmiao.com`
    - **5.3. 请求对应后端服务器**：一旦获取到IP地址，浏览器会向该IP地址发送请求。
        - `a.testmiao.com`
        - `b.testmiao.com`
        - `c.testmiao.com`
        - `user.testmiao.com`
    - **5.4. nginx服务器-反向代理**：nginx服务器作为反向代理，将请求转发到后端服务器。
        - `多个域名解析到同一个ip`
        - `服务器ip: 203.119.202.223`
    - **5.5. 通过host解析到对应的web应用**：nginx根据请求的 `Host` 头部信息，将请求转发到对应的web应用。
    - **5.6. 返回对应的web资源**：后端服务器处理请求并返回相应的网页资源给用户。

那么如果我想让外部无法访问我的服务怎么做,一般是直接去除nginx和域名对应的解析。但是实际环境中，很多时候只是去除域名对应的解析，或者存在一部分的nginx没有去除。这时候直接那域名去访问的nginx服务器，还是可以访问到服务。

那么到这里我们的思路就理清楚了，我们后续要做的事情就是：
- 找到没有去除的nginx服务器
- 让nginx认为我们是内网服务

这里去找nginx服务器的行为就是本文的碰撞一词的由来.
### 攻击流程
```
第一步:   
    收集目标域名  
    PS: 内外网的域名都要  
第二步:   
    收集目标 ip 段  
第三步:   
    将外网域名保存为一个 hostList.txt 备用  
第四步:   
    将外网域名全部 ping 一下获取一下 ip,并将收集到的目标 ip 段加外网域名 ip 段保存为一个 ipList.txt 备用  
    PS: 只要外网可访问的 ip 哦  
第五步:  
    将收集到的 ipList.txt 与 hostList.txt 进行 host 碰撞检测  
第六步:  
    将可以互相解析的 ip 提取出来  
    例如:  
        域名: aa.testmiao.com 解析的 ip: 42.169.88.55  
        域名: bb.testmiao.com 解析的 ip: 42.142.165.49  
        ip:42.169.88.55 修改 host 为:bb.testmiao.com  
        然后打开: bb.testmiao.com 显示的还是 bb.testmiao.com 的内容  
        这就说明有价值了 :)  
第七步:  
    重点测试提取的 ip 进行 host 碰撞爆破  
    例如:  
        域名: aa.testmiao.com 解析的 ip: 42.169.88.55  
        自己构造常见的内网重要的域名  
        如:  
            oa.testmiao.com  
            user.testmiao.com  
            mail.testmiao.com  
            sso.testmiao.com  
            portal.testmiao.com
```

当然我们实际攻击直接使用现成工具即可
https://github.com/pmiaowu/HostCollision