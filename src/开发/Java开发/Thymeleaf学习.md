---
data: 2024-07-23
关联:
  - "[[Java开发]]"
title: Thymeleaf学习
---
## 基础概念
Thymeleaf 是一个优秀的、面向 Java 的 HTML 页面模板，具有丰富的标签语言和函数。在 JSP 被淘汰之后，Thymeleaf 取而代之成为了 Spring Boot 推荐的模板引擎。
## Thymeleaf使用
### 代码
```
spring:
  thymeleaf:
    cache: false # 开发时关闭缓存，不然看不到实时页面

```


```
@Controller  
@RequestMapping("/user")  
public class UserController {  
  
  
    @RequestMapping("/all")  
    public String all(Model model) {  
        model.addAttribute("user", "Hello, Thymeleaf!");  
        return "all";  
    }  
}
```

```
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
  
</head>  
<body>  
<td th:text="${user}"></td>  
</body>  
</html>
```
### 目录结构
```
.
├── java
│   └── org
│       └── example
│           └── learnspringboot
│               ├── Controller
│               │   └── UserController.java
│               └── LearnSpringBootApplication.java
└── resources
    ├── application.properties
    ├── static
    └── templates
        └── all.html
```