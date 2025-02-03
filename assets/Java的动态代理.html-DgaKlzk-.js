import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-CbjohtWB.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式"><span>代理模式</span></a></h1><p>代理模式给某一个(目标)对象提供一个代理对象，并由代理对象持有目标对象的引用。所谓代理，就是一个对象代表另一个对象执行相应的动作程序。而代理对象可以在客户端和目标对象之间起到中介的作用。</p><p>代理模式在实际的生活中场景很多，例如中介、律师、代购等行业，都是简单的代理逻辑，在这个模式下存在两个关键角色：</p><p>目标对象角色：即代理对象所代表的对象。 代理对象角色：内部含有目标对象的引用，可以操作目标对象；AOP编程就是基于这个思想。</p><h2 id="静态代理" tabindex="-1"><a class="header-anchor" href="#静态代理"><span>静态代理</span></a></h2><p>假设我们有一个接口 <code>HelloService</code>，以及它的实现类 <code>HelloServiceImpl</code>:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 接口</span></span>
<span class="line"><span>public interface HelloService {</span></span>
<span class="line"><span>    void sayHello();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实现类</span></span>
<span class="line"><span>public class HelloServiceImpl implements HelloService {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void sayHello() {</span></span>
<span class="line"><span>        System.out.println(&quot;Hello from HelloServiceImpl!&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们创建一个静态代理类 <code>HelloServiceProxy</code>，它实现了 <code>HelloService</code> 接口,并持有 <code>HelloServiceImpl</code> 的实例:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class HelloServiceProxy implements HelloService {</span></span>
<span class="line"><span>    private HelloService helloService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public HelloServiceProxy(HelloService helloService) {</span></span>
<span class="line"><span>        this.helloService = helloService;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void sayHello() {</span></span>
<span class="line"><span>        System.out.println(&quot;Before calling sayHello()&quot;);</span></span>
<span class="line"><span>        helloService.sayHello(); // 调用目标对象的方法</span></span>
<span class="line"><span>        System.out.println(&quot;After calling sayHello()&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>HelloServiceProxy</code> 中,我们在调用 <code>sayHello()</code> 方法前后分别添加了一些额外的操作。</p><p>现在,我们可以在客户端代码中使用静态代理来调用 <code>HelloService</code>:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class Main {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 创建目标对象</span></span>
<span class="line"><span>        HelloService helloService = new HelloServiceImpl();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建代理对象</span></span>
<span class="line"><span>        HelloService proxyService = new HelloServiceProxy(helloService);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 通过代理对象调用方法</span></span>
<span class="line"><span>        proxyService.sayHello();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Before calling sayHello()</span></span>
<span class="line"><span>Hello from HelloServiceImpl!</span></span>
<span class="line"><span>After calling sayHello()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中,我们创建了一个 <code>HelloServiceProxy</code> 类来代理 <code>HelloServiceImpl</code> 类。在 <code>sayHello()</code> 方法中,我们在调用目标方法前后添加了一些额外的操作。这种方式可以在不修改目标类的情况下,为目标类添加新的功能。</p><h2 id="动态代理" tabindex="-1"><a class="header-anchor" href="#动态代理"><span>动态代理</span></a></h2><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h3><p>在代购刚兴起的初期，是一些常去海外出差的人，会接代购需求，即代理人固定；后来就兴起海外代购平台，海淘等一系列产品，即用户代购需求（目标对象）由代购平台去实现，但是具体谁来操作这个就看即时分配，这个场景与动态代理的原理类似。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 动态代理的 InvocationHandler 实现</span></span>
<span class="line"><span>public class HelloServiceInvocationHandler implements InvocationHandler {</span></span>
<span class="line"><span>    private HelloService helloService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public HelloServiceInvocationHandler(HelloService helloService) {</span></span>
<span class="line"><span>        this.helloService = helloService;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span></span>
<span class="line"><span>        System.out.println(&quot;Before calling &quot; + method.getName());</span></span>
<span class="line"><span>        Object result = method.invoke(helloService, args);</span></span>
<span class="line"><span>        System.out.println(&quot;After calling &quot; + method.getName());</span></span>
<span class="line"><span>        return result;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Main {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 创建目标对象</span></span>
<span class="line"><span>        HelloService helloService = new HelloServiceImpl();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建动态代理对象</span></span>
<span class="line"><span>        HelloService proxyService = (HelloService) Proxy.newProxyInstance(</span></span>
<span class="line"><span>            helloService.getClass().getClassLoader(),</span></span>
<span class="line"><span>            new Class[]{HelloService.class},</span></span>
<span class="line"><span>            new HelloServiceInvocationHandler(helloService)</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 通过代理对象调用方法</span></span>
<span class="line"><span>        proxyService.sayHello();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="进阶特性" tabindex="-1"><a class="header-anchor" href="#进阶特性"><span>进阶特性</span></a></h3><p>我们甚至可以更极端一点，直接不要实现类，直接创建接口的逻辑。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface Greeter {</span></span>
<span class="line"><span>    void greet();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.lang.reflect.InvocationHandler;</span></span>
<span class="line"><span>import java.lang.reflect.Method;</span></span>
<span class="line"><span>import java.lang.reflect.Proxy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class GreeterProxy {</span></span>
<span class="line"><span>    public static Greeter createGreeter() {</span></span>
<span class="line"><span>        Greeter greeter = (Greeter) Proxy.newProxyInstance(</span></span>
<span class="line"><span>            Greeter.class.getClassLoader(),</span></span>
<span class="line"><span>            new Class&lt;?&gt;[] { Greeter.class },</span></span>
<span class="line"><span>            new InvocationHandler() {</span></span>
<span class="line"><span>                private Logger logger = new Logger();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                @Override</span></span>
<span class="line"><span>                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span></span>
<span class="line"><span>                    logger.log(&quot;Calling &quot; + method.getName());</span></span>
<span class="line"><span>                    Object result = method.invoke(this, args);</span></span>
<span class="line"><span>                    logger.log(&quot;Method &quot; + method.getName() + &quot; returned&quot;);</span></span>
<span class="line"><span>                    return result;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                public void greet() {</span></span>
<span class="line"><span>                    System.out.println(&quot;Hello, user!&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        return greeter;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时我们注意，我们是代理类。也就是调用某个动态代理对象的方法时，都会触发代理类的invoke方法，并传递对应的内容。</p><p>假设我们有一个 Calculator 接口:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface Calculator {</span></span>
<span class="line"><span>    int add(int a, int b);</span></span>
<span class="line"><span>    int subtract(int a, int b);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们创建一个 CalculatorImpl 类来实现这个接口:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class CalculatorImpl implements Calculator {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public int add(int a, int b) {</span></span>
<span class="line"><span>        return a + b;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public int subtract(int a, int b) {</span></span>
<span class="line"><span>        return a - b;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在,我们来创建一个动态代理类,在 invoke() 方法中添加一些额外的逻辑:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import java.lang.reflect.InvocationHandler;</span></span>
<span class="line"><span>import java.lang.reflect.Method;</span></span>
<span class="line"><span>import java.lang.reflect.Proxy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class CalculatorProxy {</span></span>
<span class="line"><span>    public static Calculator createCalculatorProxy() {</span></span>
<span class="line"><span>        return (Calculator) Proxy.newProxyInstance(</span></span>
<span class="line"><span>            CalculatorImpl.class.getClassLoader(),</span></span>
<span class="line"><span>            new Class&lt;?&gt;[] { Calculator.class },</span></span>
<span class="line"><span>            new CalculatorInvocationHandler(new CalculatorImpl())</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static class CalculatorInvocationHandler implements InvocationHandler {</span></span>
<span class="line"><span>        private final Calculator calculator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public CalculatorInvocationHandler(Calculator calculator) {</span></span>
<span class="line"><span>            this.calculator = calculator;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span></span>
<span class="line"><span>            // 在调用目标方法前记录日志</span></span>
<span class="line"><span>            System.out.println(&quot;Calling method: &quot; + method.getName());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 调用目标方法</span></span>
<span class="line"><span>            Object result = method.invoke(calculator, args);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 在调用目标方法后记录日志</span></span>
<span class="line"><span>            System.out.println(&quot;Method &quot; + method.getName() + &quot; returned: &quot; + result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return result;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Calculator calculatorProxy = CalculatorProxy.createCalculatorProxy();</span></span>
<span class="line"><span>int result = calculatorProxy.add(5, 3);</span></span>
<span class="line"><span>System.out.println(&quot;Result: &quot; + result);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h1><p>https://cloud.tencent.com/developer/article/1843361</p>`,31)]))}const t=n(l,[["render",p],["__file","Java的动态代理.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86.html","title":"代理模式","lang":"zh-CN","frontmatter":{"data":"2024-08-05T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364748","description":"代理模式 代理模式给某一个(目标)对象提供一个代理对象，并由代理对象持有目标对象的引用。所谓代理，就是一个对象代表另一个对象执行相应的动作程序。而代理对象可以在客户端和目标对象之间起到中介的作用。 代理模式在实际的生活中场景很多，例如中介、律师、代购等行业，都是简单的代理逻辑，在这个模式下存在两个关键角色： 目标对象角色：即代理对象所代表的对象。 代理...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://f0rward.fun%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E7%9A%84%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"代理模式"}],["meta",{"property":"og:description","content":"代理模式 代理模式给某一个(目标)对象提供一个代理对象，并由代理对象持有目标对象的引用。所谓代理，就是一个对象代表另一个对象执行相应的动作程序。而代理对象可以在客户端和目标对象之间起到中介的作用。 代理模式在实际的生活中场景很多，例如中介、律师、代购等行业，都是简单的代理逻辑，在这个模式下存在两个关键角色： 目标对象角色：即代理对象所代表的对象。 代理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代理模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"静态代理","slug":"静态代理","link":"#静态代理","children":[]},{"level":2,"title":"动态代理","slug":"动态代理","link":"#动态代理","children":[{"level":3,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]},{"level":3,"title":"进阶特性","slug":"进阶特性","link":"#进阶特性","children":[]}]}],"readingTime":{"minutes":3.55,"words":1065},"filePathRelative":"开发/Java开发/Java的动态代理.md","autoDesc":true}');export{t as comp,v as data};
