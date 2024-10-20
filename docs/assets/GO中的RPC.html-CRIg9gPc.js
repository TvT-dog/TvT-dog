import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app--ZYjmNcq.js";const l={};function p(r,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="rpc是什么" tabindex="-1"><a class="header-anchor" href="#rpc是什么"><span>RPC是什么</span></a></h1><p>RPC 是远程过程调用的简称，是分布式系统中不同节点间流行的通信方式。它允许客户端程序调用位于远程计算机上的服务器程序上的方法或函数,就像调用本地程序一样。</p><h1 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h1><h2 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端"><span>服务端</span></a></h2><p>RPC方法只能有两个可序列化的参数，其中第二个参数是指针类型，并且返回一个 error 类型，同时必须是公开的方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package main  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import (  </span></span>
<span class="line"><span>    &quot;fmt&quot;  </span></span>
<span class="line"><span>    &quot;log&quot;    &quot;net&quot;    &quot;net/rpc&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>type HelloService struct{}  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func (p *HelloService) Hello(request string, reply *string) error {  </span></span>
<span class="line"><span>    *reply = &quot;hello:&quot; + request  </span></span>
<span class="line"><span>    return nil  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func main() {  </span></span>
<span class="line"><span>    // 注册 HelloService    rpc.RegisterName(&quot;HelloService&quot;, new(HelloService))  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 创建 TCP 监听器  </span></span>
<span class="line"><span>    listener, err := net.Listen(&quot;tcp&quot;, &quot;:1234&quot;)  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       log.Fatal(&quot;ListenTCP error:&quot;, err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    fmt.Println(&quot;RPC server listening on :1234&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 等待并处理连接  </span></span>
<span class="line"><span>    for {  </span></span>
<span class="line"><span>       conn, err := listener.Accept()  </span></span>
<span class="line"><span>       if err != nil {  </span></span>
<span class="line"><span>          log.Fatal(&quot;Accept error:&quot;, err)  </span></span>
<span class="line"><span>       }  </span></span>
<span class="line"><span>       go rpc.ServeConn(conn)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 rpc.Register 函数调用会将对象类型中所有满足 RPC 规则的对象方法注册为 RPC 函数，所有注册的方法会放在 “HelloService” 服务空间之下。然后我们建立一个唯一的 TCP 连接，并且通过 rpc.ServeConn 函数在该 TCP 连接上为对方提供 RPC 服务。</p><h2 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端"><span>客户端</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package main  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import (  </span></span>
<span class="line"><span>    &quot;fmt&quot;  </span></span>
<span class="line"><span>    &quot;log&quot;    &quot;net/rpc&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func main() {  </span></span>
<span class="line"><span>    client, err := rpc.Dial(&quot;tcp&quot;, &quot;localhost:1234&quot;)  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       log.Fatal(&quot;dialing:&quot;, err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    var reply string  </span></span>
<span class="line"><span>    err = client.Call(&quot;HelloService.Hello&quot;, &quot;xxx&quot;, &amp;reply)  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       log.Fatal(err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    fmt.Println(reply)  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先是通过 rpc.Dial 拨号 RPC 服务，然后通过 client.Call 调用具体的 RPC 方法。在调用 client.Call 时，第一个参数是用点号连接的 RPC 服务名字和方法名字，第二和第三个参数分别我们定义 RPC 方法的两个参数。</p><h1 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h1><p>https://chai2010.cn/advanced-go-programming-book/ch4-rpc/ch4-01-rpc-intro.html</p>`,12)]))}const d=s(l,[["render",p],["__file","GO中的RPC.html.vue"]]),o=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Go%E5%BC%80%E5%8F%91/GO%E4%B8%AD%E7%9A%84RPC.html","title":"RPC是什么","lang":"zh-CN","frontmatter":{"data":"2024-08-24T00:00:00.000Z","关联":["[[Go开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18378149","description":"RPC是什么 RPC 是远程过程调用的简称，是分布式系统中不同节点间流行的通信方式。它允许客户端程序调用位于远程计算机上的服务器程序上的方法或函数,就像调用本地程序一样。 简单使用 服务端 RPC方法只能有两个可序列化的参数，其中第二个参数是指针类型，并且返回一个 error 类型，同时必须是公开的方法 其中 rpc.Register 函数调用会将对象...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Go%E5%BC%80%E5%8F%91/GO%E4%B8%AD%E7%9A%84RPC.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"RPC是什么"}],["meta",{"property":"og:description","content":"RPC是什么 RPC 是远程过程调用的简称，是分布式系统中不同节点间流行的通信方式。它允许客户端程序调用位于远程计算机上的服务器程序上的方法或函数,就像调用本地程序一样。 简单使用 服务端 RPC方法只能有两个可序列化的参数，其中第二个参数是指针类型，并且返回一个 error 类型，同时必须是公开的方法 其中 rpc.Register 函数调用会将对象..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RPC是什么\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"服务端","slug":"服务端","link":"#服务端","children":[]},{"level":2,"title":"客户端","slug":"客户端","link":"#客户端","children":[]}],"readingTime":{"minutes":1.44,"words":432},"filePathRelative":"开发/Go开发/GO中的RPC.md","autoDesc":true}');export{d as comp,o as data};
