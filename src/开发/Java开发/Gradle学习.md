---
data: 2024-07-10
tags:
  - 构建工具
关联:
  - "[[Java开发]]"
---
# Gradle学习
## 第三包管理历史
早期没有项目管理工具时，对于项目所依赖的第三方包采用的事：拷贝三方jar包到本地，然后加入到lib目录下，这样做劣势不言而喻，管理复杂容易冲突。
后面就出现了第三方包管理工具

- Ant：2000年发布，纯java编写.  
- Maven：2004年发布，采用pom.xml管理项目
- Gradle：2012年，google背书的一款项目管理工具

在使用这三个工具之前，我们要了解一个Java 项目通常的构建步骤:

1. **清理 (Clean)**: 清理上一次的构建结果,删除生成的编译文件、JAR 包等。这一步确保构建过程从一个干净的状态开始。
2. **编译 (Compile)**: 编译 Java 源代码文件,将其转换为字节码文件。这个步骤需要确保源码文件的语法正确,并且能够通过编译器的检查。
3. **测试 (Test)**: 运行单元测试或集成测试,确保代码的功能正确。这个步骤可以在编译后立即执行,或者作为独立的构建阶段。
4. **打包 (Package)**: 将编译好的字节码文件及其依赖的库,打包成可分发的格式,通常是 JAR、WAR 或 EAR 文件。这个步骤需要指定项目的主类及相关的配置信息。
5. **安装 (Install)**: 将打包好的构件,安装到本地的仓库中,供其他项目使用。这个步骤适用于需要发布构件的情况。
6. **部署 (Deploy)**: 将打包好的构件,部署到测试或生产环境的服务器上。这个步骤需要与目标环境的基础设施进行对接。

假设我们有一个Java项目,需要构建并打包为一个可执行JAR包。

我们来看看这三种工具如何实现这个需求。

Ant
```
<?xml version="1.0" encoding="UTF-8"?>
<project name="my-project" default="jar">  //<property> 标签定义了项目中使用的一些属性,如源码目录、构建目录和主类名。
    <property name="src.dir" value="src"/>
    <property name="build.dir" value="build"/>
    <property name="lib.dir" value="lib"/>
    <property name="main.class" value="com.example.Main"/>

    <path id="classpath">   //<path>标签定义了项目的类路径,包括外部依赖库。
        <fileset dir="${lib.dir}" includes="*.jar"/>
    </path>

    <target name="clean"> //<target> 标签定义了各个构建步骤,如 clean、compile 和 jar。
        <delete dir="${build.dir}"/>
    </target>

    <target name="compile" depends="clean">
        <mkdir dir="${build.dir}/classes"/>
        <javac srcdir="${src.dir}" destdir="${build.dir}/classes" classpathref="classpath"/> //<javac> 标签用于编译源码,<jar> 标签用于打包 JAR 文件,其中包含了主类信息
    </target>

    <target name="jar" depends="compile">
        <jar destfile="${build.dir}/${ant.project.name}.jar" filesetmanifest="mergewithoutmain">
            <manifest>
                <attribute name="Main-Class" value="${main.class}"/>
            </manifest>
            <fileset dir="${build.dir}/classes"/>
            <zipgroupfileset dir="${lib.dir}" includes="*.jar"/>
        </jar>
    </target>
</project>
```

Maven 发布于 2004 年。目的是解决使用 Ant 所带来的一些问题。Maven 也是使用 XML 作为构建配置的文件格式，不过文件结构却有了巨大的变化：
- Ant 需要开发者将执行 task 所需的全部命令都列出来
- 而 Maven 依靠约定并提供现成的可调用的目标
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!-- 声明项目依赖的库 -->
    </dependencies>
</project>
```

Maven 主要解决了依赖管理的问题，然而使用 XML 的错误使它重蹈覆辙，实际上用 Maven 很难写出复杂、定制化的构建脚本，在大型项目中，它经常什么“特别的”事还没干就有几百行代码，甚至不如 Ant。

前辈们在反省前两种构建工具的错误之后，提出了 DSL （Domain Special Language, 领域专用语言）的概念，目标是设计一套能够解决特定领域问题的语言。在构建这方面，DSL 的一个成功案例就是 Gradle。

Gradle
```
plugins {
    id 'java'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.commons:commons-lang3:3.12.0'
    testImplementation 'junit:junit:4.13.2'
}

test {
    useJUnitPlatform()
}
```

现在大家项目使用的构建工具都是maven和Gradle了。

## 项目结构

```
├─build.gradle                        ①
├─gradlew                             ②
├─gradlew.bat						  ③
├─settings.gradle                     ④
├─gradle                              ⑤
│  └─wrapper                          
│      ├─ gradle-wrapper.jar          
│      ├─ gradle-wrapper.properties   
└─src                                 ⑥
    ├─main                            
    └─test
```

1. 项目自动编译的时候要读取的配置文件。比如指定项目的依赖包等。 build.grade 有两个，一个是全局的，一个是在模块里面。全局的build.grade主要设置的是声明仓库源，gradle的版本号说明等。
2. linux下的gradle环境脚本，可以执行gradle指令，如:./gradlew build
3. windows下的gradle环境，可以执行gradle指令
4. 包含必要的一些设置，例如，任务或项目之间的依懒关系等，无论有多少个子模块，该文件只会有一个，且一定在根项目中;
5. 包含wrapper文件夹及其2个子文件，作用是:可以自动安装gradle环境
6. 程序源码

## Project
在 Gradle 中,`Project` 是构建系统的核心概念。每个 Gradle 构建都有一个或多个 `Project` 对象,它们定义了整个构建的结构和行为。

Project 对象具有以下主要特点:

1. **定义构建**: Project 对象定义了整个构建的结构和行为。它包含了构建的所有配置信息,如项目信息、依赖关系、任务定义等。
2. **任务管理**: Project 对象管理着构建过程中的各种任务,如编译、测试、打包等。开发者可以定义自定义任务,并将它们集成到构建流程中。
3. **依赖管理**: Project 对象负责管理项目的依赖关系。它可以声明外部库依赖,并自动处理依赖的下载和引入。
4. **多项目构建**: 一个 Gradle 构建可以包含多个 Project 对象,即多个子项目。Project 对象可以定义它们之间的依赖关系,实现跨项目的构建和部署。

注意到，我们之前说过gradle是使用的DSL。这里的专用语言其实就是Groovy。这里就不细谈Groovy了。在 build.gradle 文件中,`project` 关键字用于访问当前 Project 对象,开发者可以通过它来配置和扩展构建行为。比如:

```
project.version = '1.0.0'  //设置当前 Project 对象的版本号为 `1.0.0`。
project.repositories {
    mavenCentral()    
}
//- 这段代码配置了当前 Project 对象的依赖仓库。
//- `repositories` 块用于定义项目从哪里下载依赖库。
//- `mavenCentral()` 是一个内置的方法,用于添加 Maven 中央仓库作为依赖源。
```
每一个`build.gradle`文件对应一个Project实例，我们在build.gradle中编写的内容，就相当于`Project`实例的属性或方法。

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1720611438865-d5875f74-5309-4b04-a29b-11862a69c6ab.png)

### 属性设置
```
group = 'com.it235'
version = '1.0.0'//内置属性可以直接赋值

def pname = "projectName:" + project.name
String pname = "projectName:" + project.name. //自定义属性可以使用groovy语法
也可以与java语法结合
ext.prop1 = "it235". //使用ext名命空间来扩展属性，定义后可以在project、task、subproject中读取和更新
ext.prop2 = "君哥聊编程"

```
### 方法
```
apply plugin: 'idea'. //apply 应用零个或多个插件或脚本。
apply plugin: 'java'
apply plugin: "maven"
apply plugin: "war"
apply plugin: "com.bmuschko.docker-remote-api"
apply plugin: "org.springframework.boot"

buildscript {
    repositories {
        mavenLocal()
        maven {
            url "https://maven.aliyun.com/repository/public"
        }
		mavenCentral()
    }
    dependencies {
        classpath "com.bmuschko:gradle-docker-plugin:3.3.4"
        classpath "org.springframework.boot:spring-boot-gradle-plugin:2.6.5"
    }//buildscript{}：配置当前gradle脚本自身需要使用的构建信息或依赖
}

```

### 插件
插件可以封装一系列任务，例如 编译，测试，打包等。 IDEA、VsCode、Eclipse、Maven、Chrome等都是支持插件集成的工具。插件意味着扩展，Gradle只要定义好插件规范，各大厂商或个人开发者遵循这个规范就能开发出很多有用的插件，从而丰富Gradle生态。

```
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.7.0'
}
```

这个示例中使用了两个插件:

1. `java` 插件
    - 这个是 Gradle 内置的核心插件,提供了标准的 Java 项目构建功能,如编译、测试、打包等。
    - 使用 `java` 插件后,Gradle 会自动应用这些常见的 Java 项目构建任务。
2. `org.springframework.boot` 插件
    - 这是 Spring Boot 项目的专用插件,提供了构建 Spring Boot 应用所需的特殊功能。
    - 这个插件不是 Gradle 自带的,而是由 Spring 团队提供的扩展插件。
    - 使用这个插件可以方便地构建和打包 Spring Boot 应用程序。

## 任务
任务是gradle的最小执行单元，一个`build.gradle`是由一系列的task组成，重要性不言而喻。任务在 Gradle 的构建脚本(build.gradle)中定义,可以通过以下方式创建任务:

```
task clean {
    description 'Deletes the build directory'
    delete 'build'
}

task compile(type: JavaCompile) {
    source = 'src/main/java'
    destinationDirectory = file('build/classes')
}
```
在这个例子中, 我们定义了两个任务:

1. `clean` 任务
    - 这是一个简单的任务,它的作用是删除项目的 `build` 目录。
    - 任务可以包含描述信息、执行逻辑等属性。
2. `compile` 任务
    - 这是一个更复杂的任务,它使用内置的 `JavaCompile` 任务类型。
    - 这个任务的作用是编译 Java 源代码,并将编译结果输出到 `build/classes` 目录。
    - 任务类型可以是内置的,也可以是自定义的。

## 生命周期
Gradle的核心是一种基于依赖的编程语言，任务与任务之间有一定的依赖关系，并且每个任务只会执行一次。在构建时，Gradle会把这些任务串联起来形成有向无环图。那Gradle是在什么时候进行串联的呢？这就需要充分了解Gradle在各个阶段做了什么事情了，从一开始到结束的这一连串动作我们称为生命周期。
gradle构建有3个不同的阶段
1. **初始化**： gradle支持单项目和多项目构建，在该阶段，gradle会解析`setting.gradle`文件，确定哪些项目需要参与构建，并且为这些项目创建一个[Project (opens new window)](https://docs.gradle.org/current/dsl/org.gradle.api.Project.html)实例
2. **配置**：当完成初始化阶段后，就会进入配置阶段，配置阶段解析所有`project`中的`build.gradle`文件获取所有的task，形成有向无环图后执行依赖关系，并且所有project中的`build script`部分和task的配置段会在这一阶段调用（注意并不是执行具体的task代码）。
3. **执行task**： 当完成任务依赖图后, Gradle 就做好了一切准备，然后进入执行阶段。按照有向无环图中task列表的顺序，执行所有被指定的task。

最后我们来比较一下

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0.0</version>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.7.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.7.0</version>
            </plugin>
        </plugins>
    </build>
</project>
```

```
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.7.0'
}

group 'com.example'
version '1.0.0'
sourceCompatibility = JavaVersion.toVersion(11)

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web:2.7.0'
}

bootJar {
    archiveFileName = 'my-project.jar'
}
```

这里就是使用了DSL的语言来替代了xml

# 参考链接
https://cloud.tencent.com/developer/article/1014645

https://www.it235.com/%E5%AE%9E%E7%94%A8%E5%B7%A5%E5%85%B7/Gradle/gradle.html#%E6%A6%82%E5%BF%B5