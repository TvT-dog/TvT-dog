---
data: 2024-06-29
tags:
  - 外网打点
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/基础漏洞]]"
title: XSS初识
---
## 基本原理
首先javascript是控制浏览器动作的,那么XSS就可以简单理解为通过一些特殊的javascript代码来实现控制别人的浏览的行为.
## 类型
### 反射型
  这种攻击方式往往具有一次性。发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS代码。这个过程像一次反射，所以称反射型XSS。
### 存储型
  存储型XSS和反射型XSS的差别仅在于，提交的代码会存储在服务器端（数据库、内存、文件系统等），下次请求目标页面时不用再提交XSS代码。最典型的例子就是留言板XSS，用户提交一条包含XSS代码的留言存储到数据库，目标用户查看留言板时，那些留言就会从数据库中加载出来并显示，于是触发了XSS攻击
### DOM型
 首先我们要知道什么是DOM，它是用于处理 HTML 和 XML 文档的一个 API（应用程序编程接口）。操作 DOM 树,前端开发者可以动态地增加、删除、修改页面上的元素,以及改变它们的样式和内容,从而实现丰富的交互效果。这就是前端 DOM 的核心作用。
 
 简单来说就是可以理解为是特殊的反射型XSS,只不过是纯前端进行的一个渲染。

## 常见playload
```
<script>alert(1)</script>
<script>prompt(1)</script>
<svg onload=alert(1)>
<img src=x onerror="alert(1)">
<img src=x onclick="prompt(1)">
<a href="javascript:alert(1)" >click me</a>
<a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">test</a>
<iframe src="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg=="></iframe>
<input onfocus="alert(1)">
```
## 防御方式

### 输入内容长度控制

对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。
### 纯前端渲染

和应对Sql注入是一个思路，我们要去确认什么是代码什么是数据。那么大概流程就是

1. 浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。
2. 然后浏览器执行 HTML 中的 JavaScript。
3. JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。
这里的关键就是，代码和数据是明确了对应执行的流程。那么在3步骤浏览器不会被轻易的被欺骗，执行代码了。但纯前端渲染还需注意避免 DOM 型 XSS 漏洞。（例如 `onload` 事件和 `href` 中的 `javascript:xxx` 等，请参考下文”预防 DOM 型 XSS 攻击“部分）。
### 转义 HTML

如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。

常用的模板引擎，如 doT.js、ejs、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 `& < > " ' /` 这几个字符转义掉，确实能起到一定的 XSS 防护作用，但并不完善，要完善 XSS 防护措施，我们要使用更完善更细致的转义策略。例如 Java 工程里，常用的转义库为 `org.owasp.encoder`。

### DOM 型 XSS 攻击预防

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。

### 使用Content Security Policy

CSP 的基本工作原理是:

1. 网站管理员在 HTTP 响应头中添加一个 `Content-Security-Policy` 字段,指定哪些资源可以被页面加载。
2. 浏览器会读取这个 CSP 策略,并根据策略来限制页面加载的资源。

~~~
Content-Security-Policy: default-src 'self'; img-src 'self' https://example.com; script-src 'self' https://example.com
~~~

这个策略包含以下规则:
- `default-src 'self'`: 除非有更具体的规则,否则页面只能加载来自自身域名的资源。
- `img-src 'self' https://example.com`: 页面可以加载来自自身域名和 `https://example.com` 的图片资源。
- `script-src 'self' https://example.com`: 页面可以加载来自自身域名和 `https://example.com` 的 JavaScript 脚本。
- 
严格的 CSP 在 XSS 的防范中可以起到以下的作用：

- 禁止加载外域代码，防止复杂的攻击逻辑。
- 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
- 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
- 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
- 合理使用上报可以及时发现 XSS，利于尽快修复问题。
### 其他安全措施

- HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
- 验证码：防止脚本冒充用户提交危险操作。
## 参考链接

https://tech.meituan.com/2018/09/27/fe-security.html

