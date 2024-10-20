import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app--ZYjmNcq.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h2><p>DBC API是一个Java API，可以访问任何类型表列数据，特别是存储在关系数据库中的数据。JDBC代表Java数据库连接。</p><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import java.sql.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class JDBCExample {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 1. 加载驱动程序</span></span>
<span class="line"><span>            Class.forName(&quot;com.mysql.cj.jdbc.Driver&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 2. 建立数据库连接</span></span>
<span class="line"><span>            String url = &quot;jdbc:mysql://localhost:3306/test_db&quot;;</span></span>
<span class="line"><span>            String username = &quot;root&quot;;</span></span>
<span class="line"><span>            String password = &quot;password&quot;;</span></span>
<span class="line"><span>            Connection conn = DriverManager.getConnection(url, username, password);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 3. 执行 SQL 语句</span></span>
<span class="line"><span>            String sql = &quot;SELECT * FROM users&quot;;</span></span>
<span class="line"><span>            Statement stmt = conn.createStatement();</span></span>
<span class="line"><span>            ResultSet rs = stmt.executeQuery(sql);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 4. 处理结果集</span></span>
<span class="line"><span>            while (rs.next()) {</span></span>
<span class="line"><span>                int id = rs.getInt(&quot;id&quot;);</span></span>
<span class="line"><span>                String name = rs.getString(&quot;name&quot;);</span></span>
<span class="line"><span>                System.out.println(&quot;ID: &quot; + id + &quot;, Name: &quot; + name);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 5. 关闭资源</span></span>
<span class="line"><span>            rs.close();</span></span>
<span class="line"><span>            stmt.close();</span></span>
<span class="line"><span>            conn.close();</span></span>
<span class="line"><span>        } catch (ClassNotFoundException | SQLException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="预编译的原理" tabindex="-1"><a class="header-anchor" href="#预编译的原理"><span>预编译的原理</span></a></h2><p>在java中JDBC中，我们写 SQL 语句的时候，有个预处理功能，这个功能一大优势就是能提高执行速度，尤其是多次操作数据库的情况，再一个优势就是预防SQL注入，严格的说，应该是预防绝大多数的SQL注入。</p><h4 id="简单使用-1" tabindex="-1"><a class="header-anchor" href="#简单使用-1"><span>简单使用</span></a></h4><p>如下面的代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import java.sql.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class PreparedStatementExample {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 1. 加载驱动程序</span></span>
<span class="line"><span>            Class.forName(&quot;com.mysql.cj.jdbc.Driver&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 2. 建立数据库连接</span></span>
<span class="line"><span>            String url = &quot;jdbc:mysql://localhost:3306/test_db&quot;;</span></span>
<span class="line"><span>            String username = &quot;root&quot;;</span></span>
<span class="line"><span>            String password = &quot;password&quot;;</span></span>
<span class="line"><span>            Connection conn = DriverManager.getConnection(url, username, password);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 3. 创建预编译语句</span></span>
<span class="line"><span>            String sql = &quot;SELECT * FROM users WHERE name = ?&quot;;</span></span>
<span class="line"><span>            PreparedStatement pstmt = conn.prepareStatement(sql);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 4. 设置参数</span></span>
<span class="line"><span>            pstmt.setString(1, &quot;John Doe&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 5. 执行查询</span></span>
<span class="line"><span>            ResultSet rs = pstmt.executeQuery();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 6. 处理结果集</span></span>
<span class="line"><span>            while (rs.next()) {</span></span>
<span class="line"><span>                int id = rs.getInt(&quot;id&quot;);</span></span>
<span class="line"><span>                String name = rs.getString(&quot;name&quot;);</span></span>
<span class="line"><span>                System.out.println(&quot;ID: &quot; + id + &quot;, Name: &quot; + name);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 7. 关闭资源</span></span>
<span class="line"><span>            rs.close();</span></span>
<span class="line"><span>            pstmt.close();</span></span>
<span class="line"><span>            conn.close();</span></span>
<span class="line"><span>        } catch (ClassNotFoundException | SQLException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="底层原理" tabindex="-1"><a class="header-anchor" href="#底层原理"><span>底层原理</span></a></h4><p>当运行时，JDBC动态地把参数传给PreparedStatement时，即使参数里有敏感字符，如： &#39; or &#39; 1&#39; = &#39;1 、updatexml(2,concat(0x7e,(version())),0)等，preparedStatement 会对入参中的关键字进行转义，比如单引号转义成&#39;，其流程大致如下：</p><figure><img src="https://cdn.nlark.com/yuque/0/2024/png/27874700/1722255052379-72cc21d8-b1dc-4d7a-87a0-a10870b7158b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12)]))}const r=s(l,[["render",p],["__file","JDBC学习.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E6%95%B0%E6%8D%AE%E5%BA%93/JDBC%E5%AD%A6%E4%B9%A0.html","title":"JDBC学习","lang":"zh-CN","frontmatter":{"data":"2024-07-29T00:00:00.000Z","关联":["[[Java-SQL注入风险]]","[[JAVA数据库]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364684","title":"JDBC学习","description":"基础概念 DBC API是一个Java API，可以访问任何类型表列数据，特别是存储在关系数据库中的数据。JDBC代表Java数据库连接。 简单使用 预编译的原理 在java中JDBC中，我们写 SQL 语句的时候，有个预处理功能，这个功能一大优势就是能提高执行速度，尤其是多次操作数据库的情况，再一个优势就是预防SQL注入，严格的说，应该是预防绝大多数...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Java%E5%BC%80%E5%8F%91/Java%E6%95%B0%E6%8D%AE%E5%BA%93/JDBC%E5%AD%A6%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"JDBC学习"}],["meta",{"property":"og:description","content":"基础概念 DBC API是一个Java API，可以访问任何类型表列数据，特别是存储在关系数据库中的数据。JDBC代表Java数据库连接。 简单使用 预编译的原理 在java中JDBC中，我们写 SQL 语句的时候，有个预处理功能，这个功能一大优势就是能提高执行速度，尤其是多次操作数据库的情况，再一个优势就是预防SQL注入，严格的说，应该是预防绝大多数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.nlark.com/yuque/0/2024/png/27874700/1722255052379-72cc21d8-b1dc-4d7a-87a0-a10870b7158b.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JDBC学习\\",\\"image\\":[\\"https://cdn.nlark.com/yuque/0/2024/png/27874700/1722255052379-72cc21d8-b1dc-4d7a-87a0-a10870b7158b.png\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[]},{"level":2,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]},{"level":2,"title":"预编译的原理","slug":"预编译的原理","link":"#预编译的原理","children":[]}],"readingTime":{"minutes":1.59,"words":477},"filePathRelative":"开发/Java开发/Java数据库/JDBC学习.md","autoDesc":true}');export{r as comp,v as data};
