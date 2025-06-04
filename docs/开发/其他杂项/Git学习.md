---
title: Git学习
---
## 集中式vs分布式
比特币的区块链设计就类似git，人手一份全账本，只是用p2p全网同步，而git通常搞个中心化服务来同步
svn像银行，完整账本只有银行有，作为终端节点可以向银行查询账本，但如果某一天银行没了，整个完整账本就没了。分布式的核心设计是同步，而不是主从。
## 基本文件
工作区(Working Directory): 仓库文件夹里面, 除了.git目录以外的内容
版本库(Repository):.git目录, 用于存储记录版本信息
- 版本库中的暂缓区(staga):
- 版本库中的分支(master): git自动创建的第一个分支
- 版本库中的HEAD指针:用于指向当前分支
## 常用命令
### 基础命令
git add: 把文件修改添加到暂缓区
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/UQynj7.png)
git commit: 把暂缓区的所有内容提交到当前HEAD指针指向的分支
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/dSvxAj.png)

### 团队命令
- git init --bare : 仓库初始化(共享仓库)。注意: 不要直接在共享仓库中编写代码
- git clone：下载远程仓库到本地
   下载远程仓库到当前路径：git clone 仓库的URL
   下载远程仓库到特定路径：git clone 仓库的URL 存放仓库的路径
- git pull：下载远程仓库的最新信息到本地仓库
- git push：将本地的仓库信息推送到远程仓库

提交时如果远程仓库有其它人提交的最新代码, 必须先pull, 再提交
冲突解决:
当多个人同时修改了同一个文件时, 后提交的需要先从服务器pull代码到问题, 手动解决完冲突之后再push到远程服务器
### 协同命令
- `git branch`: 查看所有分支
- `git branch 分支名称`: 创建分支
     新创建的分支中的内容和master分支中的内容一样
- `git checkout 分支名称`: 切换到指定分支
- `git merge 分支名称`: 合并分支
     将当前所在分支和指定名称分支进行合并
- `git branch -d 分支名称`: 删除指定分支