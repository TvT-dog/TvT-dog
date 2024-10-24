import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-C9BbSHvW.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍"><span>基本介绍</span></a></h2><p>ORM 框架的本质是简化操作数据库的编码工作，常用的框架有两个，一个是可以灵活执行动态 SQL 的 MyBatis；一个是崇尚不用写 SQL 的 Hibernate。前者互联网行业用的多，后者传统行业用的多。</p><p>Hibernate 的特点是所有的 SQL 通过 Java 代码生成，发展到最顶端的就是 Spring Data JPA，基本上根据方法名就可以生成对应的 SQL 了。</p><p>MyBatis 早些时候用起来比较繁琐，需要各种配置文件，需要实体类和 DAO 的映射关联，经过不断地演化和改进，可以通过 <a href="https://javabetter.cn/kaiyuan/auto-generator.html" target="_blank" rel="noopener noreferrer">generator</a> 自动生成实体类、配置文件和 DAO 层代码，简化了不少开发工作。</p><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h2><p>准备一个实体类用来映射数据库中的表</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class Employee {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer empId;</span></span>
<span class="line"><span>    private String empName;</span></span>
<span class="line"><span>    private Double empSalary;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getEmpId() {</span></span>
<span class="line"><span>        return empId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getEmpName() {</span></span>
<span class="line"><span>        return empName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Double getEmpSalary() {</span></span>
<span class="line"><span>        return empSalary;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setEmpId(Integer empId) {</span></span>
<span class="line"><span>        this.empId = empId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setEmpName(String empName) {</span></span>
<span class="line"><span>        this.empName = empName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setEmpSalary(Double empSalary) {</span></span>
<span class="line"><span>        this.empSalary = empSalary;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>准备 Mapper 接口和 MapperXML 文件.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface EmployeeMapper {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据 ID 查询员工信息</span></span>
<span class="line"><span>    Employee queryById(Integer id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int deleteById(Integer id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的一个xml语句\`\`\`</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span></span>
<span class="line"><span>&quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot; &gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- namespace 填写对应接口的全限定符 --&gt;</span></span>
<span class="line"><span>&lt;mapper namespace=&quot;org.alen.mapper.EmployeeMapper&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 声明式标签写 SQL， 每个标签代表方法的一个实现 mapper 接口不能重载--&gt;</span></span>
<span class="line"><span>    &lt;select id=&quot;queryById&quot; resultType=&quot;org.alen.pojo.Employee&quot;&gt;</span></span>
<span class="line"><span>        select emp_id empId , emp_name empName, emp_salary empSalary from emp where emp_id = #{id}</span></span>
<span class="line"><span>    &lt;/select&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;delete id=&quot;deleteById&quot;&gt;</span></span>
<span class="line"><span>        delete from emp where emp_id = #{id}</span></span>
<span class="line"><span>    &lt;/delete&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/mapper&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置数据库连接信息</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE configuration</span></span>
<span class="line"><span>        PUBLIC &quot;-//mybatis.org//DTD Config 3.0//EN&quot;</span></span>
<span class="line"><span>        &quot;http://mybatis.org/dtd/mybatis-3-config.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;configuration&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;environments default=&quot;development&quot;&gt;</span></span>
<span class="line"><span>        &lt;environment id=&quot;development&quot;&gt;</span></span>
<span class="line"><span>            &lt;transactionManager type=&quot;JDBC&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &lt;dataSource type=&quot;POOLED&quot;&gt;</span></span>
<span class="line"><span>                &lt;property name=&quot;driver&quot; value=&quot;com.mysql.cj.jdbc.Driver&quot;/&gt;</span></span>
<span class="line"><span>                &lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/ssm&quot;/&gt;</span></span>
<span class="line"><span>                &lt;property name=&quot;username&quot; value=&quot;root&quot;/&gt;</span></span>
<span class="line"><span>                &lt;property name=&quot;password&quot; value=&quot;123456&quot;/&gt;</span></span>
<span class="line"><span>            &lt;/dataSource&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/environment&gt;</span></span>
<span class="line"><span>    &lt;/environments&gt;</span></span>
<span class="line"><span>    &lt;mappers&gt;</span></span>
<span class="line"><span>        &lt;mapper resource=&quot;mappers/mybatis-config.xml&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/mappers&gt;</span></span>
<span class="line"><span>&lt;/configuration&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务调用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class MybatisTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 通过 mybatis 的 api 进行调用</span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void test_01() throws IOException {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 1. 读取外部配置文件</span></span>
<span class="line"><span>        InputStream ips = Resources.getResourceAsStream(&quot;mybatis-config.xml&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 创建 sqlSessionFactory</span></span>
<span class="line"><span>        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(ips);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 3. 根据 sqlSessionFactory 创建 sqlSession 用完就释放</span></span>
<span class="line"><span>        SqlSession sqlSession = sqlSessionFactory.openSession();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 4. 获取接口的代理对象</span></span>
<span class="line"><span>        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);</span></span>
<span class="line"><span>        Employee employee = mapper.queryById(1);</span></span>
<span class="line"><span>        System.out.println(&quot;employee = &quot; + employee);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 5. 提交事务 释放资源</span></span>
<span class="line"><span>        sqlSession.commit();</span></span>
<span class="line"><span>        sqlSession.close();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="预编译使用" tabindex="-1"><a class="header-anchor" href="#预编译使用"><span>预编译使用</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> &lt;!--</span></span>
<span class="line"><span>        #{key} 占位符 + 赋值，相当于 emp_id = ? ? = 赋值</span></span>
<span class="line"><span>        \${key} 字符串拼接 ， 相当于 &quot;emp_id = &quot; + id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        推荐使用#{key}的方式，因为可以防止注入攻击的问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        但是如果面对列名也是动态的情况，则只能使用 $ 符号，例如 \${columnName} = \${columnValue}</span></span>
<span class="line"><span>    --&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h2><p>https://javabetter.cn/springboot/mybatis.html#%E6%9E%81%E7%AE%80-xml-%E7%89%88%E6%9C%AC https://www.wylunpro.top/index.php/archives/115/</p>`,19)]))}const c=n(l,[["render",p],["__file","Mybatis学习.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Mybatis%E5%AD%A6%E4%B9%A0.html","title":"Mybatis学习","lang":"zh-CN","frontmatter":{"data":"2024-07-29T00:00:00.000Z","关联":["[[Java开发]]","[[Java-SQL注入风险]]"],"title":"Mybatis学习","description":"基本介绍 ORM 框架的本质是简化操作数据库的编码工作，常用的框架有两个，一个是可以灵活执行动态 SQL 的 MyBatis；一个是崇尚不用写 SQL 的 Hibernate。前者互联网行业用的多，后者传统行业用的多。 Hibernate 的特点是所有的 SQL 通过 Java 代码生成，发展到最顶端的就是 Spring Data JPA，基本上根据方...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Mybatis%E5%AD%A6%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"Mybatis学习"}],["meta",{"property":"og:description","content":"基本介绍 ORM 框架的本质是简化操作数据库的编码工作，常用的框架有两个，一个是可以灵活执行动态 SQL 的 MyBatis；一个是崇尚不用写 SQL 的 Hibernate。前者互联网行业用的多，后者传统行业用的多。 Hibernate 的特点是所有的 SQL 通过 Java 代码生成，发展到最顶端的就是 Spring Data JPA，基本上根据方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mybatis学习\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]},{"level":2,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]},{"level":2,"title":"预编译使用","slug":"预编译使用","link":"#预编译使用","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"readingTime":{"minutes":2.27,"words":682},"filePathRelative":"开发/Java开发/Mybatis学习.md","autoDesc":true}');export{c as comp,v as data};
