import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,d as a,o as i}from"./app-C9BbSHvW.js";const l={};function p(r,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="什么是grpc" tabindex="-1"><a class="header-anchor" href="#什么是grpc"><span>什么是GRPC</span></a></h1><p>gRPC是一款语言中立、平台中立、开源的远程过程调用系统，gRPC客户端和服务端可以在多种环境中运行和交互，例如用java写一个服务端，可以用go语言写客户端调用。</p><p>数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等 gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。在学习gRPC之前，需要先了解protocol buffers</p><h1 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用"><span>基础使用</span></a></h1><h2 id="依赖安装" tabindex="-1"><a class="header-anchor" href="#依赖安装"><span>依赖安装</span></a></h2><p>安装一个对应的go插件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>brew install protoc-gen-go-grpc</span></span>
<span class="line"><span>brew install protobuf</span></span>
<span class="line"><span>go get google.golang.org/grpc</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="protobuf文件" tabindex="-1"><a class="header-anchor" href="#protobuf文件"><span>Protobuf文件</span></a></h2><p>定义对应的一个中间文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 声明版本</span></span>
<span class="line"><span>syntax = &quot;proto3&quot;;</span></span>
<span class="line"><span>//option go_package = &quot;path;name&quot; path表示生成go的存放地址,自动生成目录,name表示go文件所属包名</span></span>
<span class="line"><span>option go_package = &quot;.;service&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//服务方法,接受客户端参数,返回服务端响应</span></span>
<span class="line"><span>service SayHello {</span></span>
<span class="line"><span>  rpc SayHello(HelloRequest) returns (HelloResponse) {}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//类似结构体</span></span>
<span class="line"><span>message HelloRequest {</span></span>
<span class="line"><span>  string username = 1;</span></span>
<span class="line"><span>  int64 code = 2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message HelloResponse {</span></span>
<span class="line"><span>  string responseMsg = 1;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用命令生成对应的go文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>protoc --go_out=./  ./hello.proto</span></span>
<span class="line"><span>protoc --go-grpc_out=./ ./hello.proto</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务端代码" tabindex="-1"><a class="header-anchor" href="#服务端代码"><span>服务端代码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package main  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import (  </span></span>
<span class="line"><span>    &quot;context&quot;  </span></span>
<span class="line"><span>    &quot;fmt&quot;    &quot;google.golang.org/grpc&quot;    &quot;google.golang.org/grpc/reflection&quot;    &quot;log&quot;    &quot;net&quot;    &quot;rpc_project/service&quot;    &quot;strconv&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>type server struct {  </span></span>
<span class="line"><span>    service.UnimplementedSayHelloServer  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func (s *server) SayHello(ctx context.Context, req *service.HelloRequest) (*service.HelloResponse, error) {  </span></span>
<span class="line"><span>    fmt.Println(&quot;recv from &quot; + req.Username)  </span></span>
<span class="line"><span>    return &amp;service.HelloResponse{ResponseMsg: &quot;hello &quot; + req.Username + &quot;\\nyour code is: &quot; + strconv.Itoa(int(req.Code))}, nil  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>func main() {  </span></span>
<span class="line"><span>    lis, err := net.Listen(&quot;tcp&quot;, &quot;:2333&quot;)  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       log.Fatalf(&quot;failed to listen: %v&quot;, err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    grpcServer := grpc.NewServer()  </span></span>
<span class="line"><span>    service.RegisterSayHelloServer(grpcServer, &amp;server{})  </span></span>
<span class="line"><span>    reflection.Register(grpcServer)  </span></span>
<span class="line"><span>    fmt.Println(&quot;Listening on port 2333...&quot;)  </span></span>
<span class="line"><span>    grpcServer.Serve(lis)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端代码" tabindex="-1"><a class="header-anchor" href="#客户端代码"><span>客户端代码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package main  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import (  </span></span>
<span class="line"><span>    &quot;clinet/service&quot;  </span></span>
<span class="line"><span>    &quot;context&quot;    &quot;fmt&quot;    &quot;google.golang.org/grpc&quot;    &quot;google.golang.org/grpc/credentials/insecure&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func main() {  </span></span>
<span class="line"><span>    conn, err := grpc.Dial(&quot;127.0.0.1:2333&quot;, grpc.WithTransportCredentials(insecure.NewCredentials()))  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       return  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    defer conn.Close()  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    client := service.NewSayHelloClient(conn)  </span></span>
<span class="line"><span>    resp, _ := client.SayHello(context.Background(), &amp;service.HelloRequest{  </span></span>
<span class="line"><span>       Username: &quot;qqw&quot;,  </span></span>
<span class="line"><span>       Code:     3377,  </span></span>
<span class="line"><span>    })  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    fmt.Println(resp.GetResponseMsg())  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端"><span>服务端</span></a></h1><h2 id="方法增强" tabindex="-1"><a class="header-anchor" href="#方法增强"><span>方法增强</span></a></h2><p>gRPC 插件会为服务端和客户端生成不同的接口</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>type SayHelloClient interface {  </span></span>
<span class="line"><span>    SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloResponse, error)  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type SayHelloServer interface {  </span></span>
<span class="line"><span>    SayHello(context.Context, *HelloRequest) (*HelloResponse, error)  </span></span>
<span class="line"><span>    mustEmbedUnimplementedSayHelloServer()  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于服务端的 SayHelloServer接口可以重新实现 SayHellol服务：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>func (s *server) SayHello(ctx context.Context, req *service.HelloRequest) (*service.HelloResponse, error) {  </span></span>
<span class="line"><span>    fmt.Println(&quot;recv from &quot; + req.Username)  </span></span>
<span class="line"><span>    return &amp;service.HelloResponse{ResponseMsg: &quot;hello &quot; + req.Username + &quot;\\nyour code is: &quot; + strconv.Itoa(int(req.Code))}, nil  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就对原本的SayHello方法进行了一个对应的增强。</p><h2 id="服务创建" tabindex="-1"><a class="header-anchor" href="#服务创建"><span>服务创建</span></a></h2><p>gRPC 服务的启动流程和标准库的 RPC 服务启动流程类似。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>func main() {  </span></span>
<span class="line"><span>    lis, err := net.Listen(&quot;tcp&quot;, &quot;:2333&quot;)  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       log.Fatalf(&quot;failed to listen: %v&quot;, err)  </span></span>
<span class="line"><span>    }  //创建一个 TCP 监听器,它将监听 2333 端口上的传入连接。</span></span>
<span class="line"><span>    grpcServer := grpc.NewServer()  //创建一个新的 gRPC 服务器实例</span></span>
<span class="line"><span>    service.RegisterSayHelloServer(grpcServer, &amp;server{})  //将 SayHello 服务的实现注册到 gRPC 服务器上</span></span>
<span class="line"><span>    reflection.Register(grpcServer)  //启用了 gRPC 服务器反射功能,允许客户端检查服务器上可用的服务和方法。</span></span>
<span class="line"><span>    fmt.Println(&quot;Listening on port 2333...&quot;)  //启动 gRPC 服务器并阻塞,等待传入的连接。服务器将处理传入的请求,并将它们转发给注册的 SayHelloServer 实现。</span></span>
<span class="line"><span>    grpcServer.Serve(lis)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端"><span>客户端</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 创建一个到 gRPC 服务器的不安全连接</span></span>
<span class="line"><span>	conn, err := grpc.Dial(&quot;127.0.0.1:2333&quot;, grpc.WithTransportCredentials(insecure.NewCredentials()))</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		// 如果连接失败,直接返回</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	defer conn.Close() // 程序退出时关闭连接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 创建 SayHello 服务的客户端</span></span>
<span class="line"><span>	client := service.NewSayHelloClient(conn)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 创建一个 HelloRequest 并发送给服务器</span></span>
<span class="line"><span>	resp, _ := client.SayHello(context.Background(), &amp;service.HelloRequest{</span></span>
<span class="line"><span>		Username: &quot;qqw&quot;,</span></span>
<span class="line"><span>		Code:     3377,</span></span>
<span class="line"><span>	})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 打印服务器返回的响应消息</span></span>
<span class="line"><span>	fmt.Println(resp.GetResponseMsg())</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接凭证" tabindex="-1"><a class="header-anchor" href="#连接凭证"><span>连接凭证</span></a></h2><p>grpc.WithTransportCredentials 是一个 gRPC 连接选项,用于指定连接的安全凭证。它是用于配置 gRPC 客户端与服务器之间的安全通信的重要功能。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>conn, err := grpc.Dial(&quot;127.0.0.1:2333&quot;, grpc.WithTransportCredentials(insecure.NewCredentials()))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这里我们使用insecure.NewCredentials() 返回一个不提供任何安全凭证的 gRPC 凭证。</p><h2 id="方法调用" tabindex="-1"><a class="header-anchor" href="#方法调用"><span>方法调用</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>client := service.NewSayHelloClient(conn)  </span></span>
<span class="line"><span>resp, _ := client.SayHello(context.Background(), &amp;service.HelloRequest{  </span></span>
<span class="line"><span>    Username: &quot;qqw&quot;,  </span></span>
<span class="line"><span>    Code:     3377,  </span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们使用service.NewSayHelloClient(conn)来创建一个存根。</p><p>存根是一个代理对象，它在客户端和服务器之间充当中介，负责处理远程过程调用（RPC）。它封装了与远程服务器的通信细节。简单来说就是他代表远程的方法对象。</p><p>其中HelloRequest 和client.SayHello均为Protocol Buffers 定义的消息类型。</p><h1 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h1><p>https://mszlu.com/grpc/01/01.html#_4-2-%E5%AE%9E%E4%BE%8B https://blog.xmcve.com/2023/03/23/GRPC%E5%AD%A6%E4%B9%A0/#title-7</p>`,39)]))}const d=n(l,[["render",p],["__file","GO中GRPC.html.vue"]]),o=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Go%E5%BC%80%E5%8F%91/GO%E4%B8%ADGRPC.html","title":"什么是GRPC","lang":"zh-CN","frontmatter":{"data":"2024-08-24T00:00:00.000Z","关联":["[[Go开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18378889","description":"什么是GRPC gRPC是一款语言中立、平台中立、开源的远程过程调用系统，gRPC客户端和服务端可以在多种环境中运行和交互，例如用java写一个服务端，可以用go语言写客户端调用。 数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等 gRPC默认使用protocol buffers，这是google...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Go%E5%BC%80%E5%8F%91/GO%E4%B8%ADGRPC.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"什么是GRPC"}],["meta",{"property":"og:description","content":"什么是GRPC gRPC是一款语言中立、平台中立、开源的远程过程调用系统，gRPC客户端和服务端可以在多种环境中运行和交互，例如用java写一个服务端，可以用go语言写客户端调用。 数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等 gRPC默认使用protocol buffers，这是google..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是GRPC\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"依赖安装","slug":"依赖安装","link":"#依赖安装","children":[]},{"level":2,"title":"Protobuf文件","slug":"protobuf文件","link":"#protobuf文件","children":[]},{"level":2,"title":"服务端代码","slug":"服务端代码","link":"#服务端代码","children":[]},{"level":2,"title":"客户端代码","slug":"客户端代码","link":"#客户端代码","children":[]},{"level":2,"title":"方法增强","slug":"方法增强","link":"#方法增强","children":[]},{"level":2,"title":"服务创建","slug":"服务创建","link":"#服务创建","children":[]},{"level":2,"title":"连接凭证","slug":"连接凭证","link":"#连接凭证","children":[]},{"level":2,"title":"方法调用","slug":"方法调用","link":"#方法调用","children":[]}],"readingTime":{"minutes":3.47,"words":1042},"filePathRelative":"开发/Go开发/GO中GRPC.md","autoDesc":true}');export{d as comp,o as data};
