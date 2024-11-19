---
data: 2024-07-24
关联:
  - "[[book/知识笔记/开发/Java开发/Java开发]]"
  - "[[book/知识笔记/渗透/外网打点/外网打点]]"
---
在使用java-spring-boot的框架下，这里提及的文件上传一般就产生Xss或者网络钓鱼的问题。

示例代码
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西
import org.springframework.web.multipart.MultipartFile;

@PostMapping("/upload")
    public Map<String, Object> upload(@Visitor long userId,
                                      @RequestParam(value = "file") MultipartFile file) {
      String extName = FilenameUtils.getExtension(file.getOriginalFilename());
      String fileKey;
      fileKey = getFileName(userId, System.currentTimeMillis(), extName);
      InputStream inputStream = new ByteArrayInputStream(file.getBytes());
      ListenableFuture<Boolean> future = ApiBlobStore.saveToBlobStore(getFileBlobStoreKey(blobStoreFileName),
                    inputStream, true);
      return Result.success(fileKey);
    }
```