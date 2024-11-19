import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-Cv4h3eEp.js";const l={};function p(c,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="aop" tabindex="-1"><a class="header-anchor" href="#aop"><span>AOP</span></a></h2><h3 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h3><p>AOP，也就是 Aspect-oriented Programming，译为面向切面编程，我们可以简单的把 AOP 理解为贯穿于方法之中，就好比我们今天的主题——日志功能，就是一个典型的案例。</p><h3 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h3><p>1）横切关注点，从每个方法中抽取出来的同一类非核心业务。</p><p>2）切面（Aspect），对横切关注点进行封装的类，每个关注点体现为一个通知方法；通常使用 @Aspect 注解来定义切面。</p><p>3）通知（Advice），切面必须要完成的各个具体工作，比如我们的日志切面需要记录接口调用前后的时长，就需要在调用接口前后记录时间，再取差值。通知的方式有五种：</p><ul><li>@Before：通知方法会在目标方法调用之前执行</li><li>@After：通知方法会在目标方法调用后执行</li><li>@AfterReturning：通知方法会在目标方法返回后执行</li><li>@AfterThrowing：通知方法会在目标方法抛出异常后执行</li><li>@Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法</li></ul><p>4）连接点（JoinPoint），通知应用的时机，比如接口方法被调用时就是日志切面的连接点。</p><p>5）切点（Pointcut），通知功能被应用的范围，比如本篇日志切面的应用范围是所有 controller 的接口。通常使用 @Pointcut 注解来定义切点表达式。</p><p>主要的注解有这几种：</p><ul><li>@Before：通知方法会在目标方法调用之前执行</li><li>@After：通知方法会在目标方法调用后执行</li><li>@AfterReturning：通知方法会在目标方法返回后执行</li><li>@AfterThrowing：通知方法会在目标方法抛出异常后执行</li><li>@Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法</li><li>@Pointcut 注解来定义切点表达式。</li><li>@Aspect-它用于定义一个切面(Aspect)类。切面类包含了一个或多个切入点(Pointcut)以及相关的增强(Advice)方法。</li></ul><p>例子如下：</p><div class="language-// line-numbers-mode" data-highlighter="shiki" data-ext="//" data-title="//" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Aspect</span></span>
<span class="line"><span>public class LoggingAspect {</span></span>
<span class="line"><span>    // 定义切入点</span></span>
<span class="line"><span>    @Pointcut(&quot;execution(* com.example.service.*.*(..))&quot;)</span></span>
<span class="line"><span>    public void logPointcut() {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 定义前置增强</span></span>
<span class="line"><span>    @Before(&quot;logPointcut()&quot;)</span></span>
<span class="line"><span>    public void beforeMethod(JoinPoint joinPoint) {</span></span>
<span class="line"><span>        System.out.println(&quot;Calling method: &quot; + joinPoint.getSignature().getName());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 目标类</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class UserService {</span></span>
<span class="line"><span>    public void createUser(String name) {</span></span>
<span class="line"><span>        System.out.println(&quot;Creating user: &quot; + name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void deleteUser(String name) {</span></span>
<span class="line"><span>        System.out.println(&quot;Deleting user: &quot; + name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ioc" tabindex="-1"><a class="header-anchor" href="#ioc"><span>IOC</span></a></h2><h3 id="基础概念-1" tabindex="-1"><a class="header-anchor" href="#基础概念-1"><span>基础概念</span></a></h3><p>控制反转就是把创建和管理 bean 的过程转移给了第三方。而这个第三方，就是 Spring IoC Container，对于 IoC 来说，最重要的就是容器。</p><p>容器或者说Bean 其实就是包装了的 Object，无论是控制反转还是依赖注入，它们的主语都是 object，而 bean 就是由第三方包装好了的 object（想一下别人送礼物给你的时候都是要包装一下的，自己造的就免了）。</p><p>通俗点讲，因为项目中每次创建对象是很麻烦的，所以我们使用 Spring IoC 容器来管理这些对象，需要的时候你就直接用，不用管它是怎么来的、什么时候要销毁，只管用就好了。</p><h3 id="ioc容器" tabindex="-1"><a class="header-anchor" href="#ioc容器"><span>IOC容器</span></a></h3><p>Spring 设计容器使用的是<code>ApplicationContext</code>，它是 <code>BeanFactory</code> 的子类，更好的补充并实现了 <code>BeanFactory</code> 的。</p><p><code>BeanFactory</code> 简单粗暴，可以理解为 HashMap：</p><ul><li>Key - bean name</li><li>Value - bean object</li></ul><p>但它一般只有 get, put 两个功能，所以称之为“低级容器”。</p><p>而 <code>ApplicationContext</code> 多了很多功能，因为它继承了多个接口，可称之为“高级容器”。在下文的搭建项目中，我们会使用它。</p><p><code>ApplicationContext</code> 的里面有两个具体的实现子类，用来读取配置配件的：</p><ul><li><code>ClassPathXmlApplicationContext</code> - 从 class path 中加载配置文件，更常用一些；</li><li><code>FileSystemXmlApplicationContext</code> - 从本地文件中加载配置文件，不是很常用，如果再到 Linux 环境中，还要改路径，不是很方便。</li></ul><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现"><span>代码实现</span></a></h3><p>我们假定一个在线书店，通过<code>BookService</code>获取书籍：</p><p>传统代码编写</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class BookService {</span></span>
<span class="line"><span>    private HikariConfig config = new HikariConfig();</span></span>
<span class="line"><span>    private DataSource dataSource = new HikariDataSource(config);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Book getBook(long bookId) {</span></span>
<span class="line"><span>        try (Connection conn = dataSource.getConnection()) {</span></span>
<span class="line"><span>            ...</span></span>
<span class="line"><span>            return book;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IoC模式下编写</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class BookService {</span></span>
<span class="line"><span>    private DataSource dataSource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setDataSource(DataSource dataSource) {</span></span>
<span class="line"><span>        this.dataSource = dataSource;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不直接<code>new</code>一个<code>DataSource</code>，而是注入一个<code>DataSource</code>，这个小小的改动虽然简单，却带来了一系列好处：</p><ol><li><code>BookService</code>不再关心如何创建<code>DataSource</code>，因此，不必编写读取数据库配置之类的代码；</li><li><code>DataSource</code>实例被注入到<code>BookService</code>，同样也可以注入到<code>UserService</code>，因此，共享一个组件非常简单；</li><li>测试<code>BookService</code>更容易，因为注入的是<code>DataSource</code>，可以使用内存数据库，而不是真实的MySQL配置。</li></ol><p>因为IoC容器要负责实例化所有的组件，因此，有必要告诉容器如何创建组件，以及各组件的依赖关系.</p><p>在spring中就是使用的注解来进行配置，这里简单看一下就行，在sping使用中会详细介绍。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// UserService Bean</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class UserService {</span></span>
<span class="line"><span>    private final UserRepository userRepository;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    public UserService(UserRepository userRepository) {</span></span>
<span class="line"><span>        this.userRepository = userRepository;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void createUser(User user) {</span></span>
<span class="line"><span>        userRepository.save(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// UserRepository Bean</span></span>
<span class="line"><span>@Repository</span></span>
<span class="line"><span>public class UserRepository {</span></span>
<span class="line"><span>    public void save(User user) {</span></span>
<span class="line"><span>        // 保存用户数据的逻辑</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Spring 配置类</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>@ComponentScan(&quot;com.example&quot;)</span></span>
<span class="line"><span>public class AppConfig {</span></span>
<span class="line"><span>    // 其他 Bean 定义</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用 UserService</span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>public class UserController {</span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private UserService userService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @PostMapping(&quot;/users&quot;)</span></span>
<span class="line"><span>    public ResponseEntity&lt;User&gt; createUser(@RequestBody User user) {</span></span>
<span class="line"><span>        userService.createUser(user);</span></span>
<span class="line"><span>        return ResponseEntity.ok(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="几个关键问题" tabindex="-1"><a class="header-anchor" href="#几个关键问题"><span>几个关键问题：</span></a></h3><p><strong>何为控制，控制的是什么？</strong></p><p>答：是 bean 的创建、管理的权利，控制 bean 的整个生命周期。</p><p><strong>何为反转，反转了什么？</strong></p><p>答：把这个权利交给了 Spring 容器，而不是自己去控制，就是反转。由之前的自己主动创建对象，变成现在被动接收别人给我们的对象的过程，这就是反转。</p><p>举个生活中的例子，主动投资和被动投资。</p><p>自己炒股、选股票的人就是主动投资，主动权掌握在自己的手中；而买基金的人就是被动投资，把主动权交给了基金经理，除非你把这个基金卖了，否则具体选哪些投资产品都是基金经理决定的。</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><p>https://javabetter.cn/springboot/aop-log.html#%E4%B8%80%E3%80%81%E5%85%B3%E4%BA%8E-aop</p>`,47)]))}const t=s(l,[["render",p],["__file","Spring设计理念.html.vue"]]),o=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3/Spring%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5.html","title":"Spring设计理念","lang":"zh-CN","frontmatter":{"data":"2024-07-23T00:00:00.000Z","关联":["[[设计思想]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364682","title":"Spring设计理念","description":"AOP 基础概念 AOP，也就是 Aspect-oriented Programming，译为面向切面编程，我们可以简单的把 AOP 理解为贯穿于方法之中，就好比我们今天的主题——日志功能，就是一个典型的案例。 简单使用 1）横切关注点，从每个方法中抽取出来的同一类非核心业务。 2）切面（Aspect），对横切关注点进行封装的类，每个关注点体现为一个通...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://f0rward.fun%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3/Spring%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"Spring设计理念"}],["meta",{"property":"og:description","content":"AOP 基础概念 AOP，也就是 Aspect-oriented Programming，译为面向切面编程，我们可以简单的把 AOP 理解为贯穿于方法之中，就好比我们今天的主题——日志功能，就是一个典型的案例。 简单使用 1）横切关注点，从每个方法中抽取出来的同一类非核心业务。 2）切面（Aspect），对横切关注点进行封装的类，每个关注点体现为一个通..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring设计理念\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"AOP","slug":"aop","link":"#aop","children":[{"level":3,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[]},{"level":3,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]}]},{"level":2,"title":"IOC","slug":"ioc","link":"#ioc","children":[{"level":3,"title":"基础概念","slug":"基础概念-1","link":"#基础概念-1","children":[]},{"level":3,"title":"IOC容器","slug":"ioc容器","link":"#ioc容器","children":[]},{"level":3,"title":"代码实现","slug":"代码实现","link":"#代码实现","children":[]},{"level":3,"title":"几个关键问题：","slug":"几个关键问题","link":"#几个关键问题","children":[]}]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"readingTime":{"minutes":5.31,"words":1593},"filePathRelative":"开发/Java开发/设计思想/Spring设计理念.md","autoDesc":true}');export{t as comp,o as data};
