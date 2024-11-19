---
data: 2024-07-24
关联:
  - "[[book/知识笔记/开发/Java开发/Java开发]]"
  - "[[book/知识笔记/渗透/外网打点/外网打点]]"
---
```
/不能希望下面这段代码能够直接运行，因为省略了很多东西
import org.apache.http.impl.client.HttpClients;

@GetMapping(value = "/proxy")
public void ssrftest(@RequestParam String url){
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpget = new HttpGet(url);
        HttpResponse response = httpclient.execute(httpget);
}
```



记录下可以发送请求Java方法
```
//javax.imageio.ImageIO 这个类库可以远程访问url
"ImageIO.read"
"OkHttpClient.newCall"
//因为kcx的bug，无法建立数据流，因此只能通过函数名找到数据,9.4版本后可以删掉这一行
"newCall"
//org.springframework.web.client.RestTemplate
"getForEntity"
"getForObject"
"postForLocation"
"getForObject"
"*.restTemplate.exchange"
"*.restTemplate.execute"

"HttpGet"
"HttpPost"
"HttpPut"
"HttpDelet"
//org.apache.commons.httpclient.methods
"PostMethod"
"GetMethod"
"PutMethod"
"DeleteMethod"
//org.springframework.web.client.RestTemplate
"getForEntity"
"getForObject"
"postForLocation"
"postForObject"
"restTemplate.exchange"
"restTemplate.execute"
//快手特有方法
"safeDownload"
```
