import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,o as e}from"./app-C1twxy1c.js";const l={};function p(t,n){return e(),a("div",null,n[0]||(n[0]=[i(`<h1 id="安卓架构" tabindex="-1"><a class="header-anchor" href="#安卓架构"><span>安卓架构</span></a></h1><p>![[images/Pasted image 20240916164832.png]] 总的来说可以分为5层</p><h2 id="linux内核层" tabindex="-1"><a class="header-anchor" href="#linux内核层"><span>linux内核层</span></a></h2><p>Android 平台的基础是 Linux 内核。为整个系统提供了基础功能，如文件管理，进程调用等。</p><h2 id="硬件抽象层" tabindex="-1"><a class="header-anchor" href="#硬件抽象层"><span>硬件抽象层</span></a></h2><p>即将各种硬件抽象为一个个可以被程序使用的标准接口。</p><h2 id="native系统库与android-runtime" tabindex="-1"><a class="header-anchor" href="#native系统库与android-runtime"><span>Native系统库与Android Runtime</span></a></h2><p>Native系统库即使用c或者c++编写的一些库，实现了安卓的核心功能。为java提供了一些方法来进行调用，简化开发. Android Runtime可以简单理解为特别定制的一种jvm虚拟机。</p><h2 id="java-api-框架" tabindex="-1"><a class="header-anchor" href="#java-api-框架"><span>Java API 框架</span></a></h2><p>即使用java对各种功能进行了再次抽象，来简化开发。</p><h2 id="系统应用" tabindex="-1"><a class="header-anchor" href="#系统应用"><span>系统应用</span></a></h2><p>这里既为我们平时安装使用的app了。</p><h1 id="app架构" tabindex="-1"><a class="header-anchor" href="#app架构"><span>APP架构</span></a></h1><p>![[images/Pasted image 20240916185148.png]]</p><ul><li>界面层： 用于显示数据,同时当数据进行变化时，界面也要进行对应的一个变化。</li><li>数据层 ： 包含应用的业务逻辑并公开应用数据，数据层由多个仓库组成，其中每个仓库都可以包含零到多个数据源。</li><li>网域层： 以简化和重复使用界面层与数据层之间的交互，封装复杂的业务逻辑。</li></ul><h1 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>MyAndroidProject/</span></span>
<span class="line"><span>├── build.gradle </span></span>
<span class="line"><span>├── settings.gradle</span></span>
<span class="line"><span>├── gradle/</span></span>
<span class="line"><span>├── app/</span></span>
<span class="line"><span>│   ├── build.gradle</span></span>
<span class="line"><span>│   ├── src/</span></span>
<span class="line"><span>│   │   ├── main/</span></span>
<span class="line"><span>│   │   │   ├── java/  存放 Java 或 Kotlin 源代码，按包名结构组织。</span></span>
<span class="line"><span>│   │   │   ├── res/   存放资源文件</span></span>
<span class="line"><span>│   │   │   ├── AndroidManifest.xml 应用的清单文件，声明应用的组件和权限。</span></span>
<span class="line"><span>│   │   ├── test/</span></span>
<span class="line"><span>│   │   └── androidTest/  存放 Android 仿真器和设备上运行的测试代码。</span></span>
<span class="line"><span>└── gradle/wrapper/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>build.gradle：项目级的 Gradle 构建文件，用于配置整个项目的构建设置。</li><li>settings.gradle：用于包含多个模块的设置。</li><li>gradle：存放 Gradle Wrapper 的脚本和配置文件。</li></ul><p>我们直接使用Android Studio创建文件会发现是class MainActivity : ComponentActivity()。这里我们使用AppCompatActivity来进行代码的编写。</p><p>在build.gradle.kts文件中导入对应的依赖：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>implementation(libs.androidx.appcompat)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>并在AndroidManifest.xm导入对应的主题即可：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>android:theme=&quot;@style/Theme.AppCompat.Light&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="日志使用" tabindex="-1"><a class="header-anchor" href="#日志使用"><span>日志使用</span></a></h1><h2 id="为什么使用日志" tabindex="-1"><a class="header-anchor" href="#为什么使用日志"><span>为什么使用日志</span></a></h2><p>很多人会非常喜欢使用System.out.println()方法来打印日志，在Kotlin中使用与之对应的是println()方法，在真正的项目开发中，是极度不建议使用System.out.println()或println()方法的，如果你在公司的项目中经常使用这两个方法来打印日志的话，就很有可能要挨骂了。那缺点在哪儿了呢？这个就太多了，比如日志开关不可控制、不能添加日志标签、日志没有级别区分等。</p><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h2><p>Android中的日志工具类是Log（android.util.Log），这个类中提供了如下5个方法来供我们打印日志：</p><ul><li>Log.v()。用于打印那些最为琐碎的、意义最小的日志信息。对应级别verbose，是Android日志里面级别最低的一种。</li><li>Log.d()。用于打印一些调试信息，这些信息对你调试程序和分析问题应该是有帮助的。对应级别debug，比verbose高一级。Log.i()。用于打印一些比较重要的数据，这些数据应该是你非常想看到的、可以帮你分析用户行为的数据。对应级别info，比debug高一级。</li><li>Log.w()。用于打印一些警告信息，提示程序在这个地方可能会有潜在的风险，最好去修复一下这些出现警告的地方。对应级别warn，比info高一级。</li><li>Log.e()。用于打印程序中的错误信息，比如程序进入了catch语句中。当有错误信息打印出来的时候，一般代表你的程序出现严重问题了，必须尽快修复。对应级别error，比warn高一级。</li></ul><h1 id="四大核心组件" tabindex="-1"><a class="header-anchor" href="#四大核心组件"><span>四大核心组件</span></a></h1><p>在 Android 应用开发中,有四大核心组件,它们分别是:</p><ul><li>Activity: 代表用户界面的单一屏幕，负责与用户交互。 可以启动其他 Activity 以创建多屏幕应用。</li><li>Service: 在后台运行的组件，不提供用户界面。 用于执行长时间运行的操作或处理后台任务，例如播放音乐或下载文件。</li><li>Broadcast Receiver: 用于接收和处理广播消息（如系统或应用程序的事件）。 允许应用在特定事件发生时响应，例如网络状态变化或电池电量变化。</li><li>Content Provider: 提供应用间的数据共享机制。 允许一个应用访问另一个应用的数据（如联系人、媒体等），并管理对这些数据的访问。</li></ul><h2 id="activity使用" tabindex="-1"><a class="header-anchor" href="#activity使用"><span>Activity使用</span></a></h2><p>Activity是一个单一的界面，用户可以在该界面与应用进行交互。每个Activity通常代表应用中的一个屏幕。 Activity有一组生命周期方法，帮助开发者管理其状态和行为。常见的生命周期方法包括：</p><ul><li>onCreate(): 初始化Activity时调用，设置布局等。</li><li>onStart(): Activity即将变为可见时调用。</li><li>onResume(): Activity已可见并与用户交互时调用。</li><li>onPause(): Activity即将进入不可见状态时调用。</li><li>onStop(): Activity已不可见时调用。</li><li>onDestroy(): Activity即将被销毁时调用，清理资源</li></ul><h3 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.first_layout)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 初始化界面元素  </span></span>
<span class="line"><span>        val textView: TextView = findViewById(R.id.textView)  </span></span>
<span class="line"><span>        textView.text = &quot;欢迎来到我的应用！&quot;  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onStart() {  </span></span>
<span class="line"><span>        super.onStart()  </span></span>
<span class="line"><span>        // Activity即将可见  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onResume() {  </span></span>
<span class="line"><span>        super.onResume()  </span></span>
<span class="line"><span>        // Activity已可见并与用户交互  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onPause() {  </span></span>
<span class="line"><span>        super.onPause()  </span></span>
<span class="line"><span>        // Activity即将不可见  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onStop() {  </span></span>
<span class="line"><span>        super.onStop()  </span></span>
<span class="line"><span>        // Activity已不可见  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onDestroy() {  </span></span>
<span class="line"><span>        super.onDestroy()  </span></span>
<span class="line"><span>        // 清理资源  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  </span></span>
<span class="line"><span>&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  </span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;TextView        android:id=&quot;@+id/textView&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:textSize=&quot;24sp&quot;  </span></span>
<span class="line"><span>        android:layout_centerInParent=&quot;true&quot; /&gt;  </span></span>
<span class="line"><span>&lt;/RelativeLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service使用" tabindex="-1"><a class="header-anchor" href="#service使用"><span>Service使用</span></a></h2><p>Service是Android中实现程序后台运行的解决方案，它非常适合执行那些不需要和用户交互而 且还要求长期运行的任务，例如：</p><ul><li><p>下载文件</p></li><li><p>上传数据</p></li><li><p>播放音乐</p></li><li><p>处理网络请求 在Android的Service类中，有几个重要的方法用于管理服务的生命周期和行为：</p></li><li><p>onCreate():当服务第一次被创建时调用。可以在此方法中进行一次性初始化操作，如创建线程或初始化资源。</p></li><li><p>onStartCommand():每次调用startService()时都会调用此方法。可以在这里处理启动服务时传入的Intent，并执行实际的后台任务。</p></li><li><p>onBind():当其他组件通过bindService()方法绑定到服务时调用。如果服务不支持绑定，可以返回null。</p></li><li><p>onUnbind():当所有客户端都解除绑定时调用,可以在此方法中执行清理工作。</p></li><li><p>onRebind():当新的客户端绑定到已经解绑的服务时调用。</p></li><li><p>onDestroy():当服务被销毁时调用。可以在此方法中释放资源或停止后台任务。</p></li></ul><h3 id="代码示例-1" tabindex="-1"><a class="header-anchor" href="#代码示例-1"><span>代码示例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>class MyService : Service() {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onBind(intent: Intent): IBinder {  </span></span>
<span class="line"><span>        TODO(&quot;Return the communication channel to the service.&quot;)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    override fun onCreate() {  </span></span>
<span class="line"><span>        super.onCreate()  </span></span>
<span class="line"><span>        Log.d(&quot;MyService&quot;, &quot;onCreate executed&quot;)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {  </span></span>
<span class="line"><span>        Log.d(&quot;MyService&quot;, &quot;onStartCommand executed&quot;)  </span></span>
<span class="line"><span>        return super.onStartCommand(intent, flags, startId)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    override fun onDestroy() {  </span></span>
<span class="line"><span>        super.onDestroy()  </span></span>
<span class="line"><span>        Log.d(&quot;MyService&quot;, &quot;onDestroy executed&quot;)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  </span></span>
<span class="line"><span>    android:orientation=&quot;vertical&quot;  </span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;&gt;  </span></span>
<span class="line"><span>    &lt;Button        android:id=&quot;@+id/startServiceBtn&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:text=&quot;Start Service&quot; /&gt;  </span></span>
<span class="line"><span>    &lt;Button        android:id=&quot;@+id/stopServiceBtn&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:text=&quot;Stop Service&quot; /&gt;  </span></span>
<span class="line"><span>&lt;/LinearLayout&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>    private lateinit var startServiceBtn: Button  </span></span>
<span class="line"><span>    private lateinit var stopServiceBtn: Button  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)  </span></span>
<span class="line"><span>        startServiceBtn = findViewById(R.id.startServiceBtn)  </span></span>
<span class="line"><span>        stopServiceBtn = findViewById(R.id.stopServiceBtn)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        startServiceBtn.setOnClickListener {  </span></span>
<span class="line"><span>            val intent = Intent(this, MyService::class.java)  </span></span>
<span class="line"><span>            startService(intent) // 启动Service  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>        stopServiceBtn.setOnClickListener {  </span></span>
<span class="line"><span>            val intent = Intent(this, MyService::class.java)  </span></span>
<span class="line"><span>            stopService(intent) // 停止Service  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="broadcast-receiver使用" tabindex="-1"><a class="header-anchor" href="#broadcast-receiver使用"><span>Broadcast Receiver使用</span></a></h2><p>为Android中的每个应用程序都可以对自己感兴趣的广播进行注册，这样该程序就只会收到自己所关心的广播内容，这些广播可能是来自于系统的，也可能是来自于其他应用程序的。</p><ul><li><strong>隐式广播</strong>: 不指定发送广播的组件，只指定意图（Intent）中的动作。适用于大多数系统广播。系统或其他应用发出，接收者不明确指定。</li><li><strong>显式广播</strong>: 指定特定组件（如某个Activity或Service）来接收广播。程序发出，明确指定接收者。</li></ul><h3 id="代码示例-2" tabindex="-1"><a class="header-anchor" href="#代码示例-2"><span>代码示例</span></a></h3><h4 id="动态注册" tabindex="-1"><a class="header-anchor" href="#动态注册"><span>动态注册</span></a></h4><p>动态注册是在代码中注册BroadcastReceiver，通常在Activity或Service的生命周期方法中进行。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class TimeChangeReceiver : BroadcastReceiver() {  </span></span>
<span class="line"><span>    override fun onReceive(context: Context?, intent: Intent?) {  </span></span>
<span class="line"><span>        val currentTime = SimpleDateFormat(&quot;HH:mm:ss&quot;, Locale.getDefault()).format(Date())  </span></span>
<span class="line"><span>        Toast.makeText(context, &quot;Time has changed $currentTime&quot;, Toast.LENGTH_SHORT).show()  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>import android.content.Intent  </span></span>
<span class="line"><span>import android.content.IntentFilter  </span></span>
<span class="line"><span>import android.os.Bundle  </span></span>
<span class="line"><span>import android.widget.Button  </span></span>
<span class="line"><span>import android.widget.TextView  </span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>    private lateinit var startServiceBtn: Button  </span></span>
<span class="line"><span>    private lateinit var stopServiceBtn: Button  </span></span>
<span class="line"><span>    private lateinit var timeChangeReceiver: TimeChangeReceiver  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)  </span></span>
<span class="line"><span>        startServiceBtn = findViewById(R.id.startServiceBtn)  </span></span>
<span class="line"><span>        stopServiceBtn = findViewById(R.id.stopServiceBtn)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        startServiceBtn.setOnClickListener {  </span></span>
<span class="line"><span>            val intent = Intent(this, MyService::class.java)  </span></span>
<span class="line"><span>            startService(intent) // 启动Service  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>        stopServiceBtn.setOnClickListener {  </span></span>
<span class="line"><span>            val intent = Intent(this, MyService::class.java)  </span></span>
<span class="line"><span>            stopService(intent) // 停止Service  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        timeChangeReceiver = TimeChangeReceiver()  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    override fun onStart() {  </span></span>
<span class="line"><span>        super.onStart()  </span></span>
<span class="line"><span>        // 注册BroadcastReceiver  </span></span>
<span class="line"><span>        val filter = IntentFilter(Intent.ACTION_TIME_TICK)  </span></span>
<span class="line"><span>        registerReceiver(timeChangeReceiver, filter)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onStop() {  </span></span>
<span class="line"><span>        super.onStop()  </span></span>
<span class="line"><span>        // 注销BroadcastReceiver  </span></span>
<span class="line"><span>        unregisterReceiver(timeChangeReceiver)  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>动态注册的BroadcastReceiver可以自由地控制注册与注销，在灵活性方面有很大的优势。但 是它存在着一个缺点，即必须在程序启动之后才能接收广播，因为注册的逻辑是写在 onCreate()方法中的</p><h4 id="静态注册" tabindex="-1"><a class="header-anchor" href="#静态注册"><span>静态注册</span></a></h4><p>编写对应的一个逻辑：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MyReceiver : BroadcastReceiver() {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onReceive(context: Context, intent: Intent) {  </span></span>
<span class="line"><span>        Toast.makeText(context, &quot;received in MyBroadcastReceiver&quot;,  </span></span>
<span class="line"><span>            Toast.LENGTH_SHORT).show()  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这里需要将其注册进行AndroidManifest.xml文件中</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;receiver  </span></span>
<span class="line"><span>    android:name=&quot;.MyReceiver&quot;  </span></span>
<span class="line"><span>    android:enabled=&quot;true&quot;  </span></span>
<span class="line"><span>    android:exported=&quot;true&quot;&gt;  </span></span>
<span class="line"><span>    &lt;intent-filter&gt;        &lt;action android:name=&quot;com.example.broadcasttest.MY_BROADCAST&quot;/&gt;  </span></span>
<span class="line"><span>    &lt;/intent-filter&gt;&lt;/receiver&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&quot;com.example.broadcasttest.MY_BROADCAST&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>即表明他要接收的类型。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>    private lateinit var button: Button  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)  </span></span>
<span class="line"><span>        button=findViewById(R.id.button)  </span></span>
<span class="line"><span>        button.setOnClickListener {  </span></span>
<span class="line"><span>            val intent = Intent(&quot;com.example.broadcasttest.MY_BROADCAST&quot;)  </span></span>
<span class="line"><span>            intent.setPackage(packageName)  </span></span>
<span class="line"><span>            sendBroadcast(intent)  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样即可实现</p><h2 id="contentprovider使用" tabindex="-1"><a class="header-anchor" href="#contentprovider使用"><span>ContentProvider使用</span></a></h2><p>Content Provider是Android应用中的一种组件，用于管理和共享应用数据。它为其他应用提供了一种安全的、标准化的方式来访问数据。、</p><p>在业务中承担的角色：</p><ul><li>数据共享: 允许一个应用访问另一个应用的数据，这对于多应用之间的数据交互非常重要。</li><li>抽象数据存储: 提供统一的接口来访问不同类型的数据源，如SQLite数据库、文件系统或网络。</li><li>安全性: 通过权限控制，确保只有授权的应用才能访问特定的数据。</li></ul><p>ContentProvider的用法一般有两种：一种是使用现有的ContentProvider读取和操作相应程 序中的数据；另一种是创建自己的ContentProvider，给程序的数据提供外部访问接口。</p><h3 id="权限处理" tabindex="-1"><a class="header-anchor" href="#权限处理"><span>权限处理</span></a></h3><p>在我们读取其他数据之前，我们首先要处理的是权限的问题。比如我们读取照片和电话信息时，app都会跳出对应的弹窗要求我们授予对应的权限。</p><p>流程可以大概分为：</p><ul><li>在Manifest中声明权限。</li><li>检查是否已获得权限。</li><li>如果未获得权限，申请权限。</li><li>处理用户的授权结果。</li></ul><h4 id="声明权限" tabindex="-1"><a class="header-anchor" href="#声明权限"><span>声明权限</span></a></h4><p>我们首先要声明权限，即安装时就要求拥有的权限.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;uses-permission android:name=&quot;android.permission.READ_CONTACTS&quot; /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="检查权限" tabindex="-1"><a class="header-anchor" href="#检查权限"><span>检查权限</span></a></h4><p>这里要使用的函数为checkSelfPermission函数</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public static int checkSelfPermission(@NonNull Context context, @NonNull String permission)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>参数</p><ul><li>context: 当前的上下文，通常是 Activity 或 Application。</li><li>permission: 要检查的权限字符串，例如 Manifest.permission.CAMERA。</li></ul><p>返回值</p><ul><li>返回 PackageManager.PERMISSION_GRANTED (值为 0) 表示权限已获得。</li><li>返回 PackageManager.PERMISSION_DENIED (值为 -1) 表示权限未获得。</li></ul><h4 id="申请权限" tabindex="-1"><a class="header-anchor" href="#申请权限"><span>申请权限</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public void requestPermissions(@NonNull String[] permissions, int requestCode)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>参数</p><ul><li>permissions: 一个字符串数组，包含要请求的权限。</li><li>requestCode: 一个整型值，用于标识这个请求，以便在回调中处理。</li></ul><h4 id="处理授权结果" tabindex="-1"><a class="header-anchor" href="#处理授权结果"><span>处理授权结果</span></a></h4><p>当用户做出权限选择后，系统会调用这个方法。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>requestCode: 之前传递的请求代码。</li><li>permissions: 请求的权限数组。</li><li>grantResults: 权限请求的结果数组，其中每个元素对应于 permissions 数组的元素，值为 PackageManager.PERMISSION_GRANTED 或 PackageManager.PERMISSION_DENIED。</li></ul><h4 id="完整代码示例" tabindex="-1"><a class="header-anchor" href="#完整代码示例"><span>完整代码示例</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>package com.example.permissionexample</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import android.Manifest</span></span>
<span class="line"><span>import android.content.pm.PackageManager</span></span>
<span class="line"><span>import android.os.Bundle</span></span>
<span class="line"><span>import android.widget.Toast</span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity</span></span>
<span class="line"><span>import androidx.core.app.ActivityCompat</span></span>
<span class="line"><span>import androidx.core.content.ContextCompat</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private val REQUEST_PHONE_PERMISSION = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        checkAndRequestPhonePermission()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun checkAndRequestPhonePermission() {</span></span>
<span class="line"><span>        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {</span></span>
<span class="line"><span>            // 权限已获得</span></span>
<span class="line"><span>            Toast.makeText(this, &quot;权限已获得&quot;, Toast.LENGTH_SHORT).show()</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 请求权限</span></span>
<span class="line"><span>            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CALL_PHONE), REQUEST_PHONE_PERMISSION)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array&lt;out String&gt;, grantResults: IntArray) {</span></span>
<span class="line"><span>        if (requestCode == REQUEST_PHONE_PERMISSION) {</span></span>
<span class="line"><span>            if (grantResults.isNotEmpty() &amp;&amp; grantResults[0] == PackageManager.PERMISSION_GRANTED) {</span></span>
<span class="line"><span>                // 用户已同意权限</span></span>
<span class="line"><span>                Toast.makeText(this, &quot;用户同意权限&quot;, Toast.LENGTH_SHORT).show()</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                // 用户拒绝权限</span></span>
<span class="line"><span>                Toast.makeText(this, &quot;用户不同意权限&quot;, Toast.LENGTH_SHORT).show()</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="读取数据" tabindex="-1"><a class="header-anchor" href="#读取数据"><span>读取数据</span></a></h3><h4 id="基本方法" tabindex="-1"><a class="header-anchor" href="#基本方法"><span>基本方法</span></a></h4><p>这里我们使用的ContentResolver，来进行对应的CRUD:</p><ul><li>查询数据: 使用 query() 方法从 ContentProvider 获取数据。</li><li>插入数据: 使用 insert() 方法向 ContentProvider 添加新数据。</li><li>更新数据: 使用 update() 方法修改 ContentProvider 中的现有数据。</li><li>删除数据: 使用 delete() 方法从 ContentProvider 移除数据。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>contentResolver.query(uri, null, null, null, null)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>参数：</p><ul><li>uri: 要查询的内容 URI。</li><li>projection: 要返回的列名数组（可为 null，表示返回所有列）。</li><li>selection: 选择条件（WHERE 子句，或 null）。</li><li>selectionArgs: 选择条件的参数数组（或 null）。</li><li>sortOrder: 排序顺序（或 null）。</li></ul><p>对于结果的处理，我们这里使用Cursor，来实现结果的梳理：</p><ul><li>遍历结果: 使用 moveToNext() 方法移动到下一行。</li><li>获取列值: 使用 getString()、getInt() 等方法获取特定列的数据。</li><li>获取列索引: 使用 getColumnIndex() 方法根据列名获取列的索引。</li><li>资源管理: 提供 close() 方法以释放相关资源。</li></ul><h4 id="代码示例-3" tabindex="-1"><a class="header-anchor" href="#代码示例-3"><span>代码示例</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>val contentResolver: ContentResolver = contentResolver   //创建ContentValues 实例 </span></span>
<span class="line"><span>val uri: Uri = ContactsContract.Contacts.CONTENT_URI  //</span></span>
<span class="line"><span>val cursor: Cursor? = contentResolver.query(uri, null, null, null, null)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cursor?.use {  </span></span>
<span class="line"><span>    val nameIndex = it.getColumnIndex(ContactsContract.Contacts.CONTACT_STATUS)  </span></span>
<span class="line"><span>    while (it.moveToNext()) {  //将光标移动到下一行。如果还有行可供访问，返回 true，否则返回 false。</span></span>
<span class="line"><span>        val name = it.getString(nameIndex)  </span></span>
<span class="line"><span>        // 显示联系人名称  </span></span>
<span class="line"><span>        Toast.makeText(this, &quot;联系人: $name&quot;, Toast.LENGTH_SHORT).show()  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用了getColumnIndex方法，使用列名ContactsContract.Contacts.CONTACT_STATUS来获取对应的一个索引。</p><h1 id="webview使用" tabindex="-1"><a class="header-anchor" href="#webview使用"><span>WebView使用</span></a></h1><p>WebView 是一种用于在应用程序中显示网页内容的组件，常用于 Android 和 iOS 开发。它允许开发者在本地应用程序中嵌入网页浏览功能，而不需要打开系统浏览器。</p><h2 id="网页加载" tabindex="-1"><a class="header-anchor" href="#网页加载"><span>网页加载</span></a></h2><h3 id="url加载" tabindex="-1"><a class="header-anchor" href="#url加载"><span>url加载</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>myWebView.loadUrl(&quot;https://www.example.com&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="直接加载数据" tabindex="-1"><a class="header-anchor" href="#直接加载数据"><span>直接加载数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>val htmlData = &quot;&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello, WebView!&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;&quot;</span></span>
<span class="line"><span>myWebView.loadData(htmlData, &quot;text/html&quot;, &quot;UTF-8&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网页控制" tabindex="-1"><a class="header-anchor" href="#网页控制"><span>网页控制</span></a></h2><ul><li>goBack():返回到上一个网页。</li><li>goForward():返回到下一个网页。</li><li>reload():重新加载当前网页。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (myWebView.canGoBack()) {</span></span>
<span class="line"><span>    myWebView.goBack()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (myWebView.canGoForward()) {</span></span>
<span class="line"><span>    myWebView.goForward()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>myWebView.reload()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="javascript使用-jsbridge" tabindex="-1"><a class="header-anchor" href="#javascript使用-jsbridge"><span>JavaScript使用(JSBridge)</span></a></h2><h3 id="启用-javascript交互权限" tabindex="-1"><a class="header-anchor" href="#启用-javascript交互权限"><span>启用 JavaScript交互权限</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>	myWebView.settings.javaScriptEnabled = true\`</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="安卓调用javascript" tabindex="-1"><a class="header-anchor" href="#安卓调用javascript"><span>安卓调用javascript</span></a></h3><p>有以下两种方法可以进行执行</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>WebView.loadUrl(String url);</span></span>
<span class="line"><span>WebView.evaluateJavascript(String script, ValueCallback&lt;String&gt; resultCallback);	// android 4.4增加</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>即直接加载对应的url，或者是手动传入javascript代码。</p><h4 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码"><span>示例代码</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import android.os.Bundle</span></span>
<span class="line"><span>import android.webkit.WebChromeClient</span></span>
<span class="line"><span>import android.webkit.WebView</span></span>
<span class="line"><span>import android.webkit.WebViewClient</span></span>
<span class="line"><span>import android.widget.Button</span></span>
<span class="line"><span>import android.widget.Toast</span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private lateinit var myWebView: WebView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        myWebView = findViewById(R.id.webview)</span></span>
<span class="line"><span>        myWebView.webViewClient = WebViewClient()</span></span>
<span class="line"><span>        myWebView.webChromeClient = WebChromeClient() // 设置 WebChromeClient</span></span>
<span class="line"><span>        myWebView.settings.javaScriptEnabled = true // 启用 JavaScript</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 加载本地 HTML 文件</span></span>
<span class="line"><span>        myWebView.loadUrl(&quot;file:///android_asset/sample.html&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        val button: Button = findViewById(R.id.button_execute_js)</span></span>
<span class="line"><span>        button.setOnClickListener {</span></span>
<span class="line"><span>            // 执行 JavaScript 弹窗</span></span>
<span class="line"><span>            executeJavaScript()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun executeJavaScript() {</span></span>
<span class="line"><span>        // JavaScript 代码: 显示弹窗</span></span>
<span class="line"><span>        val jsCode = &quot;alert(&#39;This is a JavaScript alert!&#39;);&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        myWebView.evaluateJavascript(jsCode) { result -&gt;</span></span>
<span class="line"><span>            // 处理返回值（如果需要）</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>src/main/assets 目录下创建一个名为 sample.html 的文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Sample Page&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;Hello, WebView!&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;p&gt;This is a sample page.&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="javascript-调用安卓" tabindex="-1"><a class="header-anchor" href="#javascript-调用安卓"><span>JavaScript 调用安卓</span></a></h3><p>js调用java有三种方法：</p><ul><li>注入API：将native对象或方法注入到WebView的window对象中（有点类似于RPC）；</li><li>拦截urlschema：native层拦截WebView请求并做相应的操作（有点类似于jsonp）；</li><li>WebChromeClient中的onXxx()xxx方法，如：onConsoleMessage()、onJsPrompt()、onJsAlert()、onJsConfirm()等；</li></ul><h4 id="addjavascriptinterface注入" tabindex="-1"><a class="header-anchor" href="#addjavascriptinterface注入"><span>addJavascriptInterface注入</span></a></h4><p>将本地对象暴露给 JavaScript，使 JavaScript 能够调用本地方法。 myWebView.addJavascriptInterface(MyJavaScriptInterface(), &quot;AndroidInterface&quot;)</p><ul><li>第一个参数是要暴露的对象（在此例中是 MyJavaScriptInterface 的实例）。</li><li>第二个参数是 JavaScript 中访问该对象时使用的名称（在此例中是 &quot;AndroidInterface&quot;）。</li></ul><h5 id="创建调用对象" tabindex="-1"><a class="header-anchor" href="#创建调用对象"><span>创建调用对象</span></a></h5><p>定义一个包含可供 JavaScript 调用的方法的 Java 类。在这些方法前加上 @JavascriptInterface 注解，以使其可被 JavaScript 调用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MyJavaScriptInterface(private val context: Context) {</span></span>
<span class="line"><span>    @JavascriptInterface</span></span>
<span class="line"><span>    fun showToast(message: String) {</span></span>
<span class="line"><span>        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @JavascriptInterface</span></span>
<span class="line"><span>    fun getDeviceInfo(): String {</span></span>
<span class="line"><span>        return &quot;Device Info: \${Build.MODEL}, \${Build.VERSION.RELEASE}&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="创建接口" tabindex="-1"><a class="header-anchor" href="#创建接口"><span>创建接口</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>myWebView.addJavascriptInterface(MyJavaScriptInterface(this), &quot;AndroidInterface&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h5 id="javascript-调用" tabindex="-1"><a class="header-anchor" href="#javascript-调用"><span>JavaScript 调用</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function callAndroid() {</span></span>
<span class="line"><span>    AndroidInterface.showToast(&quot;Hello from JavaScript!&quot;);</span></span>
<span class="line"><span>    var deviceInfo = AndroidInterface.getDeviceInfo();</span></span>
<span class="line"><span>    console.log(deviceInfo);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="示例代码-1" tabindex="-1"><a class="header-anchor" href="#示例代码-1"><span>示例代码</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private lateinit var myWebView: WebView  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        myWebView = findViewById(R.id.webview)  </span></span>
<span class="line"><span>        myWebView.webViewClient = WebViewClient()  </span></span>
<span class="line"><span>        myWebView.webChromeClient = WebChromeClient() // 设置 WebChromeClient        myWebView.settings.javaScriptEnabled = true // 启用 JavaScript        // 加载本地 HTML 文件  </span></span>
<span class="line"><span>        myWebView.loadUrl(&quot;file:///android_asset/1.html&quot;)  </span></span>
<span class="line"><span>        myWebView.addJavascriptInterface(MyJavaScriptInterface(this), &quot;AndroidInterface&quot;)  </span></span>
<span class="line"><span>        myWebView.settings.javaScriptEnabled = true  </span></span>
<span class="line"><span>        val button: Button = findViewById(R.id.button_execute_js)  </span></span>
<span class="line"><span>        button.setOnClickListener {  </span></span>
<span class="line"><span>            // 执行 JavaScript 弹窗  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>            executeJavaScript()  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private fun executeJavaScript() {  </span></span>
<span class="line"><span>        // JavaScript 代码: 显示弹窗  </span></span>
<span class="line"><span>        val jsCode = &quot;function callAndroid() {\\n&quot; +  </span></span>
<span class="line"><span>                &quot;    AndroidInterface.showToast(\\&quot;Hello from JavaScript!\\&quot;);\\n&quot; +  </span></span>
<span class="line"><span>                &quot;    var deviceInfo = AndroidInterface.getDeviceInfo();\\n&quot; +  </span></span>
<span class="line"><span>                &quot;    console.log(deviceInfo);\\n&quot; +  </span></span>
<span class="line"><span>                &quot;};\\n&quot; +  </span></span>
<span class="line"><span>                &quot;callAndroid();&quot;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        myWebView.evaluateJavascript(jsCode) { result -&gt;  </span></span>
<span class="line"><span>            // 处理返回值（如果需要）  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    class MyJavaScriptInterface(private val context: Context) {  </span></span>
<span class="line"><span>        @JavascriptInterface  </span></span>
<span class="line"><span>        fun showToast(message: String) {  </span></span>
<span class="line"><span>            println(&quot;ssdfsdf&quot;)  </span></span>
<span class="line"><span>            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        @JavascriptInterface  </span></span>
<span class="line"><span>        fun getDeviceInfo(): String {  </span></span>
<span class="line"><span>            return &quot;Device Info: \${Build.MODEL}, \${Build.VERSION.RELEASE}&quot;  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>html和xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;  </span></span>
<span class="line"><span>&lt;html&gt;  </span></span>
<span class="line"><span>&lt;head&gt;  </span></span>
<span class="line"><span>    &lt;title&gt;Console Log Example&lt;/title&gt;  </span></span>
<span class="line"><span>&lt;/head&gt;  </span></span>
<span class="line"><span>&lt;body&gt;  </span></span>
<span class="line"><span>&lt;h1&gt;Welcome to WebView&lt;/h1&gt;  </span></span>
<span class="line"><span>&lt;/body&gt;  </span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  </span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;WebView        android:id=&quot;@+id/webview&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;match_parent&quot; /&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;Button        android:id=&quot;@+id/button_execute_js&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:text=&quot;Execute JavaScript&quot;  </span></span>
<span class="line"><span>        android:layout_alignParentBottom=&quot;true&quot;  </span></span>
<span class="line"><span>        android:layout_centerHorizontal=&quot;true&quot;  </span></span>
<span class="line"><span>        android:layout_marginBottom=&quot;16dp&quot; /&gt;  </span></span>
<span class="line"><span>&lt;/RelativeLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="请求拦截" tabindex="-1"><a class="header-anchor" href="#请求拦截"><span>请求拦截</span></a></h4><p>houldOverrideUrlLoading 是 Android 中 WebViewClient 类的一个方法，用于拦截和处理 WebView 中的 URL 加载请求。通过重写这个方法，开发者可以控制 URL 的加载行为，例如在特定条件下拦截请求、打开外部浏览器、或处理自定义 URL scheme。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>参数：</p><ul><li>view: WebView: 当前的 WebView 实例。</li><li>request: WebResourceRequest: 包含请求信息的对象，包括 URL、HTTP 方法等。 返回值： Boolean: 如果返回 true，表示你已经处理了这个请求，WebView 不会继续加载该 URL；如果返回 false，表示 WebView 将继续加载该 URL。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MyWebViewClient : WebViewClient() {</span></span>
<span class="line"><span>    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {</span></span>
<span class="line"><span>        val url = request.url.toString()</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 拦截特定的 URL</span></span>
<span class="line"><span>        if (url.startsWith(&quot;http://example.com&quot;)) {</span></span>
<span class="line"><span>            // 处理该 URL</span></span>
<span class="line"><span>            // 例如，打开一个新的 Activity，或在 WebView 中加载</span></span>
<span class="line"><span>            return true // 表示我们处理了这个请求</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 对于其他 URL 继续加载</span></span>
<span class="line"><span>        return false</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在你的 Activity 中设置 WebViewClient</span></span>
<span class="line"><span>myWebView.webViewClient = MyWebViewClient()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="代码示例-4" tabindex="-1"><a class="header-anchor" href="#代码示例-4"><span>代码示例</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import android.net.Uri</span></span>
<span class="line"><span>import android.os.Bundle</span></span>
<span class="line"><span>import android.webkit.WebResourceRequest</span></span>
<span class="line"><span>import android.webkit.WebView</span></span>
<span class="line"><span>import android.webkit.WebViewClient</span></span>
<span class="line"><span>import android.widget.Button</span></span>
<span class="line"><span>import android.widget.Toast</span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private lateinit var myWebView: WebView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        myWebView = findViewById(R.id.webview)</span></span>
<span class="line"><span>        myWebView.webViewClient = object : WebViewClient() {</span></span>
<span class="line"><span>            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {</span></span>
<span class="line"><span>                val url = request.url.toString()</span></span>
<span class="line"><span>                if (url.startsWith(&quot;native://&quot;)) {</span></span>
<span class="line"><span>                    handleNativeRequest(url)</span></span>
<span class="line"><span>                    return true // 表示我们处理了这个请求</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                return false // 继续加载其他 URL</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 启用 JavaScript</span></span>
<span class="line"><span>        myWebView.settings.javaScriptEnabled = true</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 加载本地 HTML 文件</span></span>
<span class="line"><span>        myWebView.loadUrl(&quot;file:///android_asset/sample.html&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        val button: Button = findViewById(R.id.button_execute_js)</span></span>
<span class="line"><span>        button.setOnClickListener {</span></span>
<span class="line"><span>            // 触发 JavaScript 函数</span></span>
<span class="line"><span>            myWebView.evaluateJavascript(&quot;callAndroid();&quot;, null)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun handleNativeRequest(url: String) {</span></span>
<span class="line"><span>        // 解析 URL</span></span>
<span class="line"><span>        val uri = Uri.parse(url)</span></span>
<span class="line"><span>        val action = uri.host // 获取请求的操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (action == &quot;showToast&quot;) {</span></span>
<span class="line"><span>            val message = uri.getQueryParameter(&quot;message&quot;) // 获取参数</span></span>
<span class="line"><span>            Toast.makeText(this, message, Toast.LENGTH_SHORT).show()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 可以添加更多的处理逻辑</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;title&gt;JavaScript to Android&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;Hello, WebView!&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;button onclick=&quot;callAndroid()&quot;&gt;Call Android Method&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        function callAndroid() {</span></span>
<span class="line"><span>            // 通过 native URL 调用 Android 方法</span></span>
<span class="line"><span>            window.location.href = &quot;native://showToast?message=Hello from JavaScript!&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;WebView</span></span>
<span class="line"><span>        android:id=&quot;@+id/webview&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;match_parent&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;Button</span></span>
<span class="line"><span>        android:id=&quot;@+id/button_execute_js&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:text=&quot;调用 Android 方法&quot;</span></span>
<span class="line"><span>        android:layout_alignParentBottom=&quot;true&quot;</span></span>
<span class="line"><span>        android:layout_centerHorizontal=&quot;true&quot;/&gt;</span></span>
<span class="line"><span>&lt;/RelativeLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数"><span>回调函数</span></a></h4><p>android.webkit.WebChromeClient类中定义了大量的回调函数使用，以便开发者可以处理 JavaScript 交互、文件选择、视频播放、进度更新等功能。 下文以onConsoleMessage函数进行举例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>override fun onConsoleMessage(message: String, lineNumber: Int, sourceID: String)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>message: String: 控制台输出的消息内容，通常是通过 console.log() 打印的字符串。</li><li>lineNumber: Int: 产生该消息的行号，方便开发者定位问题。</li><li>sourceID: String: 消息来源的文件名，通常是 JavaScript 文件或 HTML 文件的名称。</li></ul><h5 id="代码示例-5" tabindex="-1"><a class="header-anchor" href="#代码示例-5"><span>代码示例</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;WebView</span></span>
<span class="line"><span>        android:id=&quot;@+id/webview&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;match_parent&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;ProgressBar</span></span>
<span class="line"><span>        android:id=&quot;@+id/progress_bar&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:layout_centerInParent=&quot;true&quot; /&gt;</span></span>
<span class="line"><span>&lt;/RelativeLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import android.os.Bundle</span></span>
<span class="line"><span>import android.util.Log</span></span>
<span class="line"><span>import android.webkit.WebChromeClient</span></span>
<span class="line"><span>import android.webkit.WebView</span></span>
<span class="line"><span>import android.webkit.WebViewClient</span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private lateinit var myWebView: WebView</span></span>
<span class="line"><span>    private lateinit var progressBar: ProgressBar</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        myWebView = findViewById(R.id.webview)</span></span>
<span class="line"><span>        progressBar = findViewById(R.id.progress_bar)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置 WebViewClient</span></span>
<span class="line"><span>        myWebView.webViewClient = WebViewClient()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置 WebChromeClient 来捕获 console.log</span></span>
<span class="line"><span>        myWebView.webChromeClient = object : WebChromeClient() {</span></span>
<span class="line"><span>            override fun onConsoleMessage(message: String, lineNumber: Int, sourceID: String) {</span></span>
<span class="line"><span>                // 捕获 console.log 输出</span></span>
<span class="line"><span>                Log.d(&quot;WebViewConsole&quot;, &quot;$message -- From line $lineNumber of $sourceID&quot;)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            override fun onProgressChanged(view: WebView, newProgress: Int) {</span></span>
<span class="line"><span>                progressBar.progress = newProgress</span></span>
<span class="line"><span>                if (newProgress == 100) {</span></span>
<span class="line"><span>                    progressBar.visibility = View.GONE // 完成时隐藏进度条</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 启用 JavaScript</span></span>
<span class="line"><span>        myWebView.settings.javaScriptEnabled = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 加载本地 HTML 文件</span></span>
<span class="line"><span>        myWebView.loadUrl(&quot;file:///android_asset/sample.html&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Console Log Example&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;Welcome to WebView&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        console.log(&quot;Hello from JavaScript!&quot;);</span></span>
<span class="line"><span>        console.log(&quot;This is a test message.&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 模拟一个计算</span></span>
<span class="line"><span>        let result = 5 + 10;</span></span>
<span class="line"><span>        console.log(&quot;The result of 5 + 10 is: &quot; + result);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="app唤醒" tabindex="-1"><a class="header-anchor" href="#app唤醒"><span>App唤醒</span></a></h1><h2 id="url-scheme" tabindex="-1"><a class="header-anchor" href="#url-scheme"><span>url scheme</span></a></h2><p>URL scheme（也称为深度链接）可以让其他应用或网页通过特定的 URL 打开你的应用。这里是基本的格式</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;scheme&gt;://&lt;host&gt;:&lt;port&gt;/&lt;path&gt;?&lt;query&gt;#&lt;fragment&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其中的<code>&lt;scheme&gt;://&lt;host&gt;</code>即为定位对应app的</p><p>首先我们配置对应的AndroidManifest.xml，来设置意图过滤器</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;intent-filter&gt;</span></span>
<span class="line"><span>        &lt;action android:name=&quot;android.intent.action.VIEW&quot; /&gt;</span></span>
<span class="line"><span>        &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt;</span></span>
<span class="line"><span>        &lt;category android:name=&quot;android.intent.category.BROWSABLE&quot; /&gt;</span></span>
<span class="line"><span>        &lt;data android:scheme=&quot;test&quot; android:host=&quot;test&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/intent-filter&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="唤醒app代码" tabindex="-1"><a class="header-anchor" href="#唤醒app代码"><span>唤醒app代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span>    private lateinit var webView: WebView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        webView = findViewById(R.id.webView)</span></span>
<span class="line"><span>        webView.settings.javaScriptEnabled = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 加载 HTML 内容</span></span>
<span class="line"><span>        webView.loadDataWithBaseURL(null, getHtmlContent(), &quot;text/html&quot;, &quot;UTF-8&quot;, null)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun getHtmlContent(): String {</span></span>
<span class="line"><span>        return &quot;&quot;&quot;</span></span>
<span class="line"><span>            &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>            &lt;html&gt;</span></span>
<span class="line"><span>            &lt;head&gt;</span></span>
<span class="line"><span>                &lt;title&gt;Trigger Intent URI&lt;/title&gt;</span></span>
<span class="line"><span>                &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>                    function triggerIntent() {</span></span>
<span class="line"><span>                        // 触发自定义 Intent URI</span></span>
<span class="line"><span>                         window.location.href = &quot;test://test/demo?id=2&amp;name=jack&quot;;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                &lt;/script&gt;</span></span>
<span class="line"><span>            &lt;/head&gt;</span></span>
<span class="line"><span>            &lt;body&gt;</span></span>
<span class="line"><span>                &lt;button onclick=&quot;triggerIntent()&quot;&gt;Open App&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/body&gt;</span></span>
<span class="line"><span>            &lt;/html&gt;</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:orientation=&quot;vertical&quot;</span></span>
<span class="line"><span>    android:padding=&quot;16dp&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;WebView</span></span>
<span class="line"><span>        android:id=&quot;@+id/webView&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;match_parent&quot; /&gt;</span></span>
<span class="line"><span>&lt;/LinearLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="被唤醒app代码" tabindex="-1"><a class="header-anchor" href="#被唤醒app代码"><span>被唤醒app代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {  </span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {  </span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)  </span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        // 获取 Intent 和 URI        val intent: Intent? = intent  </span></span>
<span class="line"><span>        var data: Uri? = intent?.data  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        if (data != null) {  </span></span>
<span class="line"><span>            // 从 URI 中提取参数  </span></span>
<span class="line"><span>            val id = data.getQueryParameter(&quot;id&quot;)  </span></span>
<span class="line"><span>            // 在 TextView 中显示提取的 ID            val textView: TextView = findViewById(R.id.textView)  </span></span>
<span class="line"><span>            textView.text = &quot;Received ID: $data&quot;  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  </span></span>
<span class="line"><span>&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  </span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;  </span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;  </span></span>
<span class="line"><span>    android:orientation=&quot;vertical&quot;  </span></span>
<span class="line"><span>    android:padding=&quot;16dp&quot;&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;TextView        android:id=&quot;@+id/textView&quot;  </span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;  </span></span>
<span class="line"><span>        android:textSize=&quot;18sp&quot; /&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>&lt;/LinearLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="intent-based-uri" tabindex="-1"><a class="header-anchor" href="#intent-based-uri"><span>intent-based URI</span></a></h2><p>是一种特殊格式的 URI（统一资源标识符），用于在 Android 中通过 Intent 启动应用并传递数据。它结合了标准的 URI 格式和 Intent 的描述信息。 和URL Scheme的区别是 Intent-based URI 提供了更强大的功能和灵活性，适合复杂的 Android 应用间交互。仅支持在Android平台使用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>intent://&lt;host&gt;/&lt;path&gt;?&lt;query&gt;#Intent;scheme=&lt;scheme&gt;;package=&lt;package_name&gt;;end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>主机（host）: 指定要访问的主机，例如 kuaishou.com。</li><li>路径（path）: 表示特定的资源或功能，例如 /view/c/c/c。</li><li>查询参数（query）: 以 ? 开头，用于传递额外的数据，例如 id=223。</li><li>Fragment（锚点）部分: 以 Intent; 开头，后面跟随 Intent 的详细描述。</li><li>Intent 描述: scheme=: 指定要使用的 URL scheme（如 myapp）。 package=: 指定要启动的目标应用的包名（如 com.example.targetapp）。 end;: 表示 Intent 描述的结束。</li></ul><h3 id="唤醒app代码-1" tabindex="-1"><a class="header-anchor" href="#唤醒app代码-1"><span>唤醒app代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span>    private lateinit var webView: WebView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        webView = findViewById(R.id.webView)</span></span>
<span class="line"><span>        webView.settings.javaScriptEnabled = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        webView.loadDataWithBaseURL(null, getHtmlContent(), &quot;text/html&quot;, &quot;UTF-8&quot;, null)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun getHtmlContent(): String {</span></span>
<span class="line"><span>        return &quot;&quot;&quot;</span></span>
<span class="line"><span>            &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>            &lt;html&gt;</span></span>
<span class="line"><span>            &lt;head&gt;</span></span>
<span class="line"><span>                &lt;title&gt;Trigger Intent URI&lt;/title&gt;</span></span>
<span class="line"><span>                &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>                    function triggerIntent() {</span></span>
<span class="line"><span>                        </span></span>
<span class="line"><span>                        window.location.href = &quot;intent://view/c/c/c?id=223#Intent;scheme=myapp;end;&quot;;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                &lt;/script&gt;</span></span>
<span class="line"><span>            &lt;/head&gt;</span></span>
<span class="line"><span>            &lt;body&gt;</span></span>
<span class="line"><span>                &lt;button onclick=&quot;triggerIntent()&quot;&gt;Open App&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/body&gt;</span></span>
<span class="line"><span>            &lt;/html&gt;</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="app-link" tabindex="-1"><a class="header-anchor" href="#app-link"><span>app link</span></a></h2><p>App Links 提供了一种强大而灵活的方式来创建深度链接，允许用户从网页或其他应用无缝地导航到你的 Android 应用中的特定内容。</p><h3 id="服务端配置" tabindex="-1"><a class="header-anchor" href="#服务端配置"><span>服务端配置</span></a></h3><p>我们首先在网址下放好对应的配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>https://www.example.com/.well-known/assetlinks.json</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>/.well-known/ 是一个标准的 URI 路径，用于存放各种协议的元数据。</li><li>assetlinks.json 文件必须位于这个路径下，以便 Android 在处理 App Links 时能够自动查找。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[{</span></span>
<span class="line"><span>  &quot;relation&quot;: [&quot;delegate_permission/common.handle_all_urls&quot;],</span></span>
<span class="line"><span>  &quot;target&quot;: {</span></span>
<span class="line"><span>    &quot;namespace&quot;: &quot;android_app&quot;,</span></span>
<span class="line"><span>    &quot;package_name&quot;: &quot;com.xing.jnigo&quot;,</span></span>
<span class="line"><span>    &quot;sha256_cert_fingerprints&quot;:</span></span>
<span class="line"><span>    [&quot;FA:2A:03:CB:38:9C:F3:BE:28:E3:CA:7F:DA:2E:FA:4F:4A:96:3B:DF&quot;]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>package_name 需要你修改成你自己的包名；</li><li>sha256_cert_fingerprints 需要获取你的apk 的sha-256签名</li></ul><h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置"><span>客户端配置</span></a></h3><p>配置对应的服务端网址</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;activity android:name=&quot;.MainActivity&quot;&gt; &lt;intent-filter android:autoVerify=&quot;true&quot;&gt; &lt;action android:name=&quot;android.intent.action.VIEW&quot; /&gt; &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt; &lt;category android:name=&quot;android.intent.category.BROWSABLE&quot; /&gt; &lt;data android:scheme=&quot;https&quot; android:host=&quot;www.example.com&quot; /&gt; &lt;/intent-filter&gt; &lt;/activity&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编写一个简单的Activity来接收url数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import android.content.Intent</span></span>
<span class="line"><span>import android.net.Uri</span></span>
<span class="line"><span>import android.os.Bundle</span></span>
<span class="line"><span>import android.widget.TextView</span></span>
<span class="line"><span>import androidx.appcompat.app.AppCompatActivity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span>    private lateinit var textView: TextView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        textView = findViewById(R.id.textView)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 检查 Intent 是否包含数据</span></span>
<span class="line"><span>        intent?.let {</span></span>
<span class="line"><span>            if (Intent.ACTION_VIEW == it.action) {</span></span>
<span class="line"><span>                handleDeepLink(it.data)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun handleDeepLink(uri: Uri?) {</span></span>
<span class="line"><span>        uri?.let {</span></span>
<span class="line"><span>            val itemId = it.getQueryParameter(&quot;id&quot;)</span></span>
<span class="line"><span>            val itemName = it.getQueryParameter(&quot;name&quot;)</span></span>
<span class="line"><span>            textView.text = &quot;Item ID: $itemId\\nItem Name: $itemName&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></span>
<span class="line"><span>    android:layout_width=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:layout_height=&quot;match_parent&quot;</span></span>
<span class="line"><span>    android:padding=&quot;16dp&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;TextView</span></span>
<span class="line"><span>        android:id=&quot;@+id/textView&quot;</span></span>
<span class="line"><span>        android:layout_width=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:layout_height=&quot;wrap_content&quot;</span></span>
<span class="line"><span>        android:textSize=&quot;18sp&quot; /&gt;</span></span>
<span class="line"><span>&lt;/RelativeLayout&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样访问 https://www.example.com/?id=223&amp;name=jack 的链接。应用就会自动打开，并显示传递的 ID 和名称。</p><h2 id="webview访问本app内其他组件" tabindex="-1"><a class="header-anchor" href="#webview访问本app内其他组件"><span>webview访问本app内其他组件</span></a></h2><h3 id="唤醒app代码-2" tabindex="-1"><a class="header-anchor" href="#唤醒app代码-2"><span>唤醒app代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class MainActivity : AppCompatActivity() {</span></span>
<span class="line"><span>    private lateinit var webView: WebView</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onCreate(savedInstanceState: Bundle?) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState)</span></span>
<span class="line"><span>        setContentView(R.layout.activity_main)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        webView = findViewById(R.id.webView)</span></span>
<span class="line"><span>        webView.settings.javaScriptEnabled = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置 WebViewClient</span></span>
<span class="line"><span>      //  webView.webViewClient = object : WebViewClient() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 加载 HTML 内容</span></span>
<span class="line"><span>        webView.loadDataWithBaseURL(null, getHtmlContent(), &quot;text/html&quot;, &quot;UTF-8&quot;, null)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private fun getHtmlContent(): String {</span></span>
<span class="line"><span>        return &quot;&quot;&quot;</span></span>
<span class="line"><span>            &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>            &lt;html&gt;</span></span>
<span class="line"><span>            &lt;head&gt;</span></span>
<span class="line"><span>                &lt;title&gt;Trigger Intent URI&lt;/title&gt;</span></span>
<span class="line"><span>                &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>                    function triggerIntent() {</span></span>
<span class="line"><span>                        // 触发自定义 Intent URI</span></span>
<span class="line"><span>                         window.location.href = &quot;intent://test/c/c/c?id=223#Intent;scheme=test;end;&quot;;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                &lt;/script&gt;</span></span>
<span class="line"><span>            &lt;/head&gt;</span></span>
<span class="line"><span>            &lt;body&gt;</span></span>
<span class="line"><span>                &lt;button onclick=&quot;triggerIntent()&quot;&gt;Open App&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/body&gt;</span></span>
<span class="line"><span>            &lt;/html&gt;</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时你会发现如果把注释去掉，你会发现此时就无法调用其他组件了。</p><p>底层原因是如果未指定webviewClient，就给android处理。android系统会在系统中寻找注册了https scheme的app。</p><p>如果你指定了webviewClient,那么就由你指定的这个webviewClient来处理，这里的webviewClien就要你自己编写了对应的Intent URI处理逻辑，才会进行打开对应的组件了。</p><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h1><p>https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-2%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-app&amp;%3Bhl=zh-cn&amp;hl=zh-cn#4</p>`,196)]))}const c=s(l,[["render",p],["__file","安卓学习.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/%E5%AE%89%E5%8D%93/%E5%AE%89%E5%8D%93%E5%AD%A6%E4%B9%A0.html","title":"安卓架构","lang":"zh-CN","frontmatter":{"data":"2024-06-25T00:00:00.000Z","关联":["[[知识/知识笔记/开发/安卓/安卓|安卓]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18391264","description":"安卓架构 ![[images/Pasted image 20240916164832.png]] 总的来说可以分为5层 linux内核层 Android 平台的基础是 Linux 内核。为整个系统提供了基础功能，如文件管理，进程调用等。 硬件抽象层 即将各种硬件抽象为一个个可以被程序使用的标准接口。 Native系统库与Android Runtime ...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/%E5%AE%89%E5%8D%93/%E5%AE%89%E5%8D%93%E5%AD%A6%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"安卓架构"}],["meta",{"property":"og:description","content":"安卓架构 ![[images/Pasted image 20240916164832.png]] 总的来说可以分为5层 linux内核层 Android 平台的基础是 Linux 内核。为整个系统提供了基础功能，如文件管理，进程调用等。 硬件抽象层 即将各种硬件抽象为一个个可以被程序使用的标准接口。 Native系统库与Android Runtime ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安卓架构\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"linux内核层","slug":"linux内核层","link":"#linux内核层","children":[]},{"level":2,"title":"硬件抽象层","slug":"硬件抽象层","link":"#硬件抽象层","children":[]},{"level":2,"title":"Native系统库与Android Runtime","slug":"native系统库与android-runtime","link":"#native系统库与android-runtime","children":[]},{"level":2,"title":"Java API 框架","slug":"java-api-框架","link":"#java-api-框架","children":[]},{"level":2,"title":"系统应用","slug":"系统应用","link":"#系统应用","children":[]},{"level":2,"title":"为什么使用日志","slug":"为什么使用日志","link":"#为什么使用日志","children":[]},{"level":2,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]},{"level":2,"title":"Activity使用","slug":"activity使用","link":"#activity使用","children":[{"level":3,"title":"代码示例","slug":"代码示例","link":"#代码示例","children":[]}]},{"level":2,"title":"Service使用","slug":"service使用","link":"#service使用","children":[{"level":3,"title":"代码示例","slug":"代码示例-1","link":"#代码示例-1","children":[]}]},{"level":2,"title":"Broadcast Receiver使用","slug":"broadcast-receiver使用","link":"#broadcast-receiver使用","children":[{"level":3,"title":"代码示例","slug":"代码示例-2","link":"#代码示例-2","children":[]}]},{"level":2,"title":"ContentProvider使用","slug":"contentprovider使用","link":"#contentprovider使用","children":[{"level":3,"title":"权限处理","slug":"权限处理","link":"#权限处理","children":[]},{"level":3,"title":"读取数据","slug":"读取数据","link":"#读取数据","children":[]}]},{"level":2,"title":"网页加载","slug":"网页加载","link":"#网页加载","children":[{"level":3,"title":"url加载","slug":"url加载","link":"#url加载","children":[]},{"level":3,"title":"直接加载数据","slug":"直接加载数据","link":"#直接加载数据","children":[]}]},{"level":2,"title":"网页控制","slug":"网页控制","link":"#网页控制","children":[]},{"level":2,"title":"JavaScript使用(JSBridge)","slug":"javascript使用-jsbridge","link":"#javascript使用-jsbridge","children":[{"level":3,"title":"启用 JavaScript交互权限","slug":"启用-javascript交互权限","link":"#启用-javascript交互权限","children":[]},{"level":3,"title":"安卓调用javascript","slug":"安卓调用javascript","link":"#安卓调用javascript","children":[]},{"level":3,"title":"JavaScript 调用安卓","slug":"javascript-调用安卓","link":"#javascript-调用安卓","children":[]}]},{"level":2,"title":"url scheme","slug":"url-scheme","link":"#url-scheme","children":[{"level":3,"title":"唤醒app代码","slug":"唤醒app代码","link":"#唤醒app代码","children":[]},{"level":3,"title":"被唤醒app代码","slug":"被唤醒app代码","link":"#被唤醒app代码","children":[]}]},{"level":2,"title":"intent-based URI","slug":"intent-based-uri","link":"#intent-based-uri","children":[{"level":3,"title":"唤醒app代码","slug":"唤醒app代码-1","link":"#唤醒app代码-1","children":[]}]},{"level":2,"title":"app link","slug":"app-link","link":"#app-link","children":[{"level":3,"title":"服务端配置","slug":"服务端配置","link":"#服务端配置","children":[]},{"level":3,"title":"客户端配置","slug":"客户端配置","link":"#客户端配置","children":[]}]},{"level":2,"title":"webview访问本app内其他组件","slug":"webview访问本app内其他组件","link":"#webview访问本app内其他组件","children":[{"level":3,"title":"唤醒app代码","slug":"唤醒app代码-2","link":"#唤醒app代码-2","children":[]}]}],"readingTime":{"minutes":21.21,"words":6364},"filePathRelative":"开发/安卓/安卓学习.md","autoDesc":true}');export{c as comp,v as data};
