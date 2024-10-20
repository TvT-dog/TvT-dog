---
data: 2024-06-27
tags:
  - 安卓
关联:
  - "[[安卓学习]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364741
---
# frida调试
## 基本概念

`frida`是平台原生`app`的`Greasemonkey`，说的专业一点，就是一种动态插桩工具，可以插入一些代码到原生`app`的内存空间去，（动态地监视和修改其行为），这些原生平台可以是`Win`、`Mac`、`Linux`、`Android`或者`iOS`。而且`frida`还是开源的。

`Greasemonkey`可能大家不明白，它其实就是`firefox`的一套插件体系，使用它编写的脚本可以直接改变`firefox`对网页的编排方式，实现想要的任何功能。而且这套插件还是外挂的，非常灵活机动。`frida`也是一样的道理。在一个js代码中学习我们的一个hook逻辑，然后再python进行相关一个运行。
## 安装教程

https://www.cnblogs.com/eliwang/p/17729247.html

## JAVA层Hook代码编写

这里我们主要会用到Java.perform来进行相关处理。

`Java.perform()` 是 Frida 框架提供的一个重要 API,用于在 Android 应用程序的 Java 运行时环境中执行代码。
- `Java.perform()` 方法接受一个回调函数作为参数,该函数包含要执行的 Java 代码。
- 回调函数内部可以使用各种 Frida API 来与 Java 运行时进行交互,例如:
    - `Java.use()`: 获取 Java 类的引用
    - `Java.choose()`: 枚举正在运行的 Java 对象
    - `Java.cast()`: 类型转换
    - `Java.field()` 和 `Java.method()`: 访问类的字段和方法

### app定位

我们一般使用frida.get_device和attach方法来连接上 frida-server并确定对应的app程序。
`get_device()`我们一般为空，它可以自动检测连接到的安卓设备。

```
device = frida.get_device()
app = device.attach(package_name)
```
### hook参数、修改结果

我们一般使用Java.use()来确实具体的一个类。然后使用implementation方法来更换对应的一个方法体。

如下代码即为替换com.roysue.demo02.MainActivity类中的implementation方法

app代码

~~~
public class MainActivity extends AppCompatActivity {  
  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
  
        while (true){  
  
            try {  
                Thread.sleep(1000);  
            } catch (InterruptedException e) {  
                e.printStackTrace();  
            }  
  
            fun(50,30);  
        }  
    }  
  
    void fun(int x , int y ){  
        Log.d("Sum" , String.valueOf(x+y));  
    }  
  
}
~~~

js代码

~~~
console.log("Script loaded successfully ");  
Java.perform(function x() {  
    console.log("Inside java perform function");  
    //定位类  
    var my_class = Java.use("com.example.frida.MainActivity");  
    console.log("Java.Use.Successfully!");//定位类成功！  
    //在这里更改类的方法的实现（implementation）  
    my_class.fun.implementation = function(x,y){  
        //打印替换前的参数  
        console.log( "original call: fun("+ x + ", " + y + ")");  
        //把参数替换成2和5，依旧调用原函数  
        var ret_value = this.fun(2, 5);  
        return ret_value;  
    }  
});
~~~

我们再使用python进行加载

~~~
import frida  
  
# 连接安卓机上的frida-server  
device = frida.get_usb_device()    
session = device.attach("frida")  
# 加载s1.js脚本  
with open("1.js",encoding="utf-8") as f:  
    script = session.create_script(f.read())  
script.load()  
  
# 脚本会持续运行等待输入  
input()
~~~
### hook重载函数与隐藏函数

我们使用overload()来实现对特定函数的获取，Java.choose()方法来获取隐藏函数。

~~~
console.log("Script loaded successfully ");  
Java.perform(function x() {  
    console.log("Inside java perform function");  
    //定位类  
    var my_class = Java.use("com.example.frida.MainActivity");  
    console.log("Java.Use.Successfully!");//定位类成功！  
    //在这里更改类的方法的实现（implementation）  
    my_class.fun.overload("int" , "int").implementation = function(x,y){  
        //打印替换前的参数  
        console.log( "original call: fun("+ x + ", " + y + ")");  
        //把参数替换成2和5，依旧调用原函数  
        var ret_value = this.fun(2, 5);  
        return ret_value;  
    }  
    var string_class = Java.use("java.lang.String"); //获取String类型  
     my_class.fun.overload("java.lang.String").implementation = function(x){  
     console.log("*************************************");  
     var my_string = string_class.$new("My TeSt String#####"); //new一个新字符串  
     console.log("Original arg: " +x );  
     var ret =  this.fun(my_string); // 用新的参数替换旧的参数，然后调用原函数获取结果  
     console.log("Return value: "+ret);  
     console.log("*************************************");  
     return ret;  
};  
     Java.choose("com.example.frida.MainActivity" , {  
  onMatch : function(instance){ //该类有多少个实例，该回调就会被触发多少次  
    console.log("Found instance: "+instance);  
    console.log("Result of secret func: " + instance.secret());  
  },  
  onComplete:function(){}  
});  
  
});
~~~

这里我们就使用overload传入参数类型来实现获取重载函数。使用choose方法直接定位类来获取其中的所有方法。
### 远程调用

Frida是使用JavaScript和Python俩种语言，JavaScript 擅长在应用程序内部进行动态注入和交互,而 Python 则更适合承担复杂的分析和处理任务。这种分工合作的方式,可以让 Frida 在动态应用程序分析和修改方面发挥更强大的功能。前文我们都是使用JavaScript操作函数，但如何我们要去处理数据流，这时候就要使用python了。

同时这里使用远程调用可以让我直接去使用Native 层的方法，而不用去关心它的一个底层逻辑。

我们使用

~~~
rpc.exports = {  
    callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线  
};
~~~

来进行导出，JS代码如下

~~~
console.log("Script loaded successfully ");  
  
function callSecretFun() { //定义导出函数  
    Java.perform(function () { //找到隐藏函数并且调用  
        Java.choose("com.example.frida.MainActivity", {  
            onMatch: function (instance) {  
                console.log("Found instance: " + instance);  
                console.log("Result of secret func: " + instance.secret());  
            },  
            onComplete: function () { }  
        });  
    });  
}  
rpc.exports = {  
    callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线  
};
~~~

然后在pytho使用 script.exports_sync.callsecretfunction()进行一个对应的调用

~~~
import time  
import frida  
  
  
def my_message_handler(message, payload):  
    print(message)  
    print(payload)  
  
  
device = frida.get_usb_device()  
pid = device.spawn("com.example.frida")  
device.resume(pid)  
time.sleep(1)  
session = device.attach(pid)  
with open("1.js", encoding="utf-8") as f:  
    script = session.create_script(f.read())  
script.on("message", my_message_handler)  
script.load()  
  
command = ""  
while 1 == 1:  
    command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")  
    if command == "1":  
        break  
    elif command == "2":  #在这里调用  
        script.exports_sync.callsecretfunction()
~~~

## Native 层Hook代码编写

### so文件与函数的定位

`Module.findExportByName` 是 Frida 中一个非常有用的函数,它可以用来查找给定模块中导出的函数。

~~~
// 在 "libc.so" 模块中查找 "printf" 函数
var printfPtr = Module.findExportByName("libc.so", "printf");
~~~

### hook对应函数

`Interceptor.attach()` 用于拦截和挂钩(hook)函数调用。

~~~
// 拦截 libc 中的 printf 函数
var printfPtr = Module.findExportByName("libc.so", "printf");
Interceptor.attach(printfPtr, {
    onEnter: function(args) {
        console.log("Calling printf with format:", Memory.readCString(args[0]));
    },
    onLeave: function(retval) {
        console.log("printf returned:", retval);
    }
});
~~~

