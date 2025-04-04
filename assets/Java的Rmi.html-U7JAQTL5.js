import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-B60ElMD-.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="什么是rmi" tabindex="-1"><a class="header-anchor" href="#什么是rmi"><span>什么是Rmi</span></a></h1><p>RMI（Remote Method Invocation）的全称为远程方法调用。远程方法调用是分布式编程中的一个基本思想。实现远程方法调用的技术有很多，比如：CORBA、WebService，这两种都是独立于编程语言的。而Java RMI（Java Remote Method Invocation）是专为Java环境设计的远程方法调用机制，能够让一台Java虚拟机上的对象调用运行在另一台Java虚拟机上的对象的方法。它使客户机上运行的程序可以调用远程服务器上的对象。</p><p>具体的通信流程如下</p><ul><li>Server监听一个端口，这个端口是JVM随机选择的</li><li>Client并不知道Server远程对象的通信地址和端口，但是位于Client的Stub中包含了这些信息，并封装了底层网络操作。Client可以调用Stub上的方法，并且也可以向Stub发送方法参数。</li><li>Stub连接到Server监听的通信端口并提交参数</li><li>Server执行具体的方法，并将结果返回给Stub</li><li>Stub返回执行结果给Client。因此在Clinet看来，就好像是Stub在本地执行了这个方法。</li></ul><h1 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h1><h2 id="远程对象" tabindex="-1"><a class="header-anchor" href="#远程对象"><span>远程对象</span></a></h2><p>任何可以被远程调用方法的对象必须继承java.rmi.Remote接口，远程对象的实现类必须继承UnicastRemoteObject类。如果不继承UnicastRemoteObject类，则需要手工初始化远程对象，在远程对象的构造方法的调用UnicastRemoteObject.exportObject()静态方法。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.Remote;</span></span>
<span class="line"><span>import java.rmi.RemoteException;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public interface IHello extends Remote {</span></span>
<span class="line"><span>    public String sayHello(String name) throws RemoteException;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.RemoteException;</span></span>
<span class="line"><span>import java.rmi.server.UnicastRemoteObject;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public class RMIServer {</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    public class RMIHello extends UnicastRemoteObject implements IHello{</span></span>
<span class="line"><span>        protected RMIHello() throws RemoteException{</span></span>
<span class="line"><span>            super();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>//      在没有继承UnicastRemoteObject的时候构造函数也可以写成如下形式</span></span>
<span class="line"><span>//      protected RMIHello() throws RemoteException{</span></span>
<span class="line"><span>//          UnicastRemoteObject.exportObject(this,0);</span></span>
<span class="line"><span>//      }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String sayHello(String name) throws RemoteException {</span></span>
<span class="line"><span>            System.out.println(&quot;Hello World!&quot;);</span></span>
<span class="line"><span>            return &quot;Feng&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务器端" tabindex="-1"><a class="header-anchor" href="#服务器端"><span>服务器端</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.Remote;</span></span>
<span class="line"><span>import java.rmi.RemoteException;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public interface IHello extends Remote {</span></span>
<span class="line"><span>    public String sayHello(String name) throws RemoteException;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.Naming;</span></span>
<span class="line"><span>import java.rmi.RemoteException;</span></span>
<span class="line"><span>import java.rmi.registry.LocateRegistry;</span></span>
<span class="line"><span>import java.rmi.server.UnicastRemoteObject;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public class RMIServer {</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    public class RMIHello extends UnicastRemoteObject implements IHello {</span></span>
<span class="line"><span>        protected RMIHello() throws RemoteException{</span></span>
<span class="line"><span>            super();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String sayHello(String name) throws RemoteException {</span></span>
<span class="line"><span>            System.out.println(&quot;Hello World!&quot;);</span></span>
<span class="line"><span>            return name;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    private void register() throws Exception{</span></span>
<span class="line"><span>        RMIHello rmiHello=new RMIHello();</span></span>
<span class="line"><span>        LocateRegistry.createRegistry(1099);</span></span>
<span class="line"><span>        Naming.bind(&quot;rmi://0.0.0.0:1099/hello&quot;,rmiHello);</span></span>
<span class="line"><span>        System.out.println(&quot;Registry运行中......&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>        new RMIServer().register();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>private void register() throws Exception{</span></span>
<span class="line"><span>        RMIHello rmiHello=new RMIHello();</span></span>
<span class="line"><span>        LocateRegistry.createRegistry(1099);</span></span>
<span class="line"><span>        Naming.bind(&quot;rmi://0.0.0.0:1099/hello&quot;,rmiHello);</span></span>
<span class="line"><span>        System.out.println(&quot;Registry运行中......&quot;);</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是实现我们上文中说的Stub的传递功能即RMI Registry的注册。即让RMI Registry中保存了rmiHello远程对象的端口信息。</p><h2 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端"><span>客户端</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.Remote;</span></span>
<span class="line"><span>import java.rmi.RemoteException;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public interface IHello extends Remote {</span></span>
<span class="line"><span>    public String sayHello(String name) throws RemoteException;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package learn.rmi;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>import java.rmi.registry.LocateRegistry;</span></span>
<span class="line"><span>import java.rmi.registry.Registry;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>public class RMIClient {</span></span>
<span class="line"><span>    public static void main(String[] args) throws Exception{</span></span>
<span class="line"><span>        Registry registry= LocateRegistry.getRegistry(&quot;127.0.0.1&quot;,1099);</span></span>
<span class="line"><span>        IHello iHello=(IHello) registry.lookup(&quot;hello&quot;);</span></span>
<span class="line"><span>        System.out.println(iHello.sayHello(&quot;Feng&quot;));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端先向RMI注册表查询某个远程对象名称，来获取该远程对象的Stub。然后获取到对应的接口信息后，才会真正去获取对应的远程对象信息。</p><h1 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h1><p><a href="https://goodapple.top/archives/321" target="_blank" rel="noopener noreferrer">https://goodapple.top/archives/321</a></p>`,23)]))}const d=n(l,[["render",p]]),o=JSON.parse('{"path":"/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84Rmi.html","title":"什么是Rmi","lang":"zh-CN","frontmatter":{"data":"2024-08-05T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364750","description":"什么是Rmi RMI（Remote Method Invocation）的全称为远程方法调用。远程方法调用是分布式编程中的一个基本思想。实现远程方法调用的技术有很多，比如：CORBA、WebService，这两种都是独立于编程语言的。而Java RMI（Java Remote Method Invocation）是专为Java环境设计的远程方法调用机制...","head":[["meta",{"property":"og:url","content":"https://f0rward.fun/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84Rmi.html"}],["meta",{"property":"og:title","content":"什么是Rmi"}],["meta",{"property":"og:description","content":"什么是Rmi RMI（Remote Method Invocation）的全称为远程方法调用。远程方法调用是分布式编程中的一个基本思想。实现远程方法调用的技术有很多，比如：CORBA、WebService，这两种都是独立于编程语言的。而Java RMI（Java Remote Method Invocation）是专为Java环境设计的远程方法调用机制..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-04T09:31:55.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-04T09:31:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是Rmi\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-04T09:31:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\"}]}"]]},"git":{"createdTime":1743759115000,"updatedTime":1743759115000,"contributors":[{"name":"tangyijie.666","username":"","email":"tangyijie.666@bytedance.com","commits":1}]},"readingTime":{"minutes":2.55,"words":765},"filePathRelative":"docs/开发/Java开发/Java的Rmi.md","localizedDate":"2025年4月4日","excerpt":"\\n<p>RMI（Remote Method Invocation）的全称为远程方法调用。远程方法调用是分布式编程中的一个基本思想。实现远程方法调用的技术有很多，比如：CORBA、WebService，这两种都是独立于编程语言的。而Java RMI（Java Remote Method Invocation）是专为Java环境设计的远程方法调用机制，能够让一台Java虚拟机上的对象调用运行在另一台Java虚拟机上的对象的方法。它使客户机上运行的程序可以调用远程服务器上的对象。</p>\\n<p>具体的通信流程如下</p>\\n<ul>\\n<li>Server监听一个端口，这个端口是JVM随机选择的</li>\\n<li>Client并不知道Server远程对象的通信地址和端口，但是位于Client的Stub中包含了这些信息，并封装了底层网络操作。Client可以调用Stub上的方法，并且也可以向Stub发送方法参数。</li>\\n<li>Stub连接到Server监听的通信端口并提交参数</li>\\n<li>Server执行具体的方法，并将结果返回给Stub</li>\\n<li>Stub返回执行结果给Client。因此在Clinet看来，就好像是Stub在本地执行了这个方法。</li>\\n</ul>","autoDesc":true}');export{d as comp,o as data};
