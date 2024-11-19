---
data: 2024-07-24
关联:
  - "[[book/知识笔记/开发/Java开发/Java开发]]"
  - "[[book/知识笔记/渗透/外网打点/外网打点]]"
---
## 示例代码
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西
import org.dom4j.io.SAXReader;

@RequestMapping(value = "/receive/message")
public void updateFollowStatus(HttpServletRequest request, HttpServletResponse response) {
		SAXReader sax = new SAXReader();
		Document doc = sax.read(request.getInputStream());
}
```

注意request参数数据流的使用情况