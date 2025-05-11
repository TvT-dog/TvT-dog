---
title: gin框架路由学习
---
## Gin 是什么
- Gin是一个golang的微框架，封装比较优雅，API友好，源码注释比较明确，具有快速灵活，容错方便等特点
- 对于golang而言，web框架的依赖要远比Python，Java之类的要小。自身的`net/http`足够简单，性能也非常不错
- 借助框架开发，不仅可以省去很多常用的封装带来的时间，也有助于团队的编码风格和形成规范
 简单示例
```go
 package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    // 1.创建路由
   r := gin.Default()
   // 2.绑定路由规则，执行的函数
   // gin.Context，封装了request和response
   r.GET("/", func(c *gin.Context) {
      c.String(http.StatusOK, "hello World!")
   })
   // 3.监听端口，默认在8080
   // Run("里面不指定端口号默认为8080") 
   r.Run(":8000")
}
```
## GET方法
### API参数获取

```go
package main

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/user/:name/*action", func(c *gin.Context) {
        name := c.Param("name")
        action := c.Param("action")
        //截取/
        action = strings.Trim(action, "/")
        c.String(http.StatusOK, name+" is "+action)
    })
    //默认为监听8080端口
    r.Run(":8000")
}
```
从这里我们可以看到，有两种方法来获取API参数。
`:`  `:name`表示一个命名参数
`*` `/*action`表示一个可包含路径分隔符的参数
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/n1iiyS.png)
`c.Param` 方法的签名如下：
```go
func (c *Context) Param(key string) string
```

- `key`：这是你要从 URL 路径中获取的参数名称。
- 返回值：返回与指定 `key` 对应的参数值，如果该参数不存在，就会返回空字符串。
### URL参数
```go
package main

import (
    "fmt"
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/user", func(c *gin.Context) {
        //指定默认值
        //http://localhost:8080/user 才会打印出来默认的值
        name := c.DefaultQuery("name", "枯藤")
        c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
    })
    r.Run()
}
```
这里就很简单了直接使用`?`传递参数即可。
`DefaultQuery` 方法的签名如下：
```go
func (c *Context) DefaultQuery(key, defaultValue string) string
```

- `key`：需要获取的查询参数的名称。
- `defaultValue`：当指定的参数不存在时要返回的默认值。
- 返回值：返回查询参数的值，如果参数不存在则返回默认值。
## POST方法
我们常见的post传输格式
### 参数传递
#### BindJSON方法
-  application/json
```http
POST /json HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 23

{
    "name": "John",
    "age": 30
}
```
这里使用BindJSON方法

```go
func (c *Context) BindJSON(obj interface{}) error
```

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    r := gin.Default()

    r.POST("/json", func(c *gin.Context) {
        var user User
        if err := c.BindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "name": user.Name,
            "age":  user.Age,
        })
    })

    r.Run(":8080")
}
```
#### PostForm方法
-  application/x-www-form-urlencoded
```http
POST /form HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

name=John&age=30
```

- multipart/form-data
```http
POST /form HTTP/1.1
Host: localhost:8080
Content-Type: multipart/form-data; boundary=---------------------------332943733314773
Content-Length: 161

-----------------------------332943733314773
Content-Disposition: form-data; name="name"

John
-----------------------------332943733314773
Content-Disposition: form-data; name="age"

30
-----------------------------332943733314773--
```
这里我们使用PostForm方法
```go
func (c *Context) PostForm(key string) string
```

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    r.POST("/form", func(c *gin.Context) {
        name := c.PostForm("name")
        age := c.PostForm("age")

        c.JSON(http.StatusOK, gin.H{
            "name": name,
            "age":  age,
        })
    })

    r.Run(":8080")
}
```
#### BindXML方法
- application/xml
```http
POST /xml HTTP/1.1
Host: localhost:8080
Content-Type: application/xml
Content-Length: 103

<Book>
    <title>Go Programming</title>
    <author>John Doe</author>
    <year>2024</year>
</Book>
```
我们使用 `BindXML`方法
```go
func (c *Context) BindXML(obj interface{}) error
```

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

// Book 定义一个结构体来映射XML数据
type Book struct {
    Title  string `xml:"title"`
    Author string `xml:"author"`
    Year   int    `xml:"year"`
}

func main() {
    r := gin.Default()

    // 处理POST请求
    r.POST("/xml", func(c *gin.Context) {
        var book Book
        // 绑定XML数据到结构体
        if err := c.BindXML(&book); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // 返回解析结果
        c.JSON(http.StatusOK, gin.H{
            "title":  book.Title,
            "author": book.Author,
            "year":   book.Year,
        })
    })

    // 启动服务器
    r.Run(":8080")
}
```
### 文件传输
我们使用FormFile函数
```go
func (c *Context) FormFile(name string) (*multipart.FileHeader, error)
```


```go
package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.POST("/upload", func(c *gin.Context) {
        _, headers, err := c.Request.FormFile("file")
        if err != nil {
            log.Printf("Error when try to get file: %v", err)
        }
        //headers.Size 获取文件大小
        if headers.Size > 1024*1024*2 {
            fmt.Println("文件太大了")
            return
        }
        //headers.Header.Get("Content-Type")获取上传文件的类型
        if headers.Header.Get("Content-Type") != "image/png" {
            fmt.Println("只允许上传png图片")
            return
        }
        c.SaveUploadedFile(headers, "./video/"+headers.Filename)
        c.String(http.StatusOK, headers.Filename)
    })
    r.Run()
}
```


```http
POST /upload HTTP/1.1
Host: localhost:8080
Content-Type: multipart/form-data; boundary=---------------------------1234567890

-----------------------------1234567890
Content-Disposition: form-data; name="file"; filename="example.png"
Content-Type: image/png

这里是文件example.png的二进制内容
-----------------------------1234567890--
```
## 参考文档
https://www.topgoer.com/gin%E6%A1%86%E6%9E%B6/%E7%AE%80%E4%BB%8B.html