---
data: 2024-08-21
关联:
  - "[[Go开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18374787
---
# 基础使用
```
// hello.go
// package declaration
package main

// import package
import "fmt"

// function
func add(a, b int) int {
  return a+b
}
// global variable
var g int = 100

func main() {
  a, b := 1, 2
  res := add(a, b)
  fmt.Println("a=", a, "b=", b, "a+b=", res)
  fmt.Println("g=", g)
  fmt.Println("hello world!")
}
```

**注意点**
- func main()是程序开始执行的函数(但是如果有func init()函数，则会先执行init函数，再执行main函数)。
- 源程序文件所在的目录名称与包名称没有直接关系，不需要一致。不过通常保持一致，这符合Go的编码规范。
- 源程序文件名与包名没有直接关系，不需要将源程序文件名与文件开头申明的包名保持一样，通常这2者是不一样的。
- 只有在源程序文件开头声明package main，并且有func main()定义，才能生成可执行程序，否则go run file.go会报错。

即主文件使用类似于C语言,main包的main函数为开始函数。

同时也是go为编译型语言，先进行编译后再运行。
- go build hello.go
- ./hello
# 数组
## 一维数组
### 赋值
数组的大小必须是常量，不能是变量，比如下面的语法里的size必须是常量

```
var float_num_list1 [5]float32 = [5]float32{1.0, 2.0, 3.0, 4.0, 5.0}
var float_num_list2 = [5]float32{1.0, 2.0, 3.0, 4.0, 5.0}
int_num_list := [3]int{1, 2, 3}
for index, value := range float_num_list1 {
	fmt.Println("[float_num_list1]index=", index, "value=", value)
}

for index, value := range float_num_list2 {
	fmt.Println("[float_num_list2]index=", index, "value=", value)
}

for index, value := range int_num_list {
	fmt.Println("[int_num_list]index=", index, "value=", value)
}
```

不显式指定数组大小，编译器根据赋的值自行推导
```
var balance1 []int = [...]int{1,2} // 等价于[2]int{1,2}
var balance2 = [...]int{1,2,3}
balance3 := [...]int{1, 2}
fmt.Println("balance1=", balance1)
fmt.Println("balance2=", balance2)
fmt.Println("balance3=", balance3)
```
指定下标赋值
```
balance := [5]int{1:10, 3:30} // 将数组下标为1和3的元素分别初始化为10和30
fmt.Println(balance) // [0, 10, 0, 30, 0]
```
### 遍历数组
使用for....rang 进行遍历
```
var float_num_list1 [5]float32 = [5]float32{1.0, 2.0, 3.0, 4.0, 5.0}
for index := range float_num_list1 {
    // index是数组下标
    fmt.Println("[float_num_list1]index=", index) 
}

for index, value := range float_num_list1 {
    // index是数组下标，value是对应的数组元素
	fmt.Println("[float_num_list1]index=", index, "value=", value)
}

获取数组长度使用len(array)
```
## 多维数组
### 赋值
和一维数组一样,数组大小必须为常量。
```
array1 := [2][3]int {
    {0, 1, 2},
    {3, 4, 5}, // 如果花括号}在下一行，这里必须有逗号。如果花括号在这一行可以不用逗号
}

array2 := [2][3]int{}
array2[0][2] = 1
array2[1][1] = 2
fmt.Println("array2=", array2)
```
### 遍历使用
```
package main

import "fmt"
import "reflect"

func main() {
    array := [2][3]int{{1, 2, 3}, {4, 5, 6}}
    for index := range array {
        // array[index]类型是一维数组
        fmt.Println(reflect.TypeOf(array[index])) 
        fmt.Printf("index=%d, value=%v\n", index, array[index])
    }

twoDimArray := [2][3]int {
    {0, 1, 2},
    {3, 4, 5}}
for index := range twoDimArray {
    fmt.Printf("row %d is ", index) //index的值是0,1，表示二维数组的第1行和第2行
    fmt.Println(twoDimArray[index]) //twoDimArray[index]类型就是一维数组
}
 for row_index, row_value := range twoDimArray {
    for col_index, col_value := range row_value {
        fmt.Printf("twoDimArray[%d][%d]=%d ", row_index, col_index, col_value)
    }
    fmt.Println()
}

}
```
### 函数参数
如果数组作为函数参数，实参和形参的定义必须相同，要么都是长度相同的数组。

```
package main

import "fmt"
import "reflect"

func sum(array [5]int, size int) int{
    sum := 0
    for i:=0; i<size; i++ {
        sum += array[i]
    }
    return sum
}

func main() {
    a := [5]int {1, 2, 3, 4, 5} // a := [...]int{1, 2, 3, 4, 5}也可以去调用sum，编译器会自动推导出a的长度5
    fmt.Println("type of a:", reflect.TypeOf(a)) // type of a: [5]int
    ans := sum(a, 5)
    fmt.Println("ans=", ans)
}
```
# select语义
语法上和switch类似，有case分支和default分支，只不过select的每个case后面跟的是channel的收发操作。
## 简单使用
```
package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)

    go func() {
        time.Sleep(2 * time.Second)
        ch1 <- 1
    }()

    go func() {
        time.Sleep(1 * time.Second)
        ch2 <- 2
    }()

    select {
    case v := <-ch1:
        fmt.Println("Received from ch1:", v)
    case v := <-ch2:
        fmt.Println("Received from ch2:", v)
    default:
        fmt.Println("No communication ready")
    }
}
```
select 语句会等待 ch1 和 ch2 两个通道的输入操作。由于 ch2 先准备好数据,select 语句会随机选择 ch2 的分支执行,并打印出 "Received from ch2: 2"。如果两个通道都没有准备好数据,则默认分支会被执行,打印出 "No communication ready"。

# 函数，闭包和方法
函数是独立定义的,闭包是函数内部定义的函数,方法是与类/对象关联定义的函数
## 函数
```
// func2.go
package main

import "fmt"

/*
函数add的返回值有2个，类型是int，标识符分别是c和d
可以在函数体内直接给c和d赋值，return后面可以带，也可以不带返回值
*/
func addAndSub(a int, b int) (c int, d int) {
	c = a + b
	d = a - b
	return // 这一行写为 return c, d 也可以
}

func main() {
	a1, b1 := 1, 2
	c1, d1 := addAndSub(a1, b1)
	/*输出结果是：3 -1*/
	fmt.Println(c1, d1)
}
```
## 闭包
 匿名函数。顾名思义就是没有函数名。
 ```
package main

import "fmt"

func main() {
	/*
		定义2个匿名函数，也就是闭包。
		闭包可以直接调用，也可以赋值给一个变量，后续调用
	*/
	result1 := func(a int, b int) int {
		return a + b
	}(1, 2)

	var sub = func(a int, b int) int {
		return a - b
	}
	result2 := sub(1, 2)
	/*输出结果：3 -1*/
	fmt.Println(result1, result2)
}
```
## 方法
类似java class里的方法，只是go没有class的概念。
```
package main

import "fmt"

type Circle struct {
	radius float64
}

func (c Circle) getArea() float64 {
	return 3.14 * c.radius * c.radius
}

/*
changeRadius和changeRadius2的区别是后者可以改变变量c的成员radius的值，前者不能改变
*/
func (c Circle) changeRadius(radius float64) {
	c.radius = radius
}

func (c *Circle) changeRadius2(radius float64) {
	c.radius = radius
}

func (c Circle) addRadius(x float64) float64{
	return c.radius + x
}

func main() {
	var c Circle
	c.radius = 10
	fmt.Println("radius=", c.radius, "area=", c.getArea())	//10, 314

	c.changeRadius(20)
	fmt.Println("radius=", c.radius, "area=", c.getArea())	//10, 314	

	c.changeRadius2(20)
	fmt.Println("radius=", c.radius, "area=", c.getArea())	//20, 1256

	result := c.addRadius(3.6)
	fmt.Println("radius=", c.radius, "result=", result) // 20, 23.6
}
```



# 指针
## 初始化
```
package main

import "fmt"
import "reflect"

func main() {
    i := 10
    // 方式1
    var intPtr *int = &i
    fmt.Println("pointer value:", intPtr, " point to: ", *intPtr)
    fmt.Println("type of pointer:", reflect.TypeOf(intPtr))
    
    // 方式2
    intPtr2 := &i
    fmt.Println(*intPtr2)
    fmt.Println("type of pointer:", reflect.TypeOf(intPtr2))
    
    // 方式3
    var intPtr3 = &i;
    fmt.Println(*intPtr3)
    fmt.Println("type of pointer:", reflect.TypeOf(intPtr3))
    
    // 方式4
    var intPtr4 *int
    intPtr4 = &i
    fmt.Println(*intPtr4)
    fmt.Println("type of pointer:", reflect.TypeOf(intPtr4))
}
```
**注意**
指针的默认值为nil

## 指针数组
即一个数组中存在多个指针，即为指针数组。
```
package main  
  
import "fmt"  
  
func main() {  
    var ptrArray [5]*int  
    a := [5]int{1, 2, 3, 4, 5}  
    for i := 0; i < 5; i++ {  
       ptrArray[i] = &a[i]  
    }  
  
    for i := 0; i < 5; i++ {  
       fmt.Printf("%d ", *ptrArray[i])  
    }  
    fmt.Println()  
}
```
## 指向指针的指针
我们可以简单理解为一个链式关系

```
package main

import "fmt"

func main() {
    var a int = 100
    var ptr1 *int = &a
    var ptr2 **int = &ptr1
    var ptr3 ***int = &ptr2
    
    fmt.Println("*ptr1=", *ptr1)
    fmt.Println("**ptr2=", **ptr2)
    fmt.Println("***ptr3=", ***ptr3)
}
```
## 函数参数
```
package main

import "fmt"

// 这个可以交换外部传入的2个实参的值
func swap(a *int, b *int) {
    *a, *b = *b, *a
}

// 这个无法交换外部传入的2个实参的值
func swap2(a *int, b *int) {
    a, b = b, a
}


func main() {
    a, b := 1, 2
    swap(&a, &b)
    fmt.Println("a=", a, " b=", b) // a= 2  b= 1
    
    swap2(&a, &b)
    fmt.Println("a=", a, " b=", b) // a= 2  b= 1
}
```
当我们使用* int时，使用`*b`即代表我们使用的是他指向的变量。直接使用b即使用的是他指向变量的值。

# 结构体
## 赋值初始化与成员访问
```
type Book struct {
    id int
    title string
    author string
}

book1 := Book{1, "go tutorial", "jincheng9"}
book2 := Book{id:2, title:"day day up", author:"unknown"}
```
## 结构体指针
```
package main

import "fmt"

type Book struct {
    id int
    author string
    title string
}

func printBook(book *Book) {
    fmt.Println("id:", book.id)
    fmt.Println("author:", book.author)
    fmt.Println("title:", book.title)
}

func main() {
    book := Book{1, "expert", "go"}
    bookPtr := &book
    printBook(bookPtr)
}
```
这里访问结构体指针的成员和普通结构体一样。

## 与面向对象的对比
可以对struct结构体类型定义方法，结构体对象调用该方法，来达到类似面向对象的效果。
```
package main

import "fmt"

type Book struct {
    id int
    author string
    title string
}


func (book Book) printBook() {
    fmt.Printf("id:%d, author:%s, title:%s\n", book.id, book.author, book.title)
}

func (book *Book) changeTitle1() {
    book.title = "new title1"
}

// 这个无法改变调用该方法的结构体变量里的成员的值
func (book Book) changeTitle2() {
    book.title = "new title2"
}

func main() {
    book := Book{1, "expert", "go"}
    book.printBook()
    
    book.changeTitle1() // 会修改变量book里的成员title的值
    book.printBook()
    
    book.changeTitle2() // 不会对book的值有任何影响
    book.printBook()
    
}
```
**注意点**：
- 如果结构体要被其它package使用，那结构体的标识符或者说结构体的名称首字母要大写
- 如果结构体的成员要被其它package使用，那结构体和结构体的成员标识符首字母都要大写，否则只能在当前包里使用
# 切片
切片是对数组的抽象。Go数组的长度在定义后是固定的，不可改变的。切片的长度和容量是不固定的，可以动态增加元素，切片的容量也会根据情况自动扩容。

## 简单使用
```
package main

import "fmt"

func printSlice(param []int) {
    fmt.Printf("slice len:%d, cap:%d, value:%v\n", len(param), cap(param), param)
}

func main() {
    slice1 := []int{1}
    slice2 := make([]int, 3, 100)//创建了一个长度为 3、最大容量为 100 的整型切片
    printSlice(slice1)
    printSlice(slice2)
}
```

## 切片截取
这一点就类似于python了，使用冒号`:`来对数组或者切片做截取。
```
package main

import "fmt"
import "reflect"


func printSlice(param []int) {
    fmt.Printf("param len:%d, cap:%d, value:%v\n", len(param), cap(param), param)
}

func main() {
    slice := []int{}
    var slice2 []int
    
    fmt.Println("slice==nil", slice==nil) // false
    printSlice(slice)
    
    fmt.Println("slice2==nil", slice2==nil) // true
    printSlice(slice2)
    
    // 对数组做切片
    array := [3]int{1,2,3} // array是数组
    slice3 := array[1:3] // slice3是切片
    fmt.Println("slice3 type:", reflect.TypeOf(slice3))
    fmt.Println("slice3=", slice3) // slice3= [2 3]
    
    slice4 := slice3[1:2]
    fmt.Println("slice4=", slice4) // slice4= [3]
    
    /* slice5->slice4->slice3->array
    对slice5的修改，会影响到slice4, slice3和array
    */
    slice5 := slice4[:]
    fmt.Println("slice5=", slice5) // slice5= [3]
    
    slice5[0] = 10
    fmt.Println("array=", array) // array= [1 2 10]
    fmt.Println("slice3=", slice3) // slice3= [2 10]
    fmt.Println("slice4=", slice4) // slice4= [10]
    fmt.Println("slice5=", slice5) // slice5= [10]
}
```
## 常用函数
- len()：获取切片的长度，也就是实际存储了多少个元素
- cap(): 获取切片的容量。如果切片的元素个数要超过当前容量，会自动扩容
- append()：通过append函数给切片加元素，但不改变原切片的值，比如下例里的append(slice, 4)并不会改变slice的值。

```
package main

import "fmt"

func main() {
    slice := []int{1, 2, 3}
    // 往原切片里加一个元素
    test := append(slice, 4)
    // append不会改变slice的值，除非把append的结果重新赋值给slice
    fmt.Println(slice) // [1 2 3]
    fmt.Println(test) // [1 2 3 4]
    
    // 通过append给切片添加切片
    temp := []int{1,2}
    test = append(test, temp...) // 注意，第2个参数有...结尾
    fmt.Println(test) // [1 2 3 4 1 2]
    
    /*下面对array数组做append就会报错:  first argument to append must be slice; have [3]int
    array := [3]int{1, 2, 3}
    array2 := append(array, 1)
    fmt.Println(array2)
    */
}
```
## 函数传参
```
package main

import "fmt"


func change1(param []int) {
	param[0] = 100 // 这个会改变外部切片的值
	param = append(param, 200) // append不会改变外部切片的值
}

func change2(param *[]int) {
	*param = append(*param, 300) // 传切片指针，通过这种方式append可以改变外部切片的值
}

func main() {
	slice := make([]int, 2, 100)
	fmt.Println(slice) // [0, 0]

	change1(slice)
	fmt.Println(slice) // [100, 0]

	change2(&slice)
	fmt.Println(slice) // [100, 0, 300]
}
```

# map
无序的基于<key, value>对组成的数据结构，key是唯一的，类似python的dict。map必须初始化后才能写map。

## 初始化和赋值
```
package main

import "fmt"

func main() {
	var counter map[string]int
	/*
	map没有初始化，读map相当于读了一个空map
	下例中：value是int的零值0，ok是false
	*/
	value, ok := counter["a"]
	fmt.Println(value, ok)

	/*counter没有初始化，给counter赋值会在运行时报错
	  panic: assignment to entry in nil map
	*/
	counter["a"] = 1
	fmt.Println(counter)
}
```
## 常用函数

delete()允许删除一个不存在的key，对map无任何影响。
```
package main

import "fmt"

func main() {
    dict :=  map[string]int{"a":1, "b":2}
    fmt.Println(dict) // map[a:1 b:2]
    
    // 删除"a"这个key
    delete(dict, "a")
    fmt.Println(dict) // map[b:2]
    
    // 删除"c"这个不在的key，对map结果无影响
    delete(dict, "c")
    fmt.Println(dict) // map[b:2]
}
```
# 接口
## 基本使用
```
package main

import "fmt"

// all animals can speak
type Animal interface {
    speak()
}

// cat
type Cat struct {
    name string
    age int
}

func(cat Cat) speak() {
    fmt.Println("cat miaomiaomiao")
}

// dog
type Dog struct {
    name string
    age int
}

func(dog *Dog) speak() {
    fmt.Println("dog wangwangwang")
}


func main() {
    var animal Animal = Cat{"gaffe", 1}
    animal.speak() // cat miaomiaomiao
    
    /*
    因为Dog的speak方法用的是指针接受者，因此给interface赋值的时候，要赋指针
    */
    animal = &Dog{"caiquan", 2}
    animal.speak() // dog wangwangwang
}
```
- **多个struct类型可以实现同一个interface**：多个类型都有共同的方法(行为)。比如上面示例里的猫和狗都会叫唤，猫和狗就是2个类型，叫唤就是speak方法。
- **一个struct类型可以实现多个interface**。比如猫这个类型，既是猫科动物，也是哺乳动物。猫科动物可以是一个interface，哺乳动物可以是另一个interface，猫这个struct类型可以实现猫科动物和哺乳动物这2个interface里的方法。


```
package main

import "fmt"


// interface1，猫科动物的共同行为
type Felines interface {
    feet() 
}

// interface2, 哺乳动物的共同行为
type Mammal interface {
    born()
}

// 猫既是猫科动物也是哺乳动物，2个行为都实现
type Cat struct {
    name string
    age int
}

func(cat Cat) feet() {
    fmt.Println("cat feet")
}

func(cat *Cat) born() {
    fmt.Println("cat born")
}

func main() {
    cat := Cat{"rich", 1}
    var a Felines = cat
    a.feet()
    
    var b Mammal = &cat
    b.born()
}
```
interface可以嵌套：一个interface里包含其它interface
```
package main

import "fmt"


// interface1
type Felines interface {
    feet() 
}

// interface2, 嵌套了interface1
type Mammal interface {
    Felines
    born()
}

// 猫实现Mammal这个interface里的所有方法
type Cat struct {
    name string
    age int
}

func(cat Cat) feet() {
    fmt.Println("cat feet")
}

func(cat *Cat) born() {
    fmt.Println("cat born")
}

func main() {
    cat := Cat{"rich", 1}
    /*Mammal有feet和born方法，2个都可以调用*/
    var a Mammal = &cat
    a.feet()
    a.born()
    
    var b Felines = cat
    b.feet()
    // b.born() 调用这个会编译报错，因为Felines没有born方法
}
```
## 空接口
如果空interface作为函数参数，可以接受任何类型的实参。
```
package main

import "fmt"


type Cat struct {
    name string
    age int
}

// 打印空interface的类型和具体的值
func print(x interface{}) {
    fmt.Printf("type:%T, value:%v\n", x, x)
}

func main() {
    // 传map实参给空接口
    dict := map[string]int{"a":1}
    print(dict) // type:map[string]int, value:map[a:1]
    
    // 传struct实参给空接口
    cat := Cat{"nimo", 2}
    print(cat) // type:main.Cat, value:{nimo 2}
}
```

## 断言
```
var x interface{}
x = "a"
// 断言接口变量x的类型是string
v, ok := x.(string)
if ok {
    // 断言成功
    fmt.Println("assert true, value:", v)
} else{
    // 断言失败
	fmt.Println("assert false")
}
```

# 多线程
## goroutine
Go会为main()函数创建一个默认的goroutine，如果main()函数结束了，那所有在main()中启动的goroutine都会立马结束。
```
package main  
  
import "fmt"  
  
func hello() {  
    fmt.Println("hello")  
}  
  
func main() {  
    /*开启一个goroutine去执行hello函数*/  
    go hello()  
    go hello()  
    go hello()  
    go hello()  
    go hello()  
    fmt.Println("main end")  
}
```
执行结果可能有以下3种：
main end // 只打印main end
main end // 先打印main end，再打印hello
hello
hello // 先打印hello，再打印main end
main end
## channel
多个goroutine之间，可以通过channel来通信。
### 基本使用
channel有3种操作，发送数据，接收数据和关闭channel。发送和接收都是用`<-`符号
```
ch := make(chan int)
ch <- 10 // 把10发送到ch里

ch := make(chan int)
x := <-ch // 从通道ch里接收值，并赋值给变量x
var y int
y = <-ch // 从通道ch里接收值，并赋值给变量y

ch := make(chan int)
close(ch) // 关闭通道
```
### 缓冲区
#### 无缓冲区
往channel发送数据的时候，必须有其它goroutine从channel里接收了数据，发送操作才可以成功，发送操作所在的goroutine才能继续往下执行。从channel里接收数据也是同理，必须有其它goroutine往channel里发送了数据，接收操作才可以成功，接收操作所在的goroutine才能继续往下执行。
```
package main

import "fmt"
import "time"

type Cat struct {
	name string
	age int
}

func fetchChannel(ch chan Cat) {
	value := <- ch
	fmt.Printf("type: %T, value: %v\n", value, value)
}


func main() {
	ch := make(chan Cat)
	a := Cat{"yingduan", 1}
	// 启动一个goroutine，用于从ch这个通道里获取数据
	go fetchChannel(ch)
	// 往cha这个通道里发送数据
	ch <- a
	// main这个goroutine在这里等待2秒
	time.Sleep(2*time.Second)
	fmt.Println("end")
}
```
如果交换了顺序，main函数就会堵塞在ch<-a这一行，因为这个发送是阻塞的，不会往下执行，这个时候没有任何goroutine会从channel接收数据.

同时如果没有`time.Sleep(2*time.Second)`这一行，那么可能main函数里的end和函数fetchChannel里的print内容都打印，也可能只会打印main函数里的end。因为fetchChannel里的value := <-ch执行之后，main里的ch<-a就不再阻塞，继续往下执行了，所以可能main里最后的fmt.Println比fetchChannel里的fmt.Printf先执行，main执行完之后程序就结束了，所有goroutine自动结束，就不再执行fetchChannel里的fmt.Printf了。main里加上time.Sleep就可以允许fetchChannel这个goroutine有足够的时间执行完成。
#### 有缓冲区
对于有缓冲区的channel，对发送方而言：
- 如果缓冲区未满，那发送方发送数据到channel缓冲区后，就可以继续往下执行，不用阻塞等待接收方从channel里接收数据。
- 如果缓冲区已满，那发送方发送数据到channel会阻塞，直到接收方从channel里接收了数据，这样缓冲区才有空间存储发送方发送的数据，发送方所在goroutine才能继续往下执行。

```
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	// 下面2个发送操作不用阻塞等待接收方接收数据
	ch <- 10
	ch <- 20
	/*
	如果添加下面这行代码，就会一直阻塞，因为缓冲区已满，运行会报错
	fatal error: all goroutines are asleep - deadlock!
	
	ch <- 30
	*/
	
	fmt.Println(<-ch) // 10
	fmt.Println(<-ch) // 20
}
```
### 常用函数
range迭代从channel里不断取数据
```
package main

import "fmt"
import "time"


func addData(ch chan int) {
	/*
	每3秒往通道ch里发送一次数据
	*/
	size := cap(ch)
	for i:=0; i<size; i++ {
		ch <- i
		time.Sleep(3*time.Second)
	}
	// 数据发送完毕，关闭通道
	close(ch)
}


func main() {
	ch := make(chan int, 10)
	// 开启一个goroutine，用于往通道ch里发送数据
	go addData(ch)

	/* range迭代从通道ch里获取数据
	通道close后，range迭代取完通道里的值后，循环会自动结束
	*/
	for i := range ch {
		fmt.Println(i)
	}
}
```
### 单向通道
如果channel作为函数的形参，可以控制限制数据和channel之间的数据流向，控制只能往channel发送数据或者只能从channel接收数据。
```
package main

import "fmt"
import "time"


func write(ch chan<-int) {
	/*
	参数ch是只写channel，不能从channel读数据，否则编译报错
	receive from send-only type chan<- int
	*/
	ch <- 10
}


func read(ch <-chan int) {
	/*
	参数ch是只读channel，不能往channel里写数据，否则编译报错
	send to receive-only type <-chan int
	*/
	fmt.Println(<-ch)
}

func main() {
	ch := make(chan int)
	go write(ch)
	go read(ch)

	// 等待3秒，保证write和read这2个goroutine都可以执行完成
	time.Sleep(3*time.Second)
}
```

# defer函数
defer常用于成对的操作，比如文件打开后要关闭、锁的申请和释放、sync.WaitGroup跟踪的goroutine的计数器的释放等。为了确保资源被释放，可以结合defer一起使用，避免在代码的各种条件分支里去释放资源，容易遗漏和出错。
简单来说就是控制负责函数最后的结尾工作。
```
package main

import (
	"fmt"
	"sync"
)


var wg sync.WaitGroup


func sumN(N int) {
	// 调用defer wg.Done()确保sumN执行完之后，可以对wg的计数器减1
	defer wg.Done()
	sum := 0
	for i:=1; i<=N; i++ {
		sum += i
	}
	fmt.Printf("sum from 1 to %d is %d\n", N, sum)
}

func main() {
	// 设置wg跟踪的计数器数量为1
	wg.Add(1)
	// 开启sumN这个goroutine去计算1到100的和
	go sumN(100)
	// Wait会一直等待，直到wg的计数器为0
	wg.Wait()
	
	fmt.Println("finish")		
}
```
# 项目结构
## package
package本质上就是一个目录，目录里包含有一个或者多个Go源程序文件，或者package。也就是说package里面还可以嵌套包含子package。

每个Go源文件都属于一个package，在源文件开头指定package名称。

```
package package_name
```
**注意:**
package里的变量、函数、结构体、方法等如果要被本package外的程序引用，需要在命名的时候首字母大写
## import
```
import (
	"fmt"                           // 标准库
	"sync/atomic"                   // 标准库sync的atomic子package
	"package1"                      // 自开发的package
	"package2/package21"            // 自开发package，嵌套子package
	"package2/package22"            // 自开发package，嵌套子package
	"package3/package31/package311" // 自开发package，多重嵌套
)
```
使用import路径里面定义的**package名称**来访问package里的方法，结构体等，而不是路径名称。

举个例子，假设上面import的路径package2/package21这个目录下的Go源程序文件开头声明的package名称是realpackage，那访问这个package里的方法，结构体等要用realpackage.xxx来访问，而不是用package21.xxx来访问。

一句话总结：**import的是路径，访问用package名称**。最佳实践就是让两者保持一致。

### 点操作
```
import (
    "fmt"
    . "package2/package21"
)
```
`.`可以让后面的package里的成员注册到当前包的上下文，比如以前要用package21.Hello()来调用package21这个包里的函数Hello，用了点操作后，可以直接调用函数Hello()，前面不用跟package名称。
### 下划线
```
import (
    "fmt"
    _ "package2/package21"
)
```
下划线`_`的效果：只会执行包里各个源程序文件的init方法，没法调用包里的成员。

# 异常
## panic
用于抛出错误
```
panic(12)
panic("invalid parameter")
panic(Error("cannot parse"))
```

## recover
用于捕获错误
```
package main

import (
	"fmt"
)

func a() {
	defer func() {
		/*捕获函数a内部的panic*/
		r := recover()
		fmt.Println("panic recover", r)
	}()
	panic(1)
}

func main() {
	defer func() {
		/*因为函数a的panic已经被函数a内部的recover捕获了
		所以main里的recover捕获不到异常，r的值是nil*/
		r := recover()
		fmt.Println("main recover", r)
	}()
	a()
	fmt.Println("main")
}

```
# 参考文档
https://github.com/jincheng9/go-tutorial/blob/main/workspace/lesson10/readme.md