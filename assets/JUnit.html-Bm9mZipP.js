import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-CbjohtWB.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="单元测试意义" tabindex="-1"><a class="header-anchor" href="#单元测试意义"><span>单元测试意义</span></a></h2><p>单元测试，就是针对最小的功能单元编写测试代码。在 Java 中，最小的功能单元就是方法。</p><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h2><p><img src="https://cdn.nlark.com/yuque/0/2024/png/27874700/1721700954554-f69ad6eb-5660-4ed9-87b5-7f3812243c20.png" alt="" loading="lazy"> 给要测试的类的方法上填写对应的一个测试注解。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>void fact() {</span></span>
<span class="line"><span>    assertEquals(1, Factorial.fact(1));</span></span>
<span class="line"><span>    assertEquals(2, Factorial.fact(2));</span></span>
<span class="line"><span>    assertEquals(6, Factorial.fact(3));</span></span>
<span class="line"><span>    assertEquals(100, Factorial.fact(5));</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Test</code> 注解是我要求的，我会把带有 <code>@Test</code> 的方法识别为测试方法。在测试方法内部，你可以使用 <code>assertEquals()</code> 对期望的值和实际的值进行比对。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class CalculatorTest {</span></span>
<span class="line"><span>    Calculator calculator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @BeforeEach</span></span>
<span class="line"><span>    void setUp() {</span></span>
<span class="line"><span>        calculator = new Calculator();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @AfterEach</span></span>
<span class="line"><span>    void tearDown() {</span></span>
<span class="line"><span>        calculator = null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void sub() {</span></span>
<span class="line"><span>        assertEquals(0,calculator.sub(1,1));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void add() {</span></span>
<span class="line"><span>        assertEquals(2,calculator.add(1,1));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@BeforeEach</code> 的 <code>setUp()</code> 方法会在运行每个 <code>@Test</code> 方法之前运行；<code>@AfterEach</code> 的 <code>tearDown()</code> 方法会在运行每个 <code>@Test</code> 方法之后运行。</p><h2 id="异常测试" tabindex="-1"><a class="header-anchor" href="#异常测试"><span>异常测试</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>void factIllegalArgument() {</span></span>
<span class="line"><span>    assertThrows(IllegalArgumentException.class, new Executable() {</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void execute() throws Throwable {</span></span>
<span class="line"><span>            Factorial.fact(-2);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供了一个 <code>assertThrows()</code> 的方法，第一个参数是异常的类型，第二个参数 Executable，可以封装产生异常的代码。如果觉得匿名内部类写起来比较复杂的话，可以使用 Lambda 表达式.</p><h2 id="忽略测试" tabindex="-1"><a class="header-anchor" href="#忽略测试"><span>忽略测试</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class DisabledTestsDemo {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Disabled(&quot;该测试用例不再执行，直到编号为 43 的 bug 修复掉&quot;)</span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void testWillBeSkipped() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void testWillBeExecuted() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件测试" tabindex="-1"><a class="header-anchor" href="#条件测试"><span>条件测试</span></a></h2><p>不同的操作系统，可能需要不同的测试用例，比如说 Linux 和 Windows 的路径名是不一样的，通过 <code>@EnabledOnOs</code> 注解就可以针对不同的操作系统启用不同的测试用例。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>@EnabledOnOs(MAC)</span></span>
<span class="line"><span>void onlyOnMacOs() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@TestOnMac</span></span>
<span class="line"><span>void testOnMac() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Test</span></span>
<span class="line"><span>@EnabledOnOs({ LINUX, MAC })</span></span>
<span class="line"><span>void onLinuxOrMac() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Test</span></span>
<span class="line"><span>@DisabledOnOs(WINDOWS)</span></span>
<span class="line"><span>void notOnWindows() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const r=n(l,[["render",p],["__file","JUnit.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/JUnit.html","title":"JUnit","lang":"zh-CN","frontmatter":{"data":"2024-07-22T00:00:00.000Z","关联":["[[Java开发]]"],"title":"JUnit","description":"单元测试意义 单元测试，就是针对最小的功能单元编写测试代码。在 Java 中，最小的功能单元就是方法。 简单使用 给要测试的类的方法上填写对应的一个测试注解。 Test 注解是我要求的，我会把带有 @Test 的方法识别为测试方法。在测试方法内部，你可以使用 assertEquals() 对期望的值和实际的值进行比对。 @BeforeEach 的 se...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://f0rward.fun%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/JUnit.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"JUnit"}],["meta",{"property":"og:description","content":"单元测试意义 单元测试，就是针对最小的功能单元编写测试代码。在 Java 中，最小的功能单元就是方法。 简单使用 给要测试的类的方法上填写对应的一个测试注解。 Test 注解是我要求的，我会把带有 @Test 的方法识别为测试方法。在测试方法内部，你可以使用 assertEquals() 对期望的值和实际的值进行比对。 @BeforeEach 的 se..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.nlark.com/yuque/0/2024/png/27874700/1721700954554-f69ad6eb-5660-4ed9-87b5-7f3812243c20.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit\\",\\"image\\":[\\"https://cdn.nlark.com/yuque/0/2024/png/27874700/1721700954554-f69ad6eb-5660-4ed9-87b5-7f3812243c20.png\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"单元测试意义","slug":"单元测试意义","link":"#单元测试意义","children":[]},{"level":2,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]},{"level":2,"title":"异常测试","slug":"异常测试","link":"#异常测试","children":[]},{"level":2,"title":"忽略测试","slug":"忽略测试","link":"#忽略测试","children":[]},{"level":2,"title":"条件测试","slug":"条件测试","link":"#条件测试","children":[]}],"readingTime":{"minutes":1.42,"words":427},"filePathRelative":"开发/Java开发/JUnit.md","autoDesc":true}');export{r as comp,v as data};
