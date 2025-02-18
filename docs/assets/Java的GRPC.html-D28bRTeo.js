import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as l}from"./app--ZYjmNcq.js";const i={};function p(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置"><span>环境配置</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;  </span></span>
<span class="line"><span>&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;  </span></span>
<span class="line"><span>         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;  </span></span>
<span class="line"><span>         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;  </span></span>
<span class="line"><span>    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;groupId&gt;org.example&lt;/groupId&gt;  </span></span>
<span class="line"><span>    &lt;artifactId&gt;JAVA-GRPC&lt;/artifactId&gt;  </span></span>
<span class="line"><span>    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;properties&gt;        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;  </span></span>
<span class="line"><span>        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;  </span></span>
<span class="line"><span>        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;  </span></span>
<span class="line"><span>    &lt;/properties&gt;    &lt;dependencies&gt;        &lt;!-- gRPC core library --&gt;  </span></span>
<span class="line"><span>        &lt;dependency&gt;  </span></span>
<span class="line"><span>            &lt;groupId&gt;io.grpc&lt;/groupId&gt;  </span></span>
<span class="line"><span>            &lt;artifactId&gt;grpc-netty&lt;/artifactId&gt;  </span></span>
<span class="line"><span>            &lt;version&gt;1.56.0&lt;/version&gt; &lt;!-- 使用最新版本 --&gt;  </span></span>
<span class="line"><span>        &lt;/dependency&gt;  </span></span>
<span class="line"><span>        &lt;dependency&gt;            &lt;groupId&gt;io.grpc&lt;/groupId&gt;  </span></span>
<span class="line"><span>            &lt;artifactId&gt;grpc-protobuf&lt;/artifactId&gt;  </span></span>
<span class="line"><span>            &lt;version&gt;1.56.0&lt;/version&gt;  </span></span>
<span class="line"><span>        &lt;/dependency&gt;        &lt;dependency&gt;            &lt;groupId&gt;io.grpc&lt;/groupId&gt;  </span></span>
<span class="line"><span>            &lt;artifactId&gt;grpc-stub&lt;/artifactId&gt;  </span></span>
<span class="line"><span>            &lt;version&gt;1.56.0&lt;/version&gt;  </span></span>
<span class="line"><span>        &lt;/dependency&gt;        &lt;!-- Protocol Buffers --&gt;  </span></span>
<span class="line"><span>        &lt;dependency&gt;  </span></span>
<span class="line"><span>            &lt;groupId&gt;com.google.protobuf&lt;/groupId&gt;  </span></span>
<span class="line"><span>            &lt;artifactId&gt;protobuf-java&lt;/artifactId&gt;  </span></span>
<span class="line"><span>            &lt;version&gt;3.24.0&lt;/version&gt; &lt;!-- 使用最新版本 --&gt;  </span></span>
<span class="line"><span>        &lt;/dependency&gt;  </span></span>
<span class="line"><span>        &lt;dependency&gt;            &lt;groupId&gt;javax.annotation&lt;/groupId&gt;  </span></span>
<span class="line"><span>            &lt;artifactId&gt;javax.annotation-api&lt;/artifactId&gt;  </span></span>
<span class="line"><span>            &lt;version&gt;1.3.2&lt;/version&gt;  </span></span>
<span class="line"><span>        &lt;/dependency&gt;    &lt;/dependencies&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;build&gt;        &lt;extensions&gt;            &lt;extension&gt;                &lt;groupId&gt;kr.motd.maven&lt;/groupId&gt;  </span></span>
<span class="line"><span>                &lt;artifactId&gt;os-maven-plugin&lt;/artifactId&gt;  </span></span>
<span class="line"><span>                &lt;version&gt;1.6.2&lt;/version&gt;  </span></span>
<span class="line"><span>            &lt;/extension&gt;        &lt;/extensions&gt;        &lt;plugins&gt;            &lt;plugin&gt;                &lt;groupId&gt;org.xolstice.maven.plugins&lt;/groupId&gt;  </span></span>
<span class="line"><span>                &lt;artifactId&gt;protobuf-maven-plugin&lt;/artifactId&gt;  </span></span>
<span class="line"><span>                &lt;version&gt;0.6.1&lt;/version&gt;  </span></span>
<span class="line"><span>                &lt;configuration&gt;                    &lt;!--suppress UnresolvedMavenProperty --&gt;  </span></span>
<span class="line"><span>                    &lt;protocArtifact&gt;com.google.protobuf:protoc:3.19.2:exe:\${os.detected.classifier}&lt;/protocArtifact&gt;  </span></span>
<span class="line"><span>                    &lt;pluginId&gt;grpc-java&lt;/pluginId&gt;  </span></span>
<span class="line"><span>                    &lt;!--suppress UnresolvedMavenProperty --&gt;  </span></span>
<span class="line"><span>                    &lt;pluginArtifact&gt;io.grpc:protoc-gen-grpc-java:1.44.1:exe:\${os.detected.classifier}&lt;/pluginArtifact&gt;  </span></span>
<span class="line"><span>                &lt;/configuration&gt;                &lt;executions&gt;                    &lt;execution&gt;                        &lt;goals&gt;                            &lt;goal&gt;compile&lt;/goal&gt;  </span></span>
<span class="line"><span>                            &lt;goal&gt;compile-custom&lt;/goal&gt;  </span></span>
<span class="line"><span>                        &lt;/goals&gt;                    &lt;/execution&gt;                &lt;/executions&gt;            &lt;/plugin&gt;        &lt;/plugins&gt;    &lt;/build&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>&lt;/project&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="代码生成" tabindex="-1"><a class="header-anchor" href="#代码生成"><span>代码生成</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 声明版本  </span></span>
<span class="line"><span>syntax = &quot;proto3&quot;;   </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>//服务方法,接受客户端参数,返回服务端响应  </span></span>
<span class="line"><span>service SayHello {  </span></span>
<span class="line"><span>  rpc SayHello(HelloRequest) returns (HelloResponse) {}  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>//类似结构体  </span></span>
<span class="line"><span>message HelloRequest {  </span></span>
<span class="line"><span>  string username = 1;  </span></span>
<span class="line"><span>  int64 code = 2;  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>message HelloResponse {  </span></span>
<span class="line"><span>  string responseMsg = 1;  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后点击idea的maven为所有项目生成源代码并更新文件夹，来生成对应的java代码。</p><h1 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端"><span>客户端</span></a></h1><h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class Main {  </span></span>
<span class="line"><span>    public static void main(String[] args) {  </span></span>
<span class="line"><span>        // 创建 gRPC 连接  </span></span>
<span class="line"><span>        ManagedChannel channel = ManagedChannelBuilder.forAddress(&quot;localhost&quot;, 2333)  </span></span>
<span class="line"><span>                .usePlaintext() // 使用明文传输  </span></span>
<span class="line"><span>                .build();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 创建客户端存根  </span></span>
<span class="line"><span>        SayHelloGrpc.SayHelloBlockingStub stub = SayHelloGrpc.newBlockingStub(channel);  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 创建请求  </span></span>
<span class="line"><span>        Hello.HelloRequest request = Hello.HelloRequest.newBuilder()  </span></span>
<span class="line"><span>                .setUsername(&quot;World java&quot;)  </span></span>
<span class="line"><span>                .setCode(12345)  </span></span>
<span class="line"><span>                .build();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 发送请求并接收响应  </span></span>
<span class="line"><span>        Hello.HelloResponse response = stub.sayHello(request);  </span></span>
<span class="line"><span>        System.out.println(&quot;Response: &quot; + response.getResponseMsg());  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 关闭通道  </span></span>
<span class="line"><span>        channel.shutdown();  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="managedchannel创建" tabindex="-1"><a class="header-anchor" href="#managedchannel创建"><span>ManagedChannel创建</span></a></h2><p>ManagedChannel 是 gRPC Java 中用于与 gRPC 服务器进行通信的主要接口。它提供了一种安全且高效的方式来管理连接。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 创建 gRPC 连接</span></span>
<span class="line"><span>ManagedChannel channel = ManagedChannelBuilder.forAddress(&quot;localhost&quot;, 2333).usePlaintext().build();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里usePlaintext()代表使用明文进行传输。</p><h2 id="存根创建" tabindex="-1"><a class="header-anchor" href="#存根创建"><span>存根创建</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>SayHelloGrpc.SayHelloBlockingStub stub = SayHelloGrpc.newBlockingStub(channel);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="方法调用" tabindex="-1"><a class="header-anchor" href="#方法调用"><span>方法调用</span></a></h2><p>我们有了存根，那么调用方法就很简单了。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Hello.HelloRequest request = Hello.HelloRequest.newBuilder()  </span></span>
<span class="line"><span>        .setUsername(&quot;World java&quot;)  </span></span>
<span class="line"><span>        .setCode(12345)  </span></span>
<span class="line"><span>        .build();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>// 发送请求并接收响应  </span></span>
<span class="line"><span>Hello.HelloResponse response = stub.sayHello(request);  </span></span>
<span class="line"><span>System.out.println(&quot;Response: &quot; + response.getResponseMsg());</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建对应的请求和回应对象，然后通过存根调用方法即可。</p><h1 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端"><span>服务端</span></a></h1><h2 id="代码示例-1" tabindex="-1"><a class="header-anchor" href="#代码示例-1"><span>代码示例</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>public class HelloServer extends SayHelloGrpc.SayHelloImplBase {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    @Override  </span></span>
<span class="line"><span>    public void sayHello(Hello.HelloRequest req, StreamObserver&lt;Hello.HelloResponse&gt; responseObserver) {  </span></span>
<span class="line"><span>        String message = &quot;Hello &quot; + req.getUsername() + &quot;\\nYour code is: &quot; + req.getCode();  </span></span>
<span class="line"><span>        Hello.HelloResponse response = Hello.HelloResponse.newBuilder()  </span></span>
<span class="line"><span>                .setResponseMsg(message)  </span></span>
<span class="line"><span>                .build();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 发送响应  </span></span>
<span class="line"><span>        responseObserver.onNext(response);  </span></span>
<span class="line"><span>        responseObserver.onCompleted();  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    public static void main(String[] args) throws IOException, InterruptedException {  </span></span>
<span class="line"><span>        // 创建 gRPC 服务器  </span></span>
<span class="line"><span>        Server server = ServerBuilder.forPort(2333)  </span></span>
<span class="line"><span>                .addService(new HelloServer())  </span></span>
<span class="line"><span>                .build()  </span></span>
<span class="line"><span>                .start();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        System.out.println(&quot;Server started on port 2333...&quot;);  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 等待服务器停止  </span></span>
<span class="line"><span>        server.awaitTermination();  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务端创建" tabindex="-1"><a class="header-anchor" href="#服务端创建"><span>服务端创建</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public static void main(String[] args) throws IOException, InterruptedException {  </span></span>
<span class="line"><span>    // 创建 gRPC 服务器  </span></span>
<span class="line"><span>    Server server = ServerBuilder.forPort(2333)  </span></span>
<span class="line"><span>            .addService(new HelloServer())  </span></span>
<span class="line"><span>            .build()  </span></span>
<span class="line"><span>            .start();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    System.out.println(&quot;Server started on port 2333...&quot;);  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 等待服务器停止  </span></span>
<span class="line"><span>    server.awaitTermination();  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里类似于客户端的存根创建，我们这里创建服务端并进行服务绑定。</p><h2 id="服务创建" tabindex="-1"><a class="header-anchor" href="#服务创建"><span>服务创建</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class HelloServer extends SayHelloGrpc.SayHelloImplBase {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    @Override  </span></span>
<span class="line"><span>    public void sayHello(Hello.HelloRequest req, StreamObserver&lt;Hello.HelloResponse&gt; responseObserver) {  </span></span>
<span class="line"><span>        String message = &quot;Hello &quot; + req.getUsername() + &quot;\\nYour code is: &quot; + req.getCode();  </span></span>
<span class="line"><span>        Hello.HelloResponse response = Hello.HelloResponse.newBuilder()  </span></span>
<span class="line"><span>                .setResponseMsg(message)  </span></span>
<span class="line"><span>                .build();  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 发送响应  </span></span>
<span class="line"><span>        responseObserver.onNext(response);  </span></span>
<span class="line"><span>        responseObserver.onCompleted();  </span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接继承生成的对应类，然后我们在对应的方法中填写对应的逻辑即可。这里的StreamObserver&lt;Hello.HelloResponse&gt; responseObserver类有常用的3个方法：</p><ul><li>onNext(HelloResponse response): 用于发送一个响应对象到客户端。</li><li>onCompleted(): 指示所有响应已经发送完成，客户端可以结束处理。</li><li>onError(Throwable t): 用于在发生错误时向客户端报告错误。</li></ul>`,28)]))}const c=n(i,[["render",p],["__file","Java的GRPC.html.vue"]]),o=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84GRPC.html","title":"环境配置","lang":"zh-CN","frontmatter":{"data":"2024-09-01T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18391569","description":"环境配置 代码生成 然后点击idea的maven为所有项目生成源代码并更新文件夹，来生成对应的java代码。 客户端 代码示例 ManagedChannel创建 ManagedChannel 是 gRPC Java 中用于与 gRPC 服务器进行通信的主要接口。它提供了一种安全且高效的方式来管理连接。 这里usePlaintext()代表使用明文进行传...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84GRPC.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"环境配置"}],["meta",{"property":"og:description","content":"环境配置 代码生成 然后点击idea的maven为所有项目生成源代码并更新文件夹，来生成对应的java代码。 客户端 代码示例 ManagedChannel创建 ManagedChannel 是 gRPC Java 中用于与 gRPC 服务器进行通信的主要接口。它提供了一种安全且高效的方式来管理连接。 这里usePlaintext()代表使用明文进行传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"环境配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"代码示例","slug":"代码示例","link":"#代码示例","children":[]},{"level":2,"title":"ManagedChannel创建","slug":"managedchannel创建","link":"#managedchannel创建","children":[]},{"level":2,"title":"存根创建","slug":"存根创建","link":"#存根创建","children":[]},{"level":2,"title":"方法调用","slug":"方法调用","link":"#方法调用","children":[]},{"level":2,"title":"代码示例","slug":"代码示例-1","link":"#代码示例-1","children":[]},{"level":2,"title":"服务端创建","slug":"服务端创建","link":"#服务端创建","children":[]},{"level":2,"title":"服务创建","slug":"服务创建","link":"#服务创建","children":[]}],"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"开发/Java开发/Java的GRPC.md","autoDesc":true}');export{c as comp,o as data};
