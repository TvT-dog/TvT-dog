---
data: 2024-06-27
tags:
  - 安卓
关联:
  - "[[安卓学习]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364742
---
# Xpose框架使用
## 前置知识

- ROOT手机并安装了xpose框架
- 安卓开发基础知识
## 环境依赖配置

settings.gradle
>设置Xposed仓库的网址

~~~
dependencyResolutionManagement { repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS) repositories { google() mavenCentral() maven { url 'https://api.xposed.info/' } // 添加这一行即可 } }
~~~

build.gradle.kts
>设置相关依赖

~~~
dependencies { compileOnly 'de.robv.android.xposed:api:82' // compileOnly 'de.robv.android.xposed:api:82:sources' // 不要导入源码，这会导致idea无法索引文件，从而让语法提示失效 }

新版本使用
compileOnly("de.robv.android.xposed:api:82")
~~~

添加文件assets/xposed_init
>设置模块推荐的应用

内容如下
~~~
<resources> <string-array name="xposedscope" >
<!-- 这里填写模块的作用域应用的包名，可以填多个。 --> <item>me.kyuubiran.xposedapp</item> 
</string-array> </resources>
~~~

## 程序编写

### IXposedHookLoadPackage接口

在 Xposed 中,要创建一个可以加载和运行的模块,需要实现一个特定的接口 `IXposedHookLoadPackage`。这个接口定义了一个方法 `handleLoadPackage(final XC_LoadPackage.LoadPackageParam lpparam)`，当一个应用程序被加载时,这个方法就会被调用。

### handleLoadPackage()方法

~~~
public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam)
~~~

当 Xposed 模块被加载并且应用程序被加载时,该方法就会被调用。其中`lpparam` 参数是 Xposed 框架中非常重要的一个参数,它包含了应用程序被加载时的相关信息。

在 `handleLoadPackage()` 方法中,我们需要传入这个 `lpparam` 参数,它是 `XC_LoadPackage.LoadPackageParam` 类型的对象。这个对象包含了以下重要的信息:

1. `packageName`: 当前应用程序的包名。
2. `processName`: 当前应用程序的进程名。
3. `classLoader`: 当前应用程序的 ClassLoader 对象,用于加载类和方法。
4. `appInfo`: 当前应用程序的 ApplicationInfo 对象,包含了应用程序的各种属性信息。
5. `isFirstApplication`: 标识是否为当前进程的第一个应用程序。

~~~
public class MainHook implements IXposedHookLoadPackage {  
  
    @Override  
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {  
        // 过滤不必要的应用  
        if (!lpparam.packageName.equals("me.kyuubiran.xposedapp")) return;  
        // 执行Hook  
  
        hook(lpparam);  
    }
~~~

我们一般会在handleLoadPackage方法中检验是否是我们想要的程序。

### XposedHelpers.findAndHookMethod()方法

~~~
XposedHelpers.findAndHookMethod(
    String className,
    ClassLoader classLoader,
    String methodName,
    Object... parameterTypesAndCallback
)
~~~

1. `String className`: 要 hook 的类的全限定名。
2. `ClassLoader classLoader`: 用于加载目标类的 ClassLoader 对象。通常使用 `lpparam.classLoader`。
3. `String methodName`: 要 hook 的方法名。
4. `Object... parameterTypesAndCallback`: 这是一个可变参数列表,包含以下内容:
    - 目标方法的参数类型。可以是 `Class<?>` 对象或基本数据类型的 Class 对象,如 `int.class`、`String.class` 等。
    - 最后一个参数必须是 `XC_MethodHook` 类型的回调对象。

但同时你可以直接实例化后，再进行一个对应的传递。

XposedHelpers.findAndHookMethod()一般是用来定位我们想要劫持的方法。

~~~
private void hook(XC_LoadPackage.LoadPackageParam lpparam) {  
    // 它有两个重载，区别是一个是填Class，一个是填ClassName以及ClassLoader  
    // 第一种 填ClassName  
    XC_MethodHook.Unhook unhook = XposedHelpers.findAndHookMethod("me.kyuubiran.xposedapp.MainActivity",    // className  
            lpparam.classLoader,    // classLoader 使用lpparam.classLoader  
            "onCreate",             // 要hook的方法  
            Bundle.class,           // 要hook的方法的参数表，如果有多个就用逗号隔开   
new XC_MethodHook() {   // 最后一个填hook的回调  
                @Override  
                protected void beforeHookedMethod(MethodHookParam param) {} // Hook方法执行前    
@Override  
                protected void afterHookedMethod(MethodHookParam param) {} // Hook方法执行后  
            });  
    // 它返回一个unhook 在你不需要继续hook的时候可以调用它来取消Hook  
    unhook.unhook();    // 取消空的Hook   
    // 第二种方式 填Classxz
    // 首先你得加载它的类 我们使用XposedHelpers.findClass即可 参数有两个 一个是类名 一个是类加载器  
    Class<?> clazz = XposedHelpers.findClass("me.kyuubiran.xposedapp.MainActivity", lpparam.classLoader);  
    XposedHelpers.findAndHookMethod(clazz, "onCreate", Bundle.class, new XC_MethodHook() {  
        @Override  
        protected void afterHookedMethod(MethodHookParam param){  
            // 由于我们需要在Activity创建之后再弹出Toast，所以我们Hook方法执行之后  
            Toast.makeText((Activity) param.thisObject, "模块加载成功！", Toast.LENGTH_SHORT).show();  
        }  
    });  
}
~~~

如果你学过java反射，以上代码对你来说应该是很简单的。

### XC_MethodHook()使用

`XC_MethodHook` 是 Xposed 框架中用于 hook 方法的一个重要类。它提供了两个关键的回调方法:`beforeHookedMethod()` 和 `afterHookedMethod()`。

- `protected void beforeHookedMethod(MethodHookParam param) {}`
    
    - 这个方法会在目标方法执行之前被调用。
    - `MethodHookParam param` 对象包含了目标方法的相关信息,比如:
        - `param.args`: 目标方法的参数列表,可以在这里修改参数。
        - `param.method`: 被 hook 的目标方法对象。
        - `param.thisObject`: 目标方法所属类的实例对象。
        - `param.getResult()`: 如果是构造函数,可以获取新创建的对象。
    - 在这里我们可以执行一些预处理逻辑,比如修改参数、记录日志、阻止方法执行等。
- `protected void afterHookedMethod(MethodHookParam param) {}`
    
    - 这个方法会在目标方法执行之后被调用。
    - `MethodHookParam param` 对象包含了目标方法的相关信息,比如:
        - `param.getResult()`: 获取目标方法的返回值。
        - `param.hasThrowable()`: 判断目标方法是否抛出了异常。
        - `param.getThrowable()`: 获取目标方法抛出的异常对象。
    - 在这里我们可以执行一些后处理逻辑,比如修改返回值、记录日志、处理异常等。

我们一般会在XC_MethodHook()中去书写我们具体的逻辑

~~~
XposedHelpers.findAndHookMethod(
    "com.example.targetapp.TargetClass",
    lpparam.classLoader,
    "targetMethod",
    String.class, int.class,
    new XC_MethodHook() {
        @Override
        protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
            // 在目标方法执行之前执行的逻辑
            String originalArg = (String) param.args[0];
            XposedBridge.log("Before calling targetMethod() with arg: " + originalArg);

            // 修改参数
            param.args[0] = "modified argument";
        }

        @Override
        protected void afterHookedMethod(MethodHookParam param) throws Throwable {
            // 在目标方法执行之后执行的逻辑
            boolean result = (boolean) param.getResult();
            XposedBridge.log("After calling targetMethod(), result: " + result);

            // 修改返回值
            param.setResult(true);
        }
    }
);
~~~



