---
title: yakit插件开发
---
## 基础理论
https://yaklang.com/products/Plugin-repository/yak-script-system
### 插件分类

官方文档中介绍存在3类：
1. 以 Webhook 为通信媒介的原生 Yak 模块，通过核心引擎启动新的 yak 执行进程来控制执行过程；
2. 以 MITM 劫持过程为基础 Hook 点的 Yak 模块，
3. 以 Yaml 为媒介封装 Nuclei PoC 的模块，本质上也是执行一段 Yak 代码，原理与（1）相同，本文将不再赘述。

但在实际开发过程中会多出code-sec插件选择。即从流量包获取输入的插件。本身设计初衷是用于数据的加解密，所以本身支持直接从流量包中获取数据。

## 实际案例

### 新增接口打标

#### 需求
获取流量包中的参数，并发包。标准请求如下
```Go
import requests

def post_data(psm, path, check_result):
    url = "https://3bhlabg1.fn.bytedance.net/"
    headers = {"content-type": "application/json"}
    json_data = {
        "path": path,
        "request": "",
        "check_result": check_result,
        "shiban_token": "xxx",
        "user_email": "xxx@bytedance.com",
        "ext": "xxx",
        "response": "",
        "psm": psm
    }
    try:
        respond = requests.post(url, headers=headers, json=json_data)
        print(respond.text)
    except:
        return
```
#### 逻辑实现
选择code-sec，便于直接获取流量包的数据。
实际代码逻辑
```Python
# codec plugin
email="xxxx"

/*
Codec Plugin 可以支持在 Codec 中自定义编码解码，自定义 Bypass 与字符串处理函数

函数定义非常简单

func(i: string) string
*/
post_data=func(path){
    json_data = {
        "path": path,
        "request": "",
        "check_result": 0,
        "shiban_token": "xxx",
        "user_email": email,
        "ext": "xxx",
        "response": "",
        "psm": ""
    }
    rsp,req=poc.Post("https://3bhlabg1.fn.bytedance.net/", poc.json(json_data))~
    req_body= io.ReadAll(req.Body)~
    return rsp,req_body
}

handle = func(origin /*string*/) {
    # handle your origin str
    url = poc.GetHTTPRequestPath(origin)
    host = poc.GetHTTPPacketHeader(origin, "Host")
    path="https://"+host+url
    rsp,req_body=post_data(path)
    if rsp.GetStatusCode()==200{
        yakit.Output(str.f("打标成功，响应体: %s", rsp.GetBody()))
        yakit.Output(str.f("打标成功，请求体: %s",req_body))
        yakit.Output(str.f("打标路径: %s", path))
    } else{
      yakit.Output(str.f("打标失败，响应体: %s", rsp.GetBody()))
      yakit.Output(str.f("打标失败，响应码: %d", rsp.GetStatusCode()))
    }
}
```
同时在插件配置中可以控制是否鼠标右键可呼出
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/qpFZKX.png)
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/l1QzYp.png)
