---
data: 2024-06-29
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/基础漏洞]]"
title: CSRF初识
---
## 基本原理
- 受害者登录a.com，并保留了登录凭证（Cookie）。
- 攻击者引诱受害者访问了b.com。
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie。
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
- a.com以受害者的名义执行了act=xx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1719668245038-54af4b25-0351-456b-92c4-dcea83af6ca9.png)

## 常见的攻击类型

### GET类型

~~~
![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
~~~
### POST类型

~~~
<form action="http://bank.example/withdraw" method=POST> 
  <input type="hidden" name="account" value="xiaoming" /> 
  <input type="hidden" name="amount" value="10000" /> 
  <input type="hidden" name="for" value="hacker" /> 
</form> <script> document.forms[0].submit(); </script>
~~~
### 链接型

~~~
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank"> 重磅消息！！ <a/>
~~~

## 防御手段

### 同源检测

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：、

- Origin Header
- Referer Header

假设我们有以下场景:

一个网页 `https://example.com/page.html` 中包含一个 AJAX 请求,向 `https://api.example.com/data` 发送跨域请求。

**Origin Header**:
~~~
POST /data HTTP/1.1
Host: api.example.com
Origin: https://example.com
~~~

**Referer Header**:
~~~
POST /data HTTP/1.1
Host: api.example.com
Referer: https://example.com/page.html
~~~

~~~
![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
~~~

### CSRF Token

而CSRF攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开，也可以防范CSRF的攻击。

CSRF Token 的工作原理如下:

1. 当用户首次访问网站时,服务器会生成一个随机的 CSRF Token 值,并将其存储在服务器端(
2. 同时,服务器会将这个 CSRF Token 值返回给客户端,通常是放在表单的隐藏字段或者 cookie 
3. 当用户提交表单或执行其他需要验证 CSRF 的操作时,客户端会自动将 CSRF Token 值随请求一起发送到服务器。
4. 服务器接收到请求后,会检查 CSRF Token 值是否与服务器端存储的一致。如果一致,则认为是合法请求,否则拒绝该请求。

~~~
http://url/?csrftoken=tokenvalue%E3%80%82
~~~
### 双重Cookie验证

利用CSRF攻击不能获取到用户Cookie的特点，我们可以要求Ajax和表单请求携带一个Cookie中的值。与CSRF Token的区别就是使用了浏览器本身的cookie来进行验证。

~~~
https://www.a.com/comment?csrfcookie=v8g9e4ksfhw
~~~
### Samesite Cookie属性

防止CSRF攻击的办法已经有上面的预防措施。为了从源头上解决这个问题，Google起草了一份草案来改进HTTP协议，那就是为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax，下面分别讲解：

 **Samesite=Strict**
 
 ~~~
 Set-Cookie: foo=1; Samesite=Strict 
 Set-Cookie: bar=2; Samesite=Lax 
 Set-Cookie: baz=3
 ~~~
 我们在 a.com 下发起对 b.com 的任意请求，foo 这个 Cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求都不会带上那个 Cookie。
 
 **Samesite=Lax**

~~~
Set-Cookie: foo=1; Samesite=Strict 
Set-Cookie: bar=2; Samesite=Lax 
Set-Cookie: baz=3
~~~

用户从 a.com 点击链接进入 b.com 时，foo 这个 Cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 a.com 发起的对 b.com 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则bar也不会发送。