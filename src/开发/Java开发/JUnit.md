---
data: 2024-07-22
关联:
  - "[[Java开发]]"
title: JUnit
---
## 单元测试意义
单元测试，就是针对最小的功能单元编写测试代码。在 Java 中，最小的功能单元就是方法。
## 简单使用

![](https://cdn.nlark.com/yuque/0/2024/png/27874700/1721700954554-f69ad6eb-5660-4ed9-87b5-7f3812243c20.png)
给要测试的类的方法上填写对应的一个测试注解。
```
@Test
void fact() {
    assertEquals(1, Factorial.fact(1));
    assertEquals(2, Factorial.fact(2));
    assertEquals(6, Factorial.fact(3));
    assertEquals(100, Factorial.fact(5));
}
```
`Test` 注解是我要求的，我会把带有 `@Test` 的方法识别为测试方法。在测试方法内部，你可以使用 `assertEquals()` 对期望的值和实际的值进行比对。

```
class CalculatorTest {
    Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }


    @Test
    void sub() {
        assertEquals(0,calculator.sub(1,1));
    }

    @Test
    void add() {
        assertEquals(2,calculator.add(1,1));
    }
}
```
`@BeforeEach` 的 `setUp()` 方法会在运行每个 `@Test` 方法之前运行；`@AfterEach` 的 `tearDown()` 方法会在运行每个 `@Test` 方法之后运行。
## 异常测试
```
@Test
void factIllegalArgument() {
    assertThrows(IllegalArgumentException.class, new Executable() {
        @Override
        public void execute() throws Throwable {
            Factorial.fact(-2);
        }
    });
}
```
提供了一个 `assertThrows()` 的方法，第一个参数是异常的类型，第二个参数 Executable，可以封装产生异常的代码。如果觉得匿名内部类写起来比较复杂的话，可以使用 Lambda 表达式.
## 忽略测试
```
class DisabledTestsDemo {

    @Disabled("该测试用例不再执行，直到编号为 43 的 bug 修复掉")
    @Test
    void testWillBeSkipped() {
    }

    @Test
    void testWillBeExecuted() {
    }

}

```
## 条件测试
不同的操作系统，可能需要不同的测试用例，比如说 Linux 和 Windows 的路径名是不一样的，通过 `@EnabledOnOs` 注解就可以针对不同的操作系统启用不同的测试用例。
```
@Test
@EnabledOnOs(MAC)
void onlyOnMacOs() {
    // ...
}

@TestOnMac
void testOnMac() {
    // ...
}

@Test
@EnabledOnOs({ LINUX, MAC })
void onLinuxOrMac() {
    // ...
}

@Test
@DisabledOnOs(WINDOWS)
void notOnWindows() {
    // ...
}
```