import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app--ZYjmNcq.js";const l={};function p(d,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="nginx-的作用" tabindex="-1"><a class="header-anchor" href="#nginx-的作用"><span>Nginx 的作用</span></a></h1><h3 id="代理" tabindex="-1"><a class="header-anchor" href="#代理"><span>代理</span></a></h3><p>正向代理是代理客户端的，让你能正常访问目的服务器。与之相反，反向代理是代理服务器的，让大量的请求均衡地访问到某一台服务器上。</p><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离"><span>动静分离</span></a></h3><p>在我们的软件开发中，有些请求是需要后台处理的；有些请求是不需要后台处理的，比如说 css、js 这些文件请求，这些不需要经过后台处理的文件就叫静态文件。</p><h2 id="基础命令" tabindex="-1"><a class="header-anchor" href="#基础命令"><span>基础命令</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>nginx  启动</span></span>
<span class="line"><span>nginx -s stop  停止</span></span>
<span class="line"><span>nginx -s quit  安全退出</span></span>
<span class="line"><span>nginx -s reload  重新加载配置文件</span></span>
<span class="line"><span>nginx -t  检查配置文件是否正确</span></span>
<span class="line"><span>ps aux|grep nginx  查看nginx进程</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-的配置" tabindex="-1"><a class="header-anchor" href="#nginx-的配置"><span>Nginx 的配置</span></a></h2><h3 id="基础结构图" tabindex="-1"><a class="header-anchor" href="#基础结构图"><span>基础结构图</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>main        # 全局配置</span></span>
<span class="line"><span>├── events  # 配置网络连接</span></span>
<span class="line"><span>├── http    # 配置代理、缓存、日志等</span></span>
<span class="line"><span>│   ├── upstream # 配置负载均衡</span></span>
<span class="line"><span>│   ├── server   # 配置虚拟主机，可以有多个 server</span></span>
<span class="line"><span>│   ├── server</span></span>
<span class="line"><span>│   │   ├── location  # 用于匹配 URI（URL 是 URI 的一种），可以有多个 location</span></span>
<span class="line"><span>│   │   ├── location</span></span>
<span class="line"><span>│   │   └── ...</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="默认配置" tabindex="-1"><a class="header-anchor" href="#默认配置"><span>默认配置</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>worker_processes  1; # Nginx 进程数，一般设置为和 CPU 核数一样</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024; # 每个进程允许最大并发数</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types; # 文件扩展名与类型映射表</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on; # 开启高效传输模式</span></span>
<span class="line"><span>    keepalive_timeout  65; # 保持连接的时间，也叫超时时间，单位秒</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen       8080; # 配置监听的端口</span></span>
<span class="line"><span>        server_name  localhost; # 配置的域名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html; # 网站根目录</span></span>
<span class="line"><span>            index  index.html index.htm; # 默认首页文件</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html; # 默认50x对应的访问页面</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    include servers/*; # 加载子配置项</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><p>https://javabetter.cn/nginx/nginx.html</p>`,14)]))}const c=s(l,[["render",p],["__file","Nginx.html.vue"]]),v=JSON.parse('{"path":"/%E5%BC%80%E5%8F%91/Nginx.html","title":"Nginx 的作用","lang":"zh-CN","frontmatter":{"data":"2024-07-22T00:00:00.000Z","关联":["[[开发]]"],"博客链接":"https:/www.cnblogs.com/Ho1dF0rward/p/18364759","description":"Nginx 的作用 代理 正向代理是代理客户端的，让你能正常访问目的服务器。与之相反，反向代理是代理服务器的，让大量的请求均衡地访问到某一台服务器上。 动静分离 在我们的软件开发中，有些请求是需要后台处理的；有些请求是不需要后台处理的，比如说 css、js 这些文件请求，这些不需要经过后台处理的文件就叫静态文件。 基础命令 Nginx 的配置 基础结构...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://tvt-dog.github.io/TvT-dog/%E5%BC%80%E5%8F%91/Nginx.html"}],["meta",{"property":"og:site_name","content":"Ho1d_F0rward的知识库"}],["meta",{"property":"og:title","content":"Nginx 的作用"}],["meta",{"property":"og:description","content":"Nginx 的作用 代理 正向代理是代理客户端的，让你能正常访问目的服务器。与之相反，反向代理是代理服务器的，让大量的请求均衡地访问到某一台服务器上。 动静分离 在我们的软件开发中，有些请求是需要后台处理的；有些请求是不需要后台处理的，比如说 css、js 这些文件请求，这些不需要经过后台处理的文件就叫静态文件。 基础命令 Nginx 的配置 基础结构..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nginx 的作用\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho1d_F0rward\\",\\"url\\":\\"https://tvt-dog.github.io/TvT-dog/\\",\\"email\\":\\"outlook_39ae1e67a9a1791b@outlook.com\\"}]}"]]},"headers":[{"level":3,"title":"代理","slug":"代理","link":"#代理","children":[]},{"level":3,"title":"动静分离","slug":"动静分离","link":"#动静分离","children":[]},{"level":2,"title":"基础命令","slug":"基础命令","link":"#基础命令","children":[]},{"level":2,"title":"Nginx 的配置","slug":"nginx-的配置","link":"#nginx-的配置","children":[{"level":3,"title":"基础结构图","slug":"基础结构图","link":"#基础结构图","children":[]},{"level":3,"title":"默认配置","slug":"默认配置","link":"#默认配置","children":[]}]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"开发/Nginx.md","autoDesc":true}');export{c as comp,v as data};
