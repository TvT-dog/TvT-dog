import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-BBhHcAey.js";const l={};function p(r,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h2><h3 id="orm-框架" tabindex="-1"><a class="header-anchor" href="#orm-框架"><span>ORM 框架</span></a></h3><ul><li>ORM 框架是一种技术,用于在面向对象的编程语言(如 Java)和关系型数据库之间建立映射关系。</li><li>ORM 框架允许开发者使用面向对象的方式操作数据库,而不需要直接编写 SQL 语句。</li></ul><h3 id="jpa" tabindex="-1"><a class="header-anchor" href="#jpa"><span>JPA</span></a></h3><ul><li>JPA 是一种 Java 持久化 API 规范,定义了一套标准的 Java 持久化 API。</li><li>JPA 规范为 ORM 框架提供了统一的接口和抽象层,使得开发者可以在不同的 ORM 框架之间轻松切换。</li></ul><p>JPA 的提出主要是为了整合市面上已有的 ORM 框架，比如说 Hibernate、EclipseLink 等。官方觉得你们搞框架可以，但不要乱搞，得按照我的标准来。</p><h2 id="常见框架" tabindex="-1"><a class="header-anchor" href="#常见框架"><span>常见框架</span></a></h2><h3 id="jdbc" tabindex="-1"><a class="header-anchor" href="#jdbc"><span>JDBC</span></a></h3><p>JDBC (Java Database Connectivity) 是 Java 编程语言中用于访问和操作数据库的标准 API。它提供了一组 Java 类和接口,使得 Java 程序可以以统一的方式连接、查询和更新各种关系型数据库。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 1. 加载驱动程序</span></span>
<span class="line"><span>Class.forName(&quot;com.mysql.cj.jdbc.Driver&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. 获取数据库连接</span></span>
<span class="line"><span>Connection conn = DriverManager.getConnection(</span></span>
<span class="line"><span>    &quot;jdbc:mysql://localhost:3306/test&quot;, &quot;username&quot;, &quot;password&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 创建 Statement 对象</span></span>
<span class="line"><span>Statement stmt = conn.createStatement();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 4. 执行 SQL 语句并获取结果集</span></span>
<span class="line"><span>ResultSet rs = stmt.executeQuery(&quot;SELECT * FROM users&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 5. 处理结果集</span></span>
<span class="line"><span>while (rs.next()) {</span></span>
<span class="line"><span>    int id = rs.getInt(&quot;id&quot;);</span></span>
<span class="line"><span>    String name = rs.getString(&quot;name&quot;);</span></span>
<span class="line"><span>    System.out.println(&quot;ID: &quot; + id + &quot;, Name: &quot; + name);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 6. 关闭资源</span></span>
<span class="line"><span>rs.close();</span></span>
<span class="line"><span>stmt.close();</span></span>
<span class="line"><span>conn.close();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis"><span>MyBatis</span></a></h3><ul><li>MyBatis 是一个持久层框架,建立在JDBC之上,用于简化数据库操作。</li><li>MyBatis 通过XML或注解的方式配置SQL语句和结果映射,大幅减少了JDBC样板代码的编写。</li><li>MyBatis 提供了灵活的SQL语句编写和结果集映射功能,适合对性能要求较高的场景。<br> 首先,我们定义 User 实体类:</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class User {</span></span>
<span class="line"><span>    private int id;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private String email;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // getters and setters</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后,我们创建一个 UserMapper 接口,定义操作数据库的方法:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface UserMapper {</span></span>
<span class="line"><span>    List&lt;User&gt; getAllUsers();</span></span>
<span class="line"><span>    User getUserById(int id);</span></span>
<span class="line"><span>    void insertUser(User user);</span></span>
<span class="line"><span>    void updateUser(User user);</span></span>
<span class="line"><span>    void deleteUser(int id);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来,我们在 <code>resources/mapper/UserMapper.xml</code> 文件中定义 SQL 语句:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE mapper</span></span>
<span class="line"><span>        PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span></span>
<span class="line"><span>        &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;mapper namespace=&quot;com.example.demo.mapper.UserMapper&quot;&gt;</span></span>
<span class="line"><span>    &lt;select id=&quot;getAllUsers&quot; resultType=&quot;com.example.demo.entity.User&quot;&gt;</span></span>
<span class="line"><span>        SELECT * FROM user</span></span>
<span class="line"><span>    &lt;/select&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;select id=&quot;getUserById&quot; parameterType=&quot;int&quot; resultType=&quot;com.example.demo.entity.User&quot;&gt;</span></span>
<span class="line"><span>        SELECT * FROM user WHERE id = #{id}</span></span>
<span class="line"><span>    &lt;/select&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;insert id=&quot;insertUser&quot; parameterType=&quot;com.example.demo.entity.User&quot;&gt;</span></span>
<span class="line"><span>        INSERT INTO user (name, email) VALUES (#{name}, #{email})</span></span>
<span class="line"><span>    &lt;/insert&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;update id=&quot;updateUser&quot; parameterType=&quot;com.example.demo.entity.User&quot;&gt;</span></span>
<span class="line"><span>        UPDATE user SET name = #{name}, email = #{email} WHERE id = #{id}</span></span>
<span class="line"><span>    &lt;/update&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;delete id=&quot;deleteUser&quot; parameterType=&quot;int&quot;&gt;</span></span>
<span class="line"><span>        DELETE FROM user WHERE id = #{id}</span></span>
<span class="line"><span>    &lt;/delete&gt;</span></span>
<span class="line"><span>&lt;/mapper&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后,我们在应用程序中使用 MyBatis 执行 CRUD 操作:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 创建 SqlSessionFactory</span></span>
<span class="line"><span>SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder()</span></span>
<span class="line"><span>        .build(Resources.getResourceAsStream(&quot;mybatis-config.xml&quot;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取 SqlSession</span></span>
<span class="line"><span>try (SqlSession session = sqlSessionFactory.openSession()) {</span></span>
<span class="line"><span>    UserMapper mapper = session.getMapper(UserMapper.class);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 查询所有用户</span></span>
<span class="line"><span>    List&lt;User&gt; users = mapper.getAllUsers();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 根据 ID 查询用户</span></span>
<span class="line"><span>    User user = mapper.getUserById(1);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 插入用户</span></span>
<span class="line"><span>    User newUser = new User(&quot;John Doe&quot;, &quot;john.doe@example.com&quot;);</span></span>
<span class="line"><span>    mapper.insertUser(newUser);</span></span>
<span class="line"><span>    session.commit();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 更新用户</span></span>
<span class="line"><span>    user.setName(&quot;Jane Doe&quot;);</span></span>
<span class="line"><span>    mapper.updateUser(user);</span></span>
<span class="line"><span>    session.commit();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 删除用户</span></span>
<span class="line"><span>    mapper.deleteUser(user.getId());</span></span>
<span class="line"><span>    session.commit();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是 MyBatis 的基本使用方式。MyBatis 提供了更多高级特性,如动态 SQL、分页、缓存等,可以根据实际需求进一步探索。</p><h3 id="spring-data-jpa" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa"><span>Spring Data JPA</span></a></h3><p>Spring Data JPA 是 Spring 提出的，它增加了一个抽象层，用来屏蔽不同 ORM 的框架差异。通常Spring Data JPA 底层的 ORM 框架是 Hibernate。<br> 我们定义 User 实体类:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Entity</span></span>
<span class="line"><span>@Table(name = &quot;users&quot;)</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span>    @Id</span></span>
<span class="line"><span>    @GeneratedValue(strategy = GenerationType.IDENTITY)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(nullable = false)</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(nullable = false, unique = true)</span></span>
<span class="line"><span>    private String email;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Getters, setters, and constructors</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Spring Data JPA中，只需要编写这样的接口就可实现数据访问。不再像我们以往编写了接口时候还需要自己编写接口实现类，直接减少了我们的文件清单。</p><p>同时Spring-data-jpa还有一大特性就是通过解析方法名创建查询。</p><p>接下来,我们创建一个 UserRepository 接口,该接口继承自 JpaRepository 接口:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {</span></span>
<span class="line"><span>    Optional&lt;User&gt; findByEmail(String email);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上例中，我们可以看到函数：</p><ul><li>findByEmail(String email);</li></ul><p>实现了按email查询User实体.现在,我们可以在应用程序中使用 UserRepository 执行 CRUD 操作:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class DemoApplication {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(DemoApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private UserRepository userRepository;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @PostConstruct</span></span>
<span class="line"><span>    public void init() {</span></span>
<span class="line"><span>        // Create a new user</span></span>
<span class="line"><span>        User user = new User(&quot;John Doe&quot;, &quot;john.doe@example.com&quot;);</span></span>
<span class="line"><span>        userRepository.save(user);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Find a user by email</span></span>
<span class="line"><span>        Optional&lt;User&gt; optionalUser = userRepository.findByEmail(&quot;john.doe@example.com&quot;);</span></span>
<span class="line"><span>        optionalUser.ifPresent(System.out::println);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Update the user</span></span>
<span class="line"><span>        user.setName(&quot;Jane Doe&quot;);</span></span>
<span class="line"><span>        userRepository.save(user);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Delete the user</span></span>
<span class="line"><span>        userRepository.delete(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><p><a href="https://javabetter.cn/springboot/jpa.html#spring-boot-%E6%95%B4%E5%90%88-spring-data-jpa" target="_blank" rel="noopener noreferrer">https://javabetter.cn/springboot/jpa.html#spring-boot-整合-spring-data-jpa</a></p>`,33)]))}const c=n(l,[["render",p]]),v=JSON.parse('{"path":"/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E6%95%B0%E6%8D%AE%E5%BA%93/JAVA%E6%95%B0%E6%8D%AE%E5%BA%93.html","title":"JAVA数据库","lang":"zh-CN","frontmatter":{"data":"2024-07-22T00:00:00.000Z","关联":["[[Java开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364683","title":"JAVA数据库","description":"基础概念 ORM 框架 ORM 框架是一种技术,用于在面向对象的编程语言(如 Java)和关系型数据库之间建立映射关系。 ORM 框架允许开发者使用面向对象的方式操作数据库,而不需要直接编写 SQL 语句。 JPA JPA 是一种 Java 持久化 API 规范,定义了一套标准的 Java 持久化 API。 JPA 规范为 ORM 框架提供了统一的接口...","head":[["meta",{"property":"og:url","content":"https://f0rward.fun/docs/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E6%95%B0%E6%8D%AE%E5%BA%93/JAVA%E6%95%B0%E6%8D%AE%E5%BA%93.html"}],["meta",{"property":"og:title","content":"JAVA数据库"}],["meta",{"property":"og:description","content":"基础概念 ORM 框架 ORM 框架是一种技术,用于在面向对象的编程语言(如 Java)和关系型数据库之间建立映射关系。 ORM 框架允许开发者使用面向对象的方式操作数据库,而不需要直接编写 SQL 语句。 JPA JPA 是一种 Java 持久化 API 规范,定义了一套标准的 Java 持久化 API。 JPA 规范为 ORM 框架提供了统一的接口..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-07T13:44:11.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-07T13:44:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JAVA数据库\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-07T13:44:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://f0rward.fun/\\"}]}"]]},"git":{"createdTime":1744033451000,"updatedTime":1744033451000,"contributors":[{"name":"H0ld_f0rward","username":"","email":"3164750438@qq.com","commits":1}]},"readingTime":{"minutes":3.67,"words":1100},"filePathRelative":"docs/开发/Java开发/Java数据库/JAVA数据库.md","localizedDate":"2025年4月7日","excerpt":"<h2>基础概念</h2>\\n<h3>ORM 框架</h3>\\n<ul>\\n<li>ORM 框架是一种技术,用于在面向对象的编程语言(如 Java)和关系型数据库之间建立映射关系。</li>\\n<li>ORM 框架允许开发者使用面向对象的方式操作数据库,而不需要直接编写 SQL 语句。</li>\\n</ul>\\n<h3>JPA</h3>\\n<ul>\\n<li>JPA 是一种 Java 持久化 API 规范,定义了一套标准的 Java 持久化 API。</li>\\n<li>JPA 规范为 ORM 框架提供了统一的接口和抽象层,使得开发者可以在不同的 ORM 框架之间轻松切换。</li>\\n</ul>\\n<p>JPA 的提出主要是为了整合市面上已有的 ORM 框架，比如说 Hibernate、EclipseLink 等。官方觉得你们搞框架可以，但不要乱搞，得按照我的标准来。</p>","autoDesc":true}');export{c as comp,v as data};
