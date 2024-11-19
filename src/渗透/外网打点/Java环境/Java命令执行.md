---
data: 2024-07-24
关联:
  - "[[book/知识笔记/开发/Java开发/Java开发]]"
  - "[[book/知识笔记/渗透/外网打点/外网打点]]"
---
## 示例代码

```
//不能希望下面这段代码能够直接运行，因为省略了很多东西

public synchronized static void gitOperater(String fileName, String workDir) throws Exception {
  			String cmd = "git add " + fileName;

        if (!(cmd.startsWith("git") || acceptedCmds.contains(cmd))){
            throw new IllegalArgumentException(String.format("发现不支持的shell command: %s", cmd));
        }

        LOGGER.info("执行可被接受的命令:[{}]", cmd);

//        Process proc = new ProcessBuilder(cmd).directory(new File(workDir)).start();
        Process proc = Runtime.getRuntime().exec(cmd, null, new File(workDir));
}
```
## 命令执行函数
```
"ProcessBuilder.start"
"ProcessBuilder.command"
"Runtime.exec"
"getRuntime.exec"
"System.exec"
"Process.getOutputStream"
"OutputStream.write"
```