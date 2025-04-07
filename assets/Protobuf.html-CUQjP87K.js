import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-BBhHcAey.js";const l={};function p(r,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="什么是protobuf" tabindex="-1"><a class="header-anchor" href="#什么是protobuf"><span>什么是protobuf</span></a></h1><p>数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等<br> gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。</p><h1 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h1><p>定义一种源文件，扩展名为 <code>.proto</code>，使用这种源文件，可以定义存储类的内容(消息类型)。<br> protobuf有自己的编译器 <code>protoc</code>，可以将 <code>.proto</code> 编译成对应语言的文件，就可以进行使用了。</p><h3 id="工具安装" tabindex="-1"><a class="header-anchor" href="#工具安装"><span>工具安装</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>brew install protobuf</span></span>
<span class="line"><span>get github.com/golang/protobuf/protoc-gen-go</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件创建" tabindex="-1"><a class="header-anchor" href="#文件创建"><span>文件创建</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 指定的当前proto语法的版本，有2和3  </span></span>
<span class="line"><span>syntax = &quot;proto3&quot;;  </span></span>
<span class="line"><span>//option go_package = &quot;path;name&quot;; path 表示生成的go文件的存放地址，会自动生成目录的  </span></span>
<span class="line"><span>// name 表示生成的go文件所属的包名  </span></span>
<span class="line"><span>option go_package=&quot;/service&quot;;  </span></span>
<span class="line"><span>// 指定等会文件生成出来的package  </span></span>
<span class="line"><span>package service;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>message User {  </span></span>
<span class="line"><span>  string username = 1;  </span></span>
<span class="line"><span>  int32 age = 2;  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用命令生成对应的GO文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> protoc --go_out=. user.proto</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="代码使用" tabindex="-1"><a class="header-anchor" href="#代码使用"><span>代码使用</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package main  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import (  </span></span>
<span class="line"><span>    &quot;clinet/service&quot;  </span></span>
<span class="line"><span>    &quot;fmt&quot;    &quot;google.golang.org/protobuf/proto&quot;)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>func main() {  </span></span>
<span class="line"><span>    user := &amp;service.User{  </span></span>
<span class="line"><span>       Username: &quot;mszlu&quot;,  </span></span>
<span class="line"><span>       Age:      20,  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    //转换为protobuf  </span></span>
<span class="line"><span>    marshal, err := proto.Marshal(user) //将这个 User 对象编码为 Protobuf 格式的字节数组 ([]byte)。  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       panic(err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    newUser := &amp;service.User{}  </span></span>
<span class="line"><span>    err = proto.Unmarshal(marshal, newUser)//将字节数组解码回 User 对象  </span></span>
<span class="line"><span>    if err != nil {  </span></span>
<span class="line"><span>       panic(err)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    fmt.Println(newUser.String())  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="proto文件介绍" tabindex="-1"><a class="header-anchor" href="#proto文件介绍"><span>proto文件介绍</span></a></h1><h3 id="message使用" tabindex="-1"><a class="header-anchor" href="#message使用"><span>message使用</span></a></h3><p>一个消息类型是通过关键字message字段指定的。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>message User {</span></span>
<span class="line"><span>  string username = 1;</span></span>
<span class="line"><span>  int32 age = 2;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="字段规则" tabindex="-1"><a class="header-anchor" href="#字段规则"><span>字段规则</span></a></h4><ul><li>required string name = 1;<br> 这个字段是必填的,意味着在创建和序列化 Person 消息时,必须设置 name 字段的值。否则会报错。在 Go 中,这个字段会被生成为 string 类型。</li><li>optional int32 age = 2;<br> 这个字段是可选的,意味着在创建和序列化 Person 消息时,可以不设置 age 字段。如果不设置,则会使用该字段类型的默认值,在这里是 0。在 Go 中,这个字段会被生成为 int32 类型。</li><li>repeated string phoneNumbers = 3;<br> 这个字段是可重复的,意味着一个 Person 消息可以有多个电话号码。在序列化和反序列化过程中,这些电话号码的顺序会被保留。在 Go 中,这个字段会被生成为 []string 类型的切片。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>message Person {</span></span>
<span class="line"><span>  required string name = 1;</span></span>
<span class="line"><span>  optional int32 age = 2;</span></span>
<span class="line"><span>  repeated string phoneNumbers = 3;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 创建一个 Person 消息</span></span>
<span class="line"><span>person := &amp;Person{</span></span>
<span class="line"><span>    Name:         &quot;Alice&quot;,</span></span>
<span class="line"><span>    Age:          30,</span></span>
<span class="line"><span>    PhoneNumbers: []string{&quot;123-456-7890&quot;, &quot;987-654-3210&quot;},</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 序列化为 Protobuf 二进制数据</span></span>
<span class="line"><span>data, err := proto.Marshal(person)</span></span>
<span class="line"><span>if err != nil {</span></span>
<span class="line"><span>    // 处理错误</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 反序列化回 Person 对象</span></span>
<span class="line"><span>newPerson := &amp;Person{}</span></span>
<span class="line"><span>err = proto.Unmarshal(data, newPerson)</span></span>
<span class="line"><span>if err != nil {</span></span>
<span class="line"><span>    // 处理错误</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 输出反序列化后的 Person 对象</span></span>
<span class="line"><span>fmt.Println(newPerson)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="标识号" tabindex="-1"><a class="header-anchor" href="#标识号"><span>标识号</span></a></h4><p>在消息体的定义中，每个字段都必须要有一个唯一的标识号，标识号是[0,2^29-1]范围内的一个整数。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>message Person { </span></span>
<span class="line"><span>  string name = 1;  // (位置1)</span></span>
<span class="line"><span>  int32 id = 2;  </span></span>
<span class="line"><span>  optional string email = 3;  </span></span>
<span class="line"><span>  repeated string phones = 4; // (位置4)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="消息复杂使用" tabindex="-1"><a class="header-anchor" href="#消息复杂使用"><span>消息复杂使用</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>message PersonInfo {</span></span>
<span class="line"><span>    message Person {</span></span>
<span class="line"><span>        string name = 1;</span></span>
<span class="line"><span>        int32 height = 2;</span></span>
<span class="line"><span>        repeated int32 weight = 3;</span></span>
<span class="line"><span>    } </span></span>
<span class="line"><span>	repeated Person info = 1;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想在它的父消息类型的外部重用这个消息类型，你需要以PersonInfo.Person的形式使用它，如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>message PersonMessage {</span></span>
<span class="line"><span>	PersonInfo.Person info = 1;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义服务" tabindex="-1"><a class="header-anchor" href="#定义服务"><span>定义服务</span></a></h2><p>如果想要将消息类型用在RPC系统中，可以在.proto文件中定义一个RPC服务接口，protocol buffer 编译器将会根据所选择的不同语言生成服务接口代码及存根。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>service SearchService {</span></span>
<span class="line"><span>	//rpc 服务的函数名 （传入参数）返回（返回参数）</span></span>
<span class="line"><span>	rpc Search (SearchRequest) returns (SearchResponse);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代表表示，定义了一个RPC服务，该方法接收SearchRequest返回SearchResponse</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>service MyService {</span></span>
<span class="line"><span>  rpc GetUser(GetUserRequest) returns (GetUserResponse);</span></span>
<span class="line"><span>  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message GetUserRequest {</span></span>
<span class="line"><span>  string userId = 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message GetUserResponse {</span></span>
<span class="line"><span>  User user = 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message UpdateUserRequest {</span></span>
<span class="line"><span>  User user = 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message UpdateUserResponse {</span></span>
<span class="line"><span>  bool success = 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>message User {</span></span>
<span class="line"><span>  string name = 1;</span></span>
<span class="line"><span>  int32 age = 2;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MyService 是一个服务,它定义了两个 RPC 方法:</p><ul><li>GetUser: 输入一个 GetUserRequest，返回一个 GetUserResponse。</li><li>UpdateUser: 输入一个 UpdateUserRequest，返回一个 UpdateUserResponse。</li></ul><h1 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h1><p><a href="https://mszlu.com/grpc/01/01.html#_3-3-proto%E6%96%87%E4%BB%B6%E4%BB%8B%E7%BB%8D" target="_blank" rel="noopener noreferrer">https://mszlu.com/grpc/01/01.html#_3-3-proto文件介绍</a></p>`,36)]))}const t=n(l,[["render",p]]),o=JSON.parse('{"path":"/docs/%E5%BC%80%E5%8F%91/Protobuf.html","title":"什么是protobuf","lang":"zh-CN","frontmatter":{"data":"2024-08-24T00:00:00.000Z","关联":["[[开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18378126","description":"什么是protobuf 数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等 gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。 简单使用 定义一种源文件，扩展名为 .proto，使用这种源文件，可以定义存储类的内容(消息类型)。 protobuf有...","head":[["meta",{"property":"og:url","content":"https://f0rward.fun/docs/%E5%BC%80%E5%8F%91/Protobuf.html"}],["meta",{"property":"og:title","content":"什么是protobuf"}],["meta",{"property":"og:description","content":"什么是protobuf 数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等 gRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。 简单使用 定义一种源文件，扩展名为 .proto，使用这种源文件，可以定义存储类的内容(消息类型)。 protobuf有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-07T13:44:11.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-07T13:44:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是protobuf\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-07T13:44:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\"}]}"]]},"git":{"createdTime":1744033451000,"updatedTime":1744033451000,"contributors":[{"name":"H0ld_f0rward","username":"","email":"3164750438@qq.com","commits":1}]},"readingTime":{"minutes":3.38,"words":1013},"filePathRelative":"docs/开发/Protobuf.md","localizedDate":"2025年4月7日","excerpt":"\\n<p>数据在进行网络传输的时候，需要进行序列化，序列化协议有很多种，比如xml, json，protobuf等<br>\\ngRPC默认使用protocol buffers，这是google开源的一套成熟的结构数据序列化机制。</p>\\n<h1>简单使用</h1>\\n<p>定义一种源文件，扩展名为&nbsp;<code>.proto</code>，使用这种源文件，可以定义存储类的内容(消息类型)。<br>\\nprotobuf有自己的编译器&nbsp;<code>protoc</code>，可以将&nbsp;<code>.proto</code>&nbsp;编译成对应语言的文件，就可以进行使用了。</p>","autoDesc":true}');export{t as comp,o as data};
