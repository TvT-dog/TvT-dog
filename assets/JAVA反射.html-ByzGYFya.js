import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-C1twxy1c.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h2><p>一般情况下，我们在使用某个类之前已经确定它到底是个什么类了，拿到手就直接可以使用 new关键字来调用构造方法进行初始化，之后使用这个类的对象来进行操作。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Writer writer = new Writer();</span></span>
<span class="line"><span>writer.setName(&quot;沉默王二&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>像上面这个例子，就可以理解为“正射”。而反射就意味着一开始我们不知道要初始化的类到底是什么，也就没法直接使用 new 关键字创建对象了。</p><p>我们只知道这个类的一些基本信息，就好像我们看电影的时候，为了抓住一个犯罪嫌疑人，警察就会问一些目击证人，根据这些证人提供的信息，找专家把犯罪嫌疑人的样貌给画出来——这个过程，就可以称之为反射。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Class clazz = Class.forName(&quot;com.itwanger.s39.Writer&quot;);</span></span>
<span class="line"><span>Method method = clazz.getMethod(&quot;setName&quot;, String.class);</span></span>
<span class="line"><span>Constructor constructor = clazz.getConstructor();</span></span>
<span class="line"><span>Object object = constructor.newInstance();</span></span>
<span class="line"><span>method.invoke(object,&quot;沉默王二&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反射的主要应用场景有：</p><ul><li>开发通用框架：像 Spring，为了保持通用性，通过配置文件来加载不同的对象，调用不同的方法。</li><li>动态代理：在面向切面编程中，需要拦截特定的方法，就会选择动态代理的方式，而动态代理的底层技术就是反射。</li><li>注解：注解本身只是起到一个标记符的作用，它需要利用发射机制，根据标记符去执行特定的行为。</li></ul><h2 id="具体使用" tabindex="-1"><a class="header-anchor" href="#具体使用"><span>具体使用</span></a></h2><h3 id="获取-class-类对象" tabindex="-1"><a class="header-anchor" href="#获取-class-类对象"><span>获取 Class 类对象</span></a></h3><ul><li>通过实例获取</li><li>通过类名获取</li><li>通过全限定名获取</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class reflectdemo1 {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Class&lt;?&gt; stuclz1 = Class.forName(&quot;org.basicdemo.reflect.student&quot;);</span></span>
<span class="line"><span>            System.out.println(&quot;Class.forName: &quot; + stuclz1);</span></span>
<span class="line"><span>        } catch (ClassNotFoundException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        student stu = new student();</span></span>
<span class="line"><span>        Class stuclz2 = stu.getClass();</span></span>
<span class="line"><span>        System.out.println(&quot;对象.getClass(): &quot; + stuclz2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Class stuclz3 = student.class;</span></span>
<span class="line"><span>        System.out.println(&quot;类名.class: &quot; + stuclz3);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建对应实例" tabindex="-1"><a class="header-anchor" href="#创建对应实例"><span>创建对应实例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class m {</span></span>
<span class="line"><span>    public static void main(String[] args) throws NoSuchMethodException {</span></span>
<span class="line"><span>        Class&lt;?&gt; stuclz1 = null;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            stuclz1 = Class.forName(&quot;javax.swing.AbstractAction&quot;);</span></span>
<span class="line"><span>            System.out.println(&quot;Class.forName: &quot; + stuclz1);</span></span>
<span class="line"><span>        } catch (ClassNotFoundException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Class stuclz3 = AbstractAction.class;</span></span>
<span class="line"><span>        System.out.println(&quot;类名.class: &quot; + stuclz3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取所有公有(public)构造方法</span></span>
<span class="line"><span>        System.out.println(&quot;===========获取所有公有构造方法=========&quot;);</span></span>
<span class="line"><span>        Constructor[] consarr = stuclz1.getConstructors();</span></span>
<span class="line"><span>        for (Constructor c : consarr) {</span></span>
<span class="line"><span>            System.out.println(c);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取所有(public,protected,private,default)的构造方法</span></span>
<span class="line"><span>        System.out.println(&quot;===========获取所有的构造方法=========&quot;);</span></span>
<span class="line"><span>        Constructor[] consall = stuclz1.getDeclaredConstructors();</span></span>
<span class="line"><span>        for(Constructor c : consall) {</span></span>
<span class="line"><span>            System.out.println(c);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取单个构造方法，公有无参的构造方法</span></span>
<span class="line"><span>        System.out.println(&quot;===========获取单个公有、无参数的构造方法=========&quot;);</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Constructor con = stuclz1.getConstructor(null);</span></span>
<span class="line"><span>            System.out.println(&quot;con: &quot; + con);</span></span>
<span class="line"><span>        } catch (NoSuchMethodException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;===========获取单个私有private构造方法=========&quot;);</span></span>
<span class="line"><span>        Constructor con = stuclz1.getDeclaredConstructor(String.class);</span></span>
<span class="line"><span>        System.out.println(con);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字段的获取" tabindex="-1"><a class="header-anchor" href="#字段的获取"><span>字段的获取</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 获取所有 public 权限的字段</span></span>
<span class="line"><span>        System.out.println(&quot;==========获取所有 public 权限的字段===========&quot;);</span></span>
<span class="line"><span>        Field[] fieldArr = stuclz1.getFields();</span></span>
<span class="line"><span>        for(Field f : fieldArr) {</span></span>
<span class="line"><span>            System.out.println(f+&quot; - (&quot;+f.getDeclaringClass() +&quot;) - (&quot;+f.getName()+&quot;:&quot;+f.getType()+&quot;)&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取所有权限的字段，包括private</span></span>
<span class="line"><span>        System.out.println(&quot;==========获取所有权限的字段，包括private===========&quot;);</span></span>
<span class="line"><span>        Field[] fieldsArr = stuclz1.getDeclaredFields();</span></span>
<span class="line"><span>        for(Field f : fieldsArr) {</span></span>
<span class="line"><span>            System.out.println(f);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 根据名字获取单个public字段</span></span>
<span class="line"><span>        System.out.println(&quot;===========根据名字获取public字段============&quot;);</span></span>
<span class="line"><span>        Field addressField = stuclz1.getField(&quot;DEFAULT&quot;);</span></span>
<span class="line"><span>        System.out.println(addressField);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 根据名字获取某个字段，字段权限包括所有，也包括private</span></span>
<span class="line"><span>        System.out.println(&quot;=========根据名字获取某个字段，字段权限包括所有，也包括private=======&quot;);</span></span>
<span class="line"><span>// 来获取一个 private 字段</span></span>
<span class="line"><span>        Field nameField = stuclz1.getDeclaredField(&quot;arrayTable&quot;);</span></span>
<span class="line"><span>        System.out.println(nameField);</span></span>
<span class="line"><span>        nameField.setAccessible(true); // 因为是private，所以先要设置可访问。相当于打开一个开关，原本是不可以写的。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法的获取" tabindex="-1"><a class="header-anchor" href="#方法的获取"><span>方法的获取</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 获取所有public method方法</span></span>
<span class="line"><span>System.out.println(&quot;=============获取所有public method方法，包括继承父类的===============&quot;);</span></span>
<span class="line"><span>Method[] methodArr =  stuclz1.getMethods();</span></span>
<span class="line"><span>for(Method m:methodArr) {</span></span>
<span class="line"><span>    System.out.println(m); // 不仅打印出了 TomStudent 所有 public 方法，它继承的方法也打印出来</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>System.out.println(&quot;=============获取所有 method方法，包括继承父类的===============&quot;);</span></span>
<span class="line"><span>Method[] methodArr2 =  stuclz1.getDeclaredMethods();</span></span>
<span class="line"><span>for(Method m:methodArr2) {</span></span>
<span class="line"><span>    System.out.println(m); // 不仅打印出了 TomStudent 所有 public 方法，它继承的方法也打印出来</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么打包成一个单独的方法类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class reflact {</span></span>
<span class="line"><span>    //对属性进行更改</span></span>
<span class="line"><span>    public  static   Object getFied(Object classname ,Object value,String name) throws Exception {</span></span>
<span class="line"><span>        Class object=classname.getClass();</span></span>
<span class="line"><span>        Field field=object.getDeclaredField(name);</span></span>
<span class="line"><span>        field.setAccessible(true);</span></span>
<span class="line"><span>        field.set(classname ,value);</span></span>
<span class="line"><span>        return classname;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //对属性方法进行获取</span></span>
<span class="line"><span>    public  static   Method  getMethod(Object classname , String methodName ,Class ...partar) throws Exception {</span></span>
<span class="line"><span>        Class object=classname.getClass();</span></span>
<span class="line"><span>        Method method = object.getDeclaredMethod(methodName,  partar);</span></span>
<span class="line"><span>        method.setAccessible(true);</span></span>
<span class="line"><span>        return  method;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h2><p><a href="https://www.cnblogs.com/jiujuan/p/16659488.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/jiujuan/p/16659488.html</a> https://javabetter.cn/basic-extra-meal/fanshe.html</p>`,22)]))}const r=n(l,[["render",p],["__file","JAVA反射.html.vue"]]),u=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/JAVA%E5%8F%8D%E5%B0%84.html","title":"JAVA反射","lang":"zh-CN","frontmatter":{"data":"2024-08-02T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364752","title":"JAVA反射","description":"基础概念 一般情况下，我们在使用某个类之前已经确定它到底是个什么类了，拿到手就直接可以使用 new关键字来调用构造方法进行初始化，之后使用这个类的对象来进行操作。 像上面这个例子，就可以理解为“正射”。而反射就意味着一开始我们不知道要初始化的类到底是什么，也就没法直接使用 new 关键字创建对象了。 我们只知道这个类的一些基本信息，就好像我们看电影的时...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/JAVA%E5%8F%8D%E5%B0%84.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"JAVA反射"}],["meta",{"property":"og:description","content":"基础概念 一般情况下，我们在使用某个类之前已经确定它到底是个什么类了，拿到手就直接可以使用 new关键字来调用构造方法进行初始化，之后使用这个类的对象来进行操作。 像上面这个例子，就可以理解为“正射”。而反射就意味着一开始我们不知道要初始化的类到底是什么，也就没法直接使用 new 关键字创建对象了。 我们只知道这个类的一些基本信息，就好像我们看电影的时..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JAVA反射\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[]},{"level":2,"title":"具体使用","slug":"具体使用","link":"#具体使用","children":[{"level":3,"title":"获取 Class 类对象","slug":"获取-class-类对象","link":"#获取-class-类对象","children":[]},{"level":3,"title":"创建对应实例","slug":"创建对应实例","link":"#创建对应实例","children":[]},{"level":3,"title":"字段的获取","slug":"字段的获取","link":"#字段的获取","children":[]},{"level":3,"title":"方法的获取","slug":"方法的获取","link":"#方法的获取","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"readingTime":{"minutes":3.47,"words":1040},"filePathRelative":"开发/Java开发/JAVA反射.md","autoDesc":true}');export{r as comp,u as data};
