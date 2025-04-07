import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-BBhHcAey.js";const l={};function p(c,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="frida调试" tabindex="-1"><a class="header-anchor" href="#frida调试"><span>frida调试</span></a></h1><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><p><code>frida</code>是平台原生<code>app</code>的<code>Greasemonkey</code>，说的专业一点，就是一种动态插桩工具，可以插入一些代码到原生<code>app</code>的内存空间去，（动态地监视和修改其行为），这些原生平台可以是<code>Win</code>、<code>Mac</code>、<code>Linux</code>、<code>Android</code>或者<code>iOS</code>。而且<code>frida</code>还是开源的。</p><p><code>Greasemonkey</code>可能大家不明白，它其实就是<code>firefox</code>的一套插件体系，使用它编写的脚本可以直接改变<code>firefox</code>对网页的编排方式，实现想要的任何功能。而且这套插件还是外挂的，非常灵活机动。<code>frida</code>也是一样的道理。在一个js代码中学习我们的一个hook逻辑，然后再python进行相关一个运行。</p><h2 id="安装教程" tabindex="-1"><a class="header-anchor" href="#安装教程"><span>安装教程</span></a></h2><p><a href="https://www.cnblogs.com/eliwang/p/17729247.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/eliwang/p/17729247.html</a></p><h2 id="java层hook代码编写" tabindex="-1"><a class="header-anchor" href="#java层hook代码编写"><span>JAVA层Hook代码编写</span></a></h2><p>这里我们主要会用到Java.perform来进行相关处理。</p><p><code>Java.perform()</code> 是 Frida 框架提供的一个重要 API,用于在 Android 应用程序的 Java 运行时环境中执行代码。</p><ul><li><code>Java.perform()</code> 方法接受一个回调函数作为参数,该函数包含要执行的 Java 代码。</li><li>回调函数内部可以使用各种 Frida API 来与 Java 运行时进行交互,例如: <ul><li><code>Java.use()</code>: 获取 Java 类的引用</li><li><code>Java.choose()</code>: 枚举正在运行的 Java 对象</li><li><code>Java.cast()</code>: 类型转换</li><li><code>Java.field()</code> 和 <code>Java.method()</code>: 访问类的字段和方法</li></ul></li></ul><h3 id="app定位" tabindex="-1"><a class="header-anchor" href="#app定位"><span>app定位</span></a></h3><p>我们一般使用frida.get_device和attach方法来连接上 frida-server并确定对应的app程序。<br><code>get_device()</code>我们一般为空，它可以自动检测连接到的安卓设备。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>device = frida.get_device()</span></span>
<span class="line"><span>app = device.attach(package_name)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hook参数、修改结果" tabindex="-1"><a class="header-anchor" href="#hook参数、修改结果"><span>hook参数、修改结果</span></a></h3><p>我们一般使用Java.use()来确实具体的一个类。然后使用implementation方法来更换对应的一个方法体。</p><p>如下代码即为替换com.roysue.demo02.MainActivity类中的implementation方法</p><p>app代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class MainActivity extends AppCompatActivity {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    @Override  </span></span>
<span class="line"><span>    protected void onCreate(Bundle savedInstanceState) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState);  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main);  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        while (true){  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>            try {  </span></span>
<span class="line"><span>                Thread.sleep(1000);  </span></span>
<span class="line"><span>            } catch (InterruptedException e) {  </span></span>
<span class="line"><span>                e.printStackTrace();  </span></span>
<span class="line"><span>            }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>            fun(50,30);  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    void fun(int x , int y ){  </span></span>
<span class="line"><span>        Log.d(&quot;Sum&quot; , String.valueOf(x+y));  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>js代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>console.log(&quot;Script loaded successfully &quot;);  </span></span>
<span class="line"><span>Java.perform(function x() {  </span></span>
<span class="line"><span>    console.log(&quot;Inside java perform function&quot;);  </span></span>
<span class="line"><span>    //定位类  </span></span>
<span class="line"><span>    var my_class = Java.use(&quot;com.example.frida.MainActivity&quot;);  </span></span>
<span class="line"><span>    console.log(&quot;Java.Use.Successfully!&quot;);//定位类成功！  </span></span>
<span class="line"><span>    //在这里更改类的方法的实现（implementation）  </span></span>
<span class="line"><span>    my_class.fun.implementation = function(x,y){  </span></span>
<span class="line"><span>        //打印替换前的参数  </span></span>
<span class="line"><span>        console.log( &quot;original call: fun(&quot;+ x + &quot;, &quot; + y + &quot;)&quot;);  </span></span>
<span class="line"><span>        //把参数替换成2和5，依旧调用原函数  </span></span>
<span class="line"><span>        var ret_value = this.fun(2, 5);  </span></span>
<span class="line"><span>        return ret_value;  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再使用python进行加载</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import frida  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span># 连接安卓机上的frida-server  </span></span>
<span class="line"><span>device = frida.get_usb_device()    </span></span>
<span class="line"><span>session = device.attach(&quot;frida&quot;)  </span></span>
<span class="line"><span># 加载s1.js脚本  </span></span>
<span class="line"><span>with open(&quot;1.js&quot;,encoding=&quot;utf-8&quot;) as f:  </span></span>
<span class="line"><span>    script = session.create_script(f.read())  </span></span>
<span class="line"><span>script.load()  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span># 脚本会持续运行等待输入  </span></span>
<span class="line"><span>input()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hook重载函数与隐藏函数" tabindex="-1"><a class="header-anchor" href="#hook重载函数与隐藏函数"><span>hook重载函数与隐藏函数</span></a></h3><p>我们使用overload()来实现对特定函数的获取，Java.choose()方法来获取隐藏函数。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>console.log(&quot;Script loaded successfully &quot;);  </span></span>
<span class="line"><span>Java.perform(function x() {  </span></span>
<span class="line"><span>    console.log(&quot;Inside java perform function&quot;);  </span></span>
<span class="line"><span>    //定位类  </span></span>
<span class="line"><span>    var my_class = Java.use(&quot;com.example.frida.MainActivity&quot;);  </span></span>
<span class="line"><span>    console.log(&quot;Java.Use.Successfully!&quot;);//定位类成功！  </span></span>
<span class="line"><span>    //在这里更改类的方法的实现（implementation）  </span></span>
<span class="line"><span>    my_class.fun.overload(&quot;int&quot; , &quot;int&quot;).implementation = function(x,y){  </span></span>
<span class="line"><span>        //打印替换前的参数  </span></span>
<span class="line"><span>        console.log( &quot;original call: fun(&quot;+ x + &quot;, &quot; + y + &quot;)&quot;);  </span></span>
<span class="line"><span>        //把参数替换成2和5，依旧调用原函数  </span></span>
<span class="line"><span>        var ret_value = this.fun(2, 5);  </span></span>
<span class="line"><span>        return ret_value;  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    var string_class = Java.use(&quot;java.lang.String&quot;); //获取String类型  </span></span>
<span class="line"><span>     my_class.fun.overload(&quot;java.lang.String&quot;).implementation = function(x){  </span></span>
<span class="line"><span>     console.log(&quot;*************************************&quot;);  </span></span>
<span class="line"><span>     var my_string = string_class.$new(&quot;My TeSt String#####&quot;); //new一个新字符串  </span></span>
<span class="line"><span>     console.log(&quot;Original arg: &quot; +x );  </span></span>
<span class="line"><span>     var ret =  this.fun(my_string); // 用新的参数替换旧的参数，然后调用原函数获取结果  </span></span>
<span class="line"><span>     console.log(&quot;Return value: &quot;+ret);  </span></span>
<span class="line"><span>     console.log(&quot;*************************************&quot;);  </span></span>
<span class="line"><span>     return ret;  </span></span>
<span class="line"><span>};  </span></span>
<span class="line"><span>     Java.choose(&quot;com.example.frida.MainActivity&quot; , {  </span></span>
<span class="line"><span>  onMatch : function(instance){ //该类有多少个实例，该回调就会被触发多少次  </span></span>
<span class="line"><span>    console.log(&quot;Found instance: &quot;+instance);  </span></span>
<span class="line"><span>    console.log(&quot;Result of secret func: &quot; + instance.secret());  </span></span>
<span class="line"><span>  },  </span></span>
<span class="line"><span>  onComplete:function(){}  </span></span>
<span class="line"><span>});  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们就使用overload传入参数类型来实现获取重载函数。使用choose方法直接定位类来获取其中的所有方法。</p><h3 id="远程调用" tabindex="-1"><a class="header-anchor" href="#远程调用"><span>远程调用</span></a></h3><p>Frida是使用JavaScript和Python俩种语言，JavaScript 擅长在应用程序内部进行动态注入和交互,而 Python 则更适合承担复杂的分析和处理任务。这种分工合作的方式,可以让 Frida 在动态应用程序分析和修改方面发挥更强大的功能。前文我们都是使用JavaScript操作函数，但如何我们要去处理数据流，这时候就要使用python了。</p><p>同时这里使用远程调用可以让我直接去使用Native 层的方法，而不用去关心它的一个底层逻辑。</p><p>我们使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>rpc.exports = {  </span></span>
<span class="line"><span>    callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线  </span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来进行导出，JS代码如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>console.log(&quot;Script loaded successfully &quot;);  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>function callSecretFun() { //定义导出函数  </span></span>
<span class="line"><span>    Java.perform(function () { //找到隐藏函数并且调用  </span></span>
<span class="line"><span>        Java.choose(&quot;com.example.frida.MainActivity&quot;, {  </span></span>
<span class="line"><span>            onMatch: function (instance) {  </span></span>
<span class="line"><span>                console.log(&quot;Found instance: &quot; + instance);  </span></span>
<span class="line"><span>                console.log(&quot;Result of secret func: &quot; + instance.secret());  </span></span>
<span class="line"><span>            },  </span></span>
<span class="line"><span>            onComplete: function () { }  </span></span>
<span class="line"><span>        });  </span></span>
<span class="line"><span>    });  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>rpc.exports = {  </span></span>
<span class="line"><span>    callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线  </span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在pytho使用 script.exports_sync.callsecretfunction()进行一个对应的调用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import time  </span></span>
<span class="line"><span>import frida  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>def my_message_handler(message, payload):  </span></span>
<span class="line"><span>    print(message)  </span></span>
<span class="line"><span>    print(payload)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>device = frida.get_usb_device()  </span></span>
<span class="line"><span>pid = device.spawn(&quot;com.example.frida&quot;)  </span></span>
<span class="line"><span>device.resume(pid)  </span></span>
<span class="line"><span>time.sleep(1)  </span></span>
<span class="line"><span>session = device.attach(pid)  </span></span>
<span class="line"><span>with open(&quot;1.js&quot;, encoding=&quot;utf-8&quot;) as f:  </span></span>
<span class="line"><span>    script = session.create_script(f.read())  </span></span>
<span class="line"><span>script.on(&quot;message&quot;, my_message_handler)  </span></span>
<span class="line"><span>script.load()  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>command = &quot;&quot;  </span></span>
<span class="line"><span>while 1 == 1:  </span></span>
<span class="line"><span>    command = input(&quot;Enter command:\\n1: Exit\\n2: Call secret function\\nchoice:&quot;)  </span></span>
<span class="line"><span>    if command == &quot;1&quot;:  </span></span>
<span class="line"><span>        break  </span></span>
<span class="line"><span>    elif command == &quot;2&quot;:  #在这里调用  </span></span>
<span class="line"><span>        script.exports_sync.callsecretfunction()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="native-层hook代码编写" tabindex="-1"><a class="header-anchor" href="#native-层hook代码编写"><span>Native 层Hook代码编写</span></a></h2><h3 id="so文件与函数的定位" tabindex="-1"><a class="header-anchor" href="#so文件与函数的定位"><span>so文件与函数的定位</span></a></h3><p><code>Module.findExportByName</code> 是 Frida 中一个非常有用的函数,它可以用来查找给定模块中导出的函数。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 在 &quot;libc.so&quot; 模块中查找 &quot;printf&quot; 函数</span></span>
<span class="line"><span>var printfPtr = Module.findExportByName(&quot;libc.so&quot;, &quot;printf&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hook对应函数" tabindex="-1"><a class="header-anchor" href="#hook对应函数"><span>hook对应函数</span></a></h3><p><code>Interceptor.attach()</code> 用于拦截和挂钩(hook)函数调用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 拦截 libc 中的 printf 函数</span></span>
<span class="line"><span>var printfPtr = Module.findExportByName(&quot;libc.so&quot;, &quot;printf&quot;);</span></span>
<span class="line"><span>Interceptor.attach(printfPtr, {</span></span>
<span class="line"><span>    onEnter: function(args) {</span></span>
<span class="line"><span>        console.log(&quot;Calling printf with format:&quot;, Memory.readCString(args[0]));</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    onLeave: function(retval) {</span></span>
<span class="line"><span>        console.log(&quot;printf returned:&quot;, retval);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42)]))}const o=s(l,[["render",p]]),t=JSON.parse('{"path":"/docs/%E5%BC%80%E5%8F%91/%E5%AE%89%E5%8D%93/frida%E8%B0%83%E8%AF%95.html","title":"frida调试","lang":"zh-CN","frontmatter":{"data":"2024-06-27T00:00:00.000Z","tags":["安卓"],"关联":["[[安卓学习]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364741","description":"frida调试 基本概念 frida是平台原生app的Greasemonkey，说的专业一点，就是一种动态插桩工具，可以插入一些代码到原生app的内存空间去，（动态地监视和修改其行为），这些原生平台可以是Win、Mac、Linux、Android或者iOS。而且frida还是开源的。 Greasemonkey可能大家不明白，它其实就是firefox的一...","head":[["meta",{"property":"og:url","content":"https://f0rward.fun/docs/%E5%BC%80%E5%8F%91/%E5%AE%89%E5%8D%93/frida%E8%B0%83%E8%AF%95.html"}],["meta",{"property":"og:title","content":"frida调试"}],["meta",{"property":"og:description","content":"frida调试 基本概念 frida是平台原生app的Greasemonkey，说的专业一点，就是一种动态插桩工具，可以插入一些代码到原生app的内存空间去，（动态地监视和修改其行为），这些原生平台可以是Win、Mac、Linux、Android或者iOS。而且frida还是开源的。 Greasemonkey可能大家不明白，它其实就是firefox的一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-07T13:44:11.000Z"}],["meta",{"property":"article:tag","content":"安卓"}],["meta",{"property":"article:modified_time","content":"2025-04-07T13:44:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"frida调试\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-07T13:44:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\"}]}"]]},"git":{"createdTime":1744033451000,"updatedTime":1744033451000,"contributors":[{"name":"H0ld_f0rward","username":"","email":"3164750438@qq.com","commits":1}]},"readingTime":{"minutes":4.68,"words":1404},"filePathRelative":"docs/开发/安卓/frida调试.md","localizedDate":"2025年4月7日","excerpt":"\\n<h2>基本概念</h2>\\n<p><code>frida</code>是平台原生<code>app</code>的<code>Greasemonkey</code>，说的专业一点，就是一种动态插桩工具，可以插入一些代码到原生<code>app</code>的内存空间去，（动态地监视和修改其行为），这些原生平台可以是<code>Win</code>、<code>Mac</code>、<code>Linux</code>、<code>Android</code>或者<code>iOS</code>。而且<code>frida</code>还是开源的。</p>\\n<p><code>Greasemonkey</code>可能大家不明白，它其实就是<code>firefox</code>的一套插件体系，使用它编写的脚本可以直接改变<code>firefox</code>对网页的编排方式，实现想要的任何功能。而且这套插件还是外挂的，非常灵活机动。<code>frida</code>也是一样的道理。在一个js代码中学习我们的一个hook逻辑，然后再python进行相关一个运行。</p>","autoDesc":true}');export{o as comp,t as data};
