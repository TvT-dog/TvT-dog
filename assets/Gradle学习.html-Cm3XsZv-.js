import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-B60ElMD-.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="gradle学习" tabindex="-1"><a class="header-anchor" href="#gradle学习"><span>Gradle学习</span></a></h1><h2 id="第三包管理历史" tabindex="-1"><a class="header-anchor" href="#第三包管理历史"><span>第三包管理历史</span></a></h2><p>早期没有项目管理工具时，对于项目所依赖的第三方包采用的事：拷贝三方jar包到本地，然后加入到lib目录下，这样做劣势不言而喻，管理复杂容易冲突。<br> 后面就出现了第三方包管理工具</p><ul><li>Ant：2000年发布，纯java编写.</li><li>Maven：2004年发布，采用pom.xml管理项目</li><li>Gradle：2012年，google背书的一款项目管理工具</li></ul><p>在使用这三个工具之前，我们要了解一个Java 项目通常的构建步骤:</p><ol><li><strong>清理 (Clean)</strong>: 清理上一次的构建结果,删除生成的编译文件、JAR 包等。这一步确保构建过程从一个干净的状态开始。</li><li><strong>编译 (Compile)</strong>: 编译 Java 源代码文件,将其转换为字节码文件。这个步骤需要确保源码文件的语法正确,并且能够通过编译器的检查。</li><li><strong>测试 (Test)</strong>: 运行单元测试或集成测试,确保代码的功能正确。这个步骤可以在编译后立即执行,或者作为独立的构建阶段。</li><li><strong>打包 (Package)</strong>: 将编译好的字节码文件及其依赖的库,打包成可分发的格式,通常是 JAR、WAR 或 EAR 文件。这个步骤需要指定项目的主类及相关的配置信息。</li><li><strong>安装 (Install)</strong>: 将打包好的构件,安装到本地的仓库中,供其他项目使用。这个步骤适用于需要发布构件的情况。</li><li><strong>部署 (Deploy)</strong>: 将打包好的构件,部署到测试或生产环境的服务器上。这个步骤需要与目标环境的基础设施进行对接。</li></ol><p>假设我们有一个Java项目,需要构建并打包为一个可执行JAR包。</p><p>我们来看看这三种工具如何实现这个需求。</p><p>Ant</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;project name=&quot;my-project&quot; default=&quot;jar&quot;&gt;  //&lt;property&gt; 标签定义了项目中使用的一些属性,如源码目录、构建目录和主类名。</span></span>
<span class="line"><span>    &lt;property name=&quot;src.dir&quot; value=&quot;src&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;build.dir&quot; value=&quot;build&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;lib.dir&quot; value=&quot;lib&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;main.class&quot; value=&quot;com.example.Main&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;path id=&quot;classpath&quot;&gt;   //&lt;path&gt;标签定义了项目的类路径,包括外部依赖库。</span></span>
<span class="line"><span>        &lt;fileset dir=&quot;\${lib.dir}&quot; includes=&quot;*.jar&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/path&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;target name=&quot;clean&quot;&gt; //&lt;target&gt; 标签定义了各个构建步骤,如 clean、compile 和 jar。</span></span>
<span class="line"><span>        &lt;delete dir=&quot;\${build.dir}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/target&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;target name=&quot;compile&quot; depends=&quot;clean&quot;&gt;</span></span>
<span class="line"><span>        &lt;mkdir dir=&quot;\${build.dir}/classes&quot;/&gt;</span></span>
<span class="line"><span>        &lt;javac srcdir=&quot;\${src.dir}&quot; destdir=&quot;\${build.dir}/classes&quot; classpathref=&quot;classpath&quot;/&gt; //&lt;javac&gt; 标签用于编译源码,&lt;jar&gt; 标签用于打包 JAR 文件,其中包含了主类信息</span></span>
<span class="line"><span>    &lt;/target&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;target name=&quot;jar&quot; depends=&quot;compile&quot;&gt;</span></span>
<span class="line"><span>        &lt;jar destfile=&quot;\${build.dir}/\${ant.project.name}.jar&quot; filesetmanifest=&quot;mergewithoutmain&quot;&gt;</span></span>
<span class="line"><span>            &lt;manifest&gt;</span></span>
<span class="line"><span>                &lt;attribute name=&quot;Main-Class&quot; value=&quot;\${main.class}&quot;/&gt;</span></span>
<span class="line"><span>            &lt;/manifest&gt;</span></span>
<span class="line"><span>            &lt;fileset dir=&quot;\${build.dir}/classes&quot;/&gt;</span></span>
<span class="line"><span>            &lt;zipgroupfileset dir=&quot;\${lib.dir}&quot; includes=&quot;*.jar&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/jar&gt;</span></span>
<span class="line"><span>    &lt;/target&gt;</span></span>
<span class="line"><span>&lt;/project&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Maven 发布于 2004 年。目的是解决使用 Ant 所带来的一些问题。Maven 也是使用 XML 作为构建配置的文件格式，不过文件结构却有了巨大的变化：</p><ul><li>Ant 需要开发者将执行 task 所需的全部命令都列出来</li><li>而 Maven 依靠约定并提供现成的可调用的目标</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;</span></span>
<span class="line"><span>         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;</span></span>
<span class="line"><span>    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;groupId&gt;com.example&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;my-project&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;dependencies&gt;</span></span>
<span class="line"><span>        &lt;!-- 声明项目依赖的库 --&gt;</span></span>
<span class="line"><span>    &lt;/dependencies&gt;</span></span>
<span class="line"><span>&lt;/project&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Maven 主要解决了依赖管理的问题，然而使用 XML 的错误使它重蹈覆辙，实际上用 Maven 很难写出复杂、定制化的构建脚本，在大型项目中，它经常什么“特别的”事还没干就有几百行代码，甚至不如 Ant。</p><p>前辈们在反省前两种构建工具的错误之后，提出了 DSL （Domain Special Language, 领域专用语言）的概念，目标是设计一套能够解决特定领域问题的语言。在构建这方面，DSL 的一个成功案例就是 Gradle。</p><p>Gradle</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>plugins {</span></span>
<span class="line"><span>    id &#39;java&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>group = &#39;com.example&#39;</span></span>
<span class="line"><span>version = &#39;1.0-SNAPSHOT&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>repositories {</span></span>
<span class="line"><span>    mavenCentral()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dependencies {</span></span>
<span class="line"><span>    implementation &#39;org.apache.commons:commons-lang3:3.12.0&#39;</span></span>
<span class="line"><span>    testImplementation &#39;junit:junit:4.13.2&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>test {</span></span>
<span class="line"><span>    useJUnitPlatform()</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在大家项目使用的构建工具都是maven和Gradle了。</p><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>├─build.gradle                        ①</span></span>
<span class="line"><span>├─gradlew                             ②</span></span>
<span class="line"><span>├─gradlew.bat						  ③</span></span>
<span class="line"><span>├─settings.gradle                     ④</span></span>
<span class="line"><span>├─gradle                              ⑤</span></span>
<span class="line"><span>│  └─wrapper                          </span></span>
<span class="line"><span>│      ├─ gradle-wrapper.jar          </span></span>
<span class="line"><span>│      ├─ gradle-wrapper.properties   </span></span>
<span class="line"><span>└─src                                 ⑥</span></span>
<span class="line"><span>    ├─main                            </span></span>
<span class="line"><span>    └─test</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>项目自动编译的时候要读取的配置文件。比如指定项目的依赖包等。 build.grade 有两个，一个是全局的，一个是在模块里面。全局的build.grade主要设置的是声明仓库源，gradle的版本号说明等。</li><li>linux下的gradle环境脚本，可以执行gradle指令，如:./gradlew build</li><li>windows下的gradle环境，可以执行gradle指令</li><li>包含必要的一些设置，例如，任务或项目之间的依懒关系等，无论有多少个子模块，该文件只会有一个，且一定在根项目中;</li><li>包含wrapper文件夹及其2个子文件，作用是:可以自动安装gradle环境</li><li>程序源码</li></ol><h2 id="project" tabindex="-1"><a class="header-anchor" href="#project"><span>Project</span></a></h2><p>在 Gradle 中,<code>Project</code> 是构建系统的核心概念。每个 Gradle 构建都有一个或多个 <code>Project</code> 对象,它们定义了整个构建的结构和行为。</p><p>Project 对象具有以下主要特点:</p><ol><li><strong>定义构建</strong>: Project 对象定义了整个构建的结构和行为。它包含了构建的所有配置信息,如项目信息、依赖关系、任务定义等。</li><li><strong>任务管理</strong>: Project 对象管理着构建过程中的各种任务,如编译、测试、打包等。开发者可以定义自定义任务,并将它们集成到构建流程中。</li><li><strong>依赖管理</strong>: Project 对象负责管理项目的依赖关系。它可以声明外部库依赖,并自动处理依赖的下载和引入。</li><li><strong>多项目构建</strong>: 一个 Gradle 构建可以包含多个 Project 对象,即多个子项目。Project 对象可以定义它们之间的依赖关系,实现跨项目的构建和部署。</li></ol><p>注意到，我们之前说过gradle是使用的DSL。这里的专用语言其实就是Groovy。这里就不细谈Groovy了。在 build.gradle 文件中,<code>project</code> 关键字用于访问当前 Project 对象,开发者可以通过它来配置和扩展构建行为。比如:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>project.version = &#39;1.0.0&#39;  //设置当前 Project 对象的版本号为 \`1.0.0\`。</span></span>
<span class="line"><span>project.repositories {</span></span>
<span class="line"><span>    mavenCentral()    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//- 这段代码配置了当前 Project 对象的依赖仓库。</span></span>
<span class="line"><span>//- \`repositories\` 块用于定义项目从哪里下载依赖库。</span></span>
<span class="line"><span>//- \`mavenCentral()\` 是一个内置的方法,用于添加 Maven 中央仓库作为依赖源。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一个<code>build.gradle</code>文件对应一个Project实例，我们在build.gradle中编写的内容，就相当于<code>Project</code>实例的属性或方法。</p><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/27874700/1720611438865-d5875f74-5309-4b04-a29b-11862a69c6ab.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="属性设置" tabindex="-1"><a class="header-anchor" href="#属性设置"><span>属性设置</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>group = &#39;com.it235&#39;</span></span>
<span class="line"><span>version = &#39;1.0.0&#39;//内置属性可以直接赋值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def pname = &quot;projectName:&quot; + project.name</span></span>
<span class="line"><span>String pname = &quot;projectName:&quot; + project.name. //自定义属性可以使用groovy语法</span></span>
<span class="line"><span>也可以与java语法结合</span></span>
<span class="line"><span>ext.prop1 = &quot;it235&quot;. //使用ext名命空间来扩展属性，定义后可以在project、task、subproject中读取和更新</span></span>
<span class="line"><span>ext.prop2 = &quot;君哥聊编程&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法"><span>方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>apply plugin: &#39;idea&#39;. //apply 应用零个或多个插件或脚本。</span></span>
<span class="line"><span>apply plugin: &#39;java&#39;</span></span>
<span class="line"><span>apply plugin: &quot;maven&quot;</span></span>
<span class="line"><span>apply plugin: &quot;war&quot;</span></span>
<span class="line"><span>apply plugin: &quot;com.bmuschko.docker-remote-api&quot;</span></span>
<span class="line"><span>apply plugin: &quot;org.springframework.boot&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>buildscript {</span></span>
<span class="line"><span>    repositories {</span></span>
<span class="line"><span>        mavenLocal()</span></span>
<span class="line"><span>        maven {</span></span>
<span class="line"><span>            url &quot;https://maven.aliyun.com/repository/public&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>		mavenCentral()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    dependencies {</span></span>
<span class="line"><span>        classpath &quot;com.bmuschko:gradle-docker-plugin:3.3.4&quot;</span></span>
<span class="line"><span>        classpath &quot;org.springframework.boot:spring-boot-gradle-plugin:2.6.5&quot;</span></span>
<span class="line"><span>    }//buildscript{}：配置当前gradle脚本自身需要使用的构建信息或依赖</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插件" tabindex="-1"><a class="header-anchor" href="#插件"><span>插件</span></a></h3><p>插件可以封装一系列任务，例如 编译，测试，打包等。 IDEA、VsCode、Eclipse、Maven、Chrome等都是支持插件集成的工具。插件意味着扩展，Gradle只要定义好插件规范，各大厂商或个人开发者遵循这个规范就能开发出很多有用的插件，从而丰富Gradle生态。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>plugins {</span></span>
<span class="line"><span>    id &#39;java&#39;</span></span>
<span class="line"><span>    id &#39;org.springframework.boot&#39; version &#39;2.7.0&#39;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例中使用了两个插件:</p><ol><li><code>java</code> 插件 <ul><li>这个是 Gradle 内置的核心插件,提供了标准的 Java 项目构建功能,如编译、测试、打包等。</li><li>使用 <code>java</code> 插件后,Gradle 会自动应用这些常见的 Java 项目构建任务。</li></ul></li><li><code>org.springframework.boot</code> 插件 <ul><li>这是 Spring Boot 项目的专用插件,提供了构建 Spring Boot 应用所需的特殊功能。</li><li>这个插件不是 Gradle 自带的,而是由 Spring 团队提供的扩展插件。</li><li>使用这个插件可以方便地构建和打包 Spring Boot 应用程序。</li></ul></li></ol><h2 id="任务" tabindex="-1"><a class="header-anchor" href="#任务"><span>任务</span></a></h2><p>任务是gradle的最小执行单元，一个<code>build.gradle</code>是由一系列的task组成，重要性不言而喻。任务在 Gradle 的构建脚本(build.gradle)中定义,可以通过以下方式创建任务:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>task clean {</span></span>
<span class="line"><span>    description &#39;Deletes the build directory&#39;</span></span>
<span class="line"><span>    delete &#39;build&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>task compile(type: JavaCompile) {</span></span>
<span class="line"><span>    source = &#39;src/main/java&#39;</span></span>
<span class="line"><span>    destinationDirectory = file(&#39;build/classes&#39;)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中, 我们定义了两个任务:</p><ol><li><code>clean</code> 任务 <ul><li>这是一个简单的任务,它的作用是删除项目的 <code>build</code> 目录。</li><li>任务可以包含描述信息、执行逻辑等属性。</li></ul></li><li><code>compile</code> 任务 <ul><li>这是一个更复杂的任务,它使用内置的 <code>JavaCompile</code> 任务类型。</li><li>这个任务的作用是编译 Java 源代码,并将编译结果输出到 <code>build/classes</code> 目录。</li><li>任务类型可以是内置的,也可以是自定义的。</li></ul></li></ol><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2><p>Gradle的核心是一种基于依赖的编程语言，任务与任务之间有一定的依赖关系，并且每个任务只会执行一次。在构建时，Gradle会把这些任务串联起来形成有向无环图。那Gradle是在什么时候进行串联的呢？这就需要充分了解Gradle在各个阶段做了什么事情了，从一开始到结束的这一连串动作我们称为生命周期。<br> gradle构建有3个不同的阶段</p><ol><li><strong>初始化</strong>： gradle支持单项目和多项目构建，在该阶段，gradle会解析<code>setting.gradle</code>文件，确定哪些项目需要参与构建，并且为这些项目创建一个<a href="https://docs.gradle.org/current/dsl/org.gradle.api.Project.html" target="_blank" rel="noopener noreferrer">Project (opens new window)</a>实例</li><li><strong>配置</strong>：当完成初始化阶段后，就会进入配置阶段，配置阶段解析所有<code>project</code>中的<code>build.gradle</code>文件获取所有的task，形成有向无环图后执行依赖关系，并且所有project中的<code>build script</code>部分和task的配置段会在这一阶段调用（注意并不是执行具体的task代码）。</li><li><strong>执行task</strong>： 当完成任务依赖图后, Gradle 就做好了一切准备，然后进入执行阶段。按照有向无环图中task列表的顺序，执行所有被指定的task。</li></ol><p>最后我们来比较一下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;</span></span>
<span class="line"><span>         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;</span></span>
<span class="line"><span>    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;groupId&gt;com.example&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;my-project&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.0.0&lt;/version&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;properties&gt;</span></span>
<span class="line"><span>        &lt;java.version&gt;11&lt;/java.version&gt;</span></span>
<span class="line"><span>    &lt;/properties&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;dependencies&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2.7.0&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;/dependencies&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;build&gt;</span></span>
<span class="line"><span>        &lt;plugins&gt;</span></span>
<span class="line"><span>            &lt;plugin&gt;</span></span>
<span class="line"><span>                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;version&gt;2.7.0&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;/plugin&gt;</span></span>
<span class="line"><span>        &lt;/plugins&gt;</span></span>
<span class="line"><span>    &lt;/build&gt;</span></span>
<span class="line"><span>&lt;/project&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>plugins {</span></span>
<span class="line"><span>    id &#39;java&#39;</span></span>
<span class="line"><span>    id &#39;org.springframework.boot&#39; version &#39;2.7.0&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>group &#39;com.example&#39;</span></span>
<span class="line"><span>version &#39;1.0.0&#39;</span></span>
<span class="line"><span>sourceCompatibility = JavaVersion.toVersion(11)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>repositories {</span></span>
<span class="line"><span>    mavenCentral()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dependencies {</span></span>
<span class="line"><span>    implementation &#39;org.springframework.boot:spring-boot-starter-web:2.7.0&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bootJar {</span></span>
<span class="line"><span>    archiveFileName = &#39;my-project.jar&#39;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就是使用了DSL的语言来替代了xml</p><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h1><p><a href="https://cloud.tencent.com/developer/article/1014645" target="_blank" rel="noopener noreferrer">https://cloud.tencent.com/developer/article/1014645</a></p><p><a href="https://www.it235.com/%E5%AE%9E%E7%94%A8%E5%B7%A5%E5%85%B7/Gradle/gradle.html#%E6%A6%82%E5%BF%B5" target="_blank" rel="noopener noreferrer">https://www.it235.com/实用工具/Gradle/gradle.html#概念</a></p>`,53)]))}const c=n(l,[["render",p]]),o=JSON.parse('{"path":"/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Gradle%E5%AD%A6%E4%B9%A0.html","title":"Gradle学习","lang":"zh-CN","frontmatter":{"data":"2024-07-10T00:00:00.000Z","tags":["构建工具"],"关联":["[[Java开发]]"],"description":"Gradle学习 第三包管理历史 早期没有项目管理工具时，对于项目所依赖的第三方包采用的事：拷贝三方jar包到本地，然后加入到lib目录下，这样做劣势不言而喻，管理复杂容易冲突。 后面就出现了第三方包管理工具 Ant：2000年发布，纯java编写. Maven：2004年发布，采用pom.xml管理项目 Gradle：2012年，google背书的一...","head":[["meta",{"property":"og:url","content":"https://f0rward.fun/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Gradle%E5%AD%A6%E4%B9%A0.html"}],["meta",{"property":"og:title","content":"Gradle学习"}],["meta",{"property":"og:description","content":"Gradle学习 第三包管理历史 早期没有项目管理工具时，对于项目所依赖的第三方包采用的事：拷贝三方jar包到本地，然后加入到lib目录下，这样做劣势不言而喻，管理复杂容易冲突。 后面就出现了第三方包管理工具 Ant：2000年发布，纯java编写. Maven：2004年发布，采用pom.xml管理项目 Gradle：2012年，google背书的一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.nlark.com/yuque/0/2024/png/27874700/1720611438865-d5875f74-5309-4b04-a29b-11862a69c6ab.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-04T09:31:55.000Z"}],["meta",{"property":"article:tag","content":"构建工具"}],["meta",{"property":"article:modified_time","content":"2025-04-04T09:31:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle学习\\",\\"image\\":[\\"https://cdn.nlark.com/yuque/0/2024/png/27874700/1720611438865-d5875f74-5309-4b04-a29b-11862a69c6ab.png\\"],\\"dateModified\\":\\"2025-04-04T09:31:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\"}]}"]]},"git":{"createdTime":1743759115000,"updatedTime":1743759115000,"contributors":[{"name":"tangyijie.666","username":"","email":"tangyijie.666@bytedance.com","commits":1}]},"readingTime":{"minutes":9.3,"words":2790},"filePathRelative":"docs/开发/Java开发/Gradle学习.md","localizedDate":"2025年4月4日","excerpt":"\\n<h2>第三包管理历史</h2>\\n<p>早期没有项目管理工具时，对于项目所依赖的第三方包采用的事：拷贝三方jar包到本地，然后加入到lib目录下，这样做劣势不言而喻，管理复杂容易冲突。<br>\\n后面就出现了第三方包管理工具</p>\\n<ul>\\n<li>Ant：2000年发布，纯java编写.</li>\\n<li>Maven：2004年发布，采用pom.xml管理项目</li>\\n<li>Gradle：2012年，google背书的一款项目管理工具</li>\\n</ul>\\n<p>在使用这三个工具之前，我们要了解一个Java 项目通常的构建步骤:</p>\\n<ol>\\n<li><strong>清理 (Clean)</strong>: 清理上一次的构建结果,删除生成的编译文件、JAR 包等。这一步确保构建过程从一个干净的状态开始。</li>\\n<li><strong>编译 (Compile)</strong>: 编译 Java 源代码文件,将其转换为字节码文件。这个步骤需要确保源码文件的语法正确,并且能够通过编译器的检查。</li>\\n<li><strong>测试 (Test)</strong>: 运行单元测试或集成测试,确保代码的功能正确。这个步骤可以在编译后立即执行,或者作为独立的构建阶段。</li>\\n<li><strong>打包 (Package)</strong>: 将编译好的字节码文件及其依赖的库,打包成可分发的格式,通常是 JAR、WAR 或 EAR 文件。这个步骤需要指定项目的主类及相关的配置信息。</li>\\n<li><strong>安装 (Install)</strong>: 将打包好的构件,安装到本地的仓库中,供其他项目使用。这个步骤适用于需要发布构件的情况。</li>\\n<li><strong>部署 (Deploy)</strong>: 将打包好的构件,部署到测试或生产环境的服务器上。这个步骤需要与目标环境的基础设施进行对接。</li>\\n</ol>","autoDesc":true}');export{c as comp,o as data};
