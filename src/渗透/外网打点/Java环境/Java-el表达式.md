---
data: 2024-07-24
关联:
  - "[[book/知识笔记/开发/Java开发/Java开发]]"
  - "[[book/知识笔记/渗透/外网打点/外网打点]]"
---
```
import org.apache.commons.io.FileUtils;

@RequestMapping(value = "/excute", method = RequestMethod.POST)
public String upload(@RequestParam(name = "el") String el) {
        ExpressionFactory expressionFactory = new ExpressionFactoryImpl();
        SimpleContext simpleContext = new SimpleContext();
        String exp = "${''.getClass().forName('"+el+"').getMethod('exec',''.getClass()).invoke(''.getClass().forName('java.lang.Runtime').getMethod('getRuntime').invoke(null),'calc.exe')}";
        ValueExpression valueExpression = expressionFactory.createValueExpression(simpleContext, exp, String.class);
        System.out.println(valueExpression.getValue(simpleContext));
    }
```