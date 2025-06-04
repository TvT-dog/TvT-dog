---
title: BM1 反转链表
---
## 描述
给定一个单链表的头结点pHead(该头节点是有值的，比如在下图，它的val是1)，长度为n，反转该链表后，返回新链表的表头。

如当输入链表{1,2,3}时，经反转后，原链表变为{3,2,1}，所以对应的输出为{3,2,1}。
以上转换过程如下图所示：
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/img.png)
## 代码
```go
package main  
  
import (  
    "fmt"  
    "strconv"    "strings")  
  
type Anode struct {  
    data     int  
    nextNode *Anode  
}  

func main() {  
    var input string  
    var newLink *Anode  
    fmt.Scanln(&input)  
    newLink = reserve(toLinkNode(input))  
    outPrint(newLink)  
}  

//核心转换逻辑
func reserve(head *Anode) *Anode {  
    if head == nil {  
       return head  
    }  
    var nowNode, preNode, nextNode *Anode  
    nowNode = head  
    nextNode = head.nextNode  
    for nowNode != nil {  
       nextNode = nowNode.nextNode  
       nowNode.nextNode = preNode  
       preNode = nowNode  
       nowNode = nextNode  
    }  
    return preNode  
}  

func outPrint(linkHead *Anode) {  
    if linkHead == nil {  
       fmt.Println("{}")  
       return  
    }  
    var nowNode *Anode  
    nowNode = linkHead  
    fmt.Print("{")  
    for nowNode != nil {  
       if nowNode.nextNode == nil {  
          fmt.Printf("%d}", nowNode.data)  
          break  
       }  
       fmt.Printf("%d,", nowNode.data)  
       nowNode = nowNode.nextNode  
    }  
}  
  
func toLinkNode(inputString string) *Anode {  
    var headNode Anode  
    var preNode *Anode  
    numsString := strings.TrimPrefix(inputString, "{")  
    numsString = strings.TrimSuffix(numsString, "}")  
    nums := strings.Split(numsString, ",")  
    if nums[0] == "" {  
       return nil  
    }  
    for key, data := range nums {  
       var newNode Anode  
       if key == 0 {  
          headNode.data, _ = strconv.Atoi(data)  
          preNode = &headNode  
          continue  
       }  
       newNode.data, _ = strconv.Atoi(data)  
       preNode.nextNode = &newNode  
       preNode = &newNode  
    }  
  
    //fmt.Println(headNode)  
    return &headNode  
}
```
## 坑点
```go
func toLinkNode(inputString string) *Anode {  
    var headNode Anode  
    var preNode *Anode 
    //这里使用preNode *Anode 来进行拷贝，假如我们直接使用preNode Anode，其实每一次只是创建新的，没有实现指针的连接
}
```