---
data: 2024-07-23
关联:
  - "[[Java开发]]"
博客链接: https:/www.cnblogs.com/Ho1dF0rward/p/18364757
title: Lombok学习
---
## Lombok的意义
`Lombok` 最大的好处就在于通过注解的形式来简化 Java 代码。

作为一名 Java 程序员，我相信你一定写过不少的 `getter / setter`，尽管可以借助 IDE 来自动生成，可一旦 `Javabean` 的属性很多，就免不了要产生大量的 `getter / setter`。

```
class Cmower {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getMoney() {
		return money;
	}
	public void setMoney(BigDecimal money) {
		this.money = money;
	}
}
```

使用了Lombok后
```
@Getter
@Setter
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

## 基础使用
```
class CmowerLombok {
	@Getter @Setter private int age;
	@Getter private String name;
	@Setter private BigDecimal money;
}
```

字节码文件反编译后的内容是：
```
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return this.name;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}
}

```
