---
title: GORM框架学习
---
## 什么是GORM
GORM 是一个强大的 Go 语言 ORM（对象关系映射）库，它简化了与数据库的交互。
## 连接数据库
连接数据库我们主要会使用两个方法`gorm.Open`和`mysql.Open` 
### 常用方法
#### `gorm.Open` 
用于创建一个新的 `*gorm.DB` 实例，其签名如下：
```go
func Open(dialector Dialector, config *Config) (*DB, error)
```
- **参数说明**：
    - `dialector`：数据库驱动，它是 `gorm.Dialector` 接口类型，不同的数据库需要使用不同的实现该接口的驱动。例如，对于 MySQL 数据库，使用 `mysql.Open` 返回的实例。
    - `config`：`*gorm.Config` 类型，用于配置 GORM 的行为，如日志级别、命名策略等。如果不需要特殊配置，可以传入 `&gorm.Config{}`。
- **返回值**：
    - `*gorm.DB`：返回一个 GORM 数据库连接实例，后续可以使用该实例进行数据库操作。
    - `error`：如果连接数据库时出现错误，会返回相应的错误信息。

#### `mysql.Open` 
用于创建一个 MySQL 数据库驱动实例，其签名如下
```go
func Open(dsn string) Dialector
```
- **参数说明**：
    - `dsn`：数据库连接字符串，包含数据库的连接信息，如用户名、密码、主机地址、端口号、数据库名等。对于 MySQL 数据库，常见的 DSN 格式为 `user:password@tcp(host:port)/dbname?charset=utf8mb4&parseTime=True&loc=Local`。
- **返回值**：
    - `gorm.Dialector`：返回一个实现了 `gorm.Dialector` 接口的 MySQL 数据库驱动实例，可用于 `gorm.Open` 方法。
### 示例代码
```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func main() {
    // 数据库连接信息
    dsn := "root:123456@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True&loc=Local"
    // 创建 MySQL 驱动实例
    mysqlDialector := mysql.Open(dsn)
    // 创建 GORM 数据库实例
    db, err := gorm.Open(mysqlDialector, &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }
    // 使用 db 进行后续操作
    _ = db
}
```

## 增加数据/表

### 常用方法
#### `db.AutoMigrate`
用于自动迁移你的数据库表结构。它会根据你传入的结构体定义，在数据库中创建对应的表，如果表已经存在，它会尝试更新表结构以匹配结构体的定义。需要注意的是，它只会创建新的表、字段和索引，不会删除已有的字段或表。
```go
func (db *DB) AutoMigrate(dst ...interface{}) *DB
```
- `dst ...interface{}`：这是一个可变参数，意味着你可以传入多个参数。每个参数通常是一个结构体类型的指针，代表你要迁移的模型。GORM 会根据这些结构体的定义来创建或更新对应的数据库表结构。
#### `db.Create`
用于向数据库中插入一条新记录。它会根据传入的结构体类型，找到对应的数据库表，并将结构体的字段值插入到表的相应列中。插入成功后，结构体的主键字段（如果有的话）会被更新为数据库中自动生成的主键值。

```go
func (db *DB) Create(value interface{}) *DB
```
- `value interface{}`：这个参数是一个接口类型，通常传入一个结构体的指针。GORM 会根据这个结构体的字段值，将数据插入到对应的数据库表中。

### 示例代码
```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string
    Email string
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // 自动迁移模式
    db.AutoMigrate(&User{})

    // 创建一个新用户
    user := User{Name: "John Doe", Email: "johndoe@example.com"}
    result := db.Create(&user)

    if result.Error != nil {
        panic(result.Error)
    }

    // 输出新创建用户的ID
    println("New user ID:", user.ID)
}
```
## 删除数据/表
### 删除表
#### 常用方法
##### `DropTable`
`DropTable` 是 `Migrator` 接口中的一个方法，用于删除数据库中的表。
```go
// 传入模型指针，删除与该模型对应的表
func (m Migrator) DropTable(values ...interface{}) error

// 传入表名，删除指定名称的表
func (m Migrator) DropTable(tables ...string) error
```
- `values ...interface{}`：可以传入一个或多个模型指针，GORM 会根据模型的定义找到对应的表名并删除这些表。例如，如果你有一个 `User` 模型，你可以传入 `&User{}` 来删除 `User` 表。
- `tables ...string`：可以传入一个或多个表名，直接指定要删除的表。
#### 示例代码
```go
package main

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

// User 定义一个示例模型
type User struct {
    ID   uint
    Name string
}

func main() {
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // 通过模型指针删除表
    db.Migrator().DropTable(&User{})

    // 通过表名删除表
    db.Migrator().DropTable("products")
}
```
### 删除数据
#### 常用方法
##### `Delete` 
`Delete` 方法用于删除数据库中的记录
```go
// 传入模型指针，根据主键删除单条记录
func (db *DB) Delete(value interface{}, conds ...interface{}) (tx *DB)
```
 参数解释
- `value interface{}`：传入要删除的模型实例指针，GORM 会根据该实例的主键来定位要删除的记录；也可以传入模型类型，结合 `Where` 方法使用以根据条件删除多条记录。
- `conds ...interface{}`：可选参数，用于指定额外的删除条件。
 返回值
- `tx *DB`：返回一个新的 `DB` 实例，可用于链式调用其他方法，同时可通过该实例的 `Error` 字段检查操作是否出错，`RowsAffected` 字段获取受影响的记录数。
##### `Where` 
`Where` 方法通常与 `Delete` 方法配合使用，用于指定删除的条件
```go
func (db *DB) Where(query interface{}, args ...interface{}) (tx *DB)
```
 参数解释
- `query interface{}`：可以是一个 SQL 表达式字符串、一个结构体或一个 map，用于指定查询条件。
- `args ...interface{}`：如果 `query` 是 SQL 表达式字符串，`args` 用于填充 SQL 中的占位符。
 返回值
- `tx *DB`：返回一个新的 `DB` 实例，可继续链式调用其他方法，如 `Delete`。
#### 软硬删除
GORM 支持软删除，即不会真正从数据库中删除记录，而是在记录中添加一个 `DeletedAt` 字段，将该字段设置为当前时间表示记录已被删除。要使用软删除，需要在模型中添加 `gorm.DeletedAt` 字段。
##### 常用方法
###### `Unscoped`
用于绕过软删除约束，进行物理删除操作，假如我们不想软删除就可以使用这个函数。
```go
func (db *DB) Unscoped() (tx *DB)
```
##### 示例代码
```go
package main

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "gorm.io/gorm/clause"
)

// User 定义一个支持软删除的示例模型
type User struct {
    ID        uint
    Name      string
    gorm.DeletedAt
}

func main() {
    // 连接数据库
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // 软删除记录
    userToDelete := User{ID: 1}
    result := db.Delete(&userToDelete)
    if result.Error != nil {
        panic(result.Error)
    }
    println("软删除的记录数:", result.RowsAffected)

    // 强制物理删除
    result = db.Clauses(clause.Returning{}).Unscoped().Delete(&userToDelete)
    if result.Error != nil {
        panic(result.Error)
    }
    println("物理删除的记录数:", result.RowsAffected)
}
```
## 更新数据
### 常用方法
##### `Update` 
`Update` 方法用于更新单条记录的单个字段。
```go
func (db *DB) Update(column string, value interface{}) *DB
```
- **参数**：
    - `column`：需要更新的字段名。
    - `value`：要设置的新值。
##### `Updates`
`Updates` 方法用于更新单条记录的多个字段。它有两种使用方式，分别是使用结构体和使用 `map`。
```go
func (db *DB) Updates(values interface{}) *DB
```
- **参数**：
    - `values`：包含要更新字段的结构体。
##### `Save` 
`Save` 方法用于保存整个记录，如果记录不存在则创建，如果存在则更新。
```go
func (db *DB) Save(value interface{}) *DB
```
- **参数**：
    - `value`：要保存的结构体实例。
##### `UpdateColumn`
`UpdateColumn` 方法用于更新单个字段，且不会触发钩子函数。
```go
func (db *DB) UpdateColumn(column string, value interface{}) *DB
```
- **参数**：
    - `column`：需要更新的字段名。
    - `value`：要设置的新值。
##### `UpdateColumns` 
`UpdateColumns` 方法用于更新多个字段，且不会触发钩子函数。
```go
func (db *DB) UpdateColumns(values interface{}) *DB
```
- **参数**：
    - `values`：包含要更新字段的结构体或 `map`。
### 示例代码
```go
package main

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "log"
)

// User 定义用户结构体
type User struct {
    ID   int
    Name string
    Age  int
}

func main() {
    // 连接数据库
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("failed to connect database")
    }

    // 自动迁移模式
    db.AutoMigrate(&User{})

    // 创建一个新用户
    user := User{Name: "Alice", Age: 20}
    db.Create(&user)

    // 1. 使用 Update 方法更新单个字段
    db.Model(&User{}).Where("id = ?", user.ID).Update("Name", "Bob")

    // 2. 使用 Updates 方法更新多个字段（使用结构体）
    newUser := User{Name: "Charlie", Age: 25}
    db.Model(&User{}).Where("id = ?", user.ID).Updates(newUser)

    // 3. 使用 Updates 方法更新多个字段（使用 map）
    db.Model(&User{}).Where("id = ?", user.ID).Updates(map[string]interface{}{"Name": "David", "Age": 30})

    // 4. 使用 Save 方法保存整个记录
    updatedUser := User{ID: user.ID, Name: "Eve", Age: 35}
    db.Save(&updatedUser)

    // 5. 使用 UpdateColumn 方法更新单个字段，不触发钩子函数
    db.Model(&User{}).Where("id = ?", user.ID).UpdateColumn("Age", 40)

    // 6. 使用 UpdateColumns 方法更新多个字段，不触发钩子函数
    db.Model(&User{}).Where("id = ?", user.ID).UpdateColumns(map[string]interface{}{"Name": "Frank", "Age": 45})

    // 查询更新后的用户信息
    var finalUser User
    db.First(&finalUser, user.ID)
    log.Printf("Final user: ID=%d, Name=%s, Age=%d", finalUser.ID, finalUser.Name, finalUser.Age)
}    
```
## 查询数据
