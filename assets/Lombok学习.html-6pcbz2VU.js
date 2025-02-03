import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-CbjohtWB.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="lombok的意义" tabindex="-1"><a class="header-anchor" href="#lombok的意义"><span>Lombok的意义</span></a></h2><p><code>Lombok</code> 最大的好处就在于通过注解的形式来简化 Java 代码。</p><p>作为一名 Java 程序员，我相信你一定写过不少的 <code>getter / setter</code>，尽管可以借助 IDE 来自动生成，可一旦 <code>Javabean</code> 的属性很多，就免不了要产生大量的 <code>getter / setter</code>。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Cmower {</span></span>
<span class="line"><span>	private int age;</span></span>
<span class="line"><span>	private String name;</span></span>
<span class="line"><span>	private BigDecimal money;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public int getAge() {</span></span>
<span class="line"><span>		return age;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	public void setAge(int age) {</span></span>
<span class="line"><span>		this.age = age;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	public String getName() {</span></span>
<span class="line"><span>		return name;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	public void setName(String name) {</span></span>
<span class="line"><span>		this.name = name;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	public BigDecimal getMoney() {</span></span>
<span class="line"><span>		return money;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	public void setMoney(BigDecimal money) {</span></span>
<span class="line"><span>		this.money = money;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用了Lombok后</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Getter</span></span>
<span class="line"><span>@Setter</span></span>
<span class="line"><span>class CmowerLombok {</span></span>
<span class="line"><span>	private int age;</span></span>
<span class="line"><span>	private String name;</span></span>
<span class="line"><span>	private BigDecimal money;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用"><span>基础使用</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class CmowerLombok {</span></span>
<span class="line"><span>	@Getter @Setter private int age;</span></span>
<span class="line"><span>	@Getter private String name;</span></span>
<span class="line"><span>	@Setter private BigDecimal money;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字节码文件反编译后的内容是：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class CmowerLombok {</span></span>
<span class="line"><span>	private int age;</span></span>
<span class="line"><span>	private String name;</span></span>
<span class="line"><span>	private BigDecimal money;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public int getAge() {</span></span>
<span class="line"><span>		return this.age;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public void setAge(int age) {</span></span>
<span class="line"><span>		this.age = age;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public String getName() {</span></span>
<span class="line"><span>		return this.name;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public void setMoney(BigDecimal money) {</span></span>
<span class="line"><span>		this.money = money;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10)]))}const c=s(l,[["render",p],["__file","Lombok学习.html.vue"]]),o=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Lombok%E5%AD%A6%E4%B9%A0.html","title":"Lombok学习","lang":"zh-CN","frontmatter":{"data":"2024-07-23T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364757","title":"Lombok学习","description":"Lombok的意义 Lombok 最大的好处就在于通过注解的形式来简化 Java 代码。 作为一名 Java 程序员，我相信你一定写过不少的 getter / setter，尽管可以借助 IDE 来自动生成，可一旦 Javabean 的属性很多，就免不了要产生大量的 getter / setter。 使用了Lombok后 基础使用 字节码文件反编译后的...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://f0rward.fun%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Lombok%E5%AD%A6%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"Lombok学习"}],["meta",{"property":"og:description","content":"Lombok的意义 Lombok 最大的好处就在于通过注解的形式来简化 Java 代码。 作为一名 Java 程序员，我相信你一定写过不少的 getter / setter，尽管可以借助 IDE 来自动生成，可一旦 Javabean 的属性很多，就免不了要产生大量的 getter / setter。 使用了Lombok后 基础使用 字节码文件反编译后的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lombok学习\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"Lombok的意义","slug":"lombok的意义","link":"#lombok的意义","children":[]},{"level":2,"title":"基础使用","slug":"基础使用","link":"#基础使用","children":[]}],"readingTime":{"minutes":0.78,"words":233},"filePathRelative":"开发/Java开发/Lombok学习.md","autoDesc":true}');export{c as comp,o as data};
