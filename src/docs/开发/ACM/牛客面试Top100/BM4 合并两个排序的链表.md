---
title: BM4 合并两个排序的链表
---
## 描述

输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。  
如输入{1,3,5},{2,4,6}时，合并后的链表为{1,2,3,4,5,6}，所以对应的输出为{1,2,3,4,5,6}，转换过程如下图所示

![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/ONMwZ4.png)

## 代码
```go

func Merge( pHead1 *ListNode ,  pHead2 *ListNode ) *ListNode {
    if pHead1==nil && pHead2==nil{
        return nil
    }
    var newLinkHead ListNode
    var tmpNode *ListNode
     tmpNode=&newLinkHead
    for pHead1!=nil && pHead2!=nil{
        if pHead1.Val>pHead2.Val{
            tmpNode.Next=pHead2
            pHead2=pHead2.Next
            tmpNode=tmpNode.Next
        }else{
            tmpNode.Next=pHead1
            pHead1=pHead1.Next
            tmpNode=tmpNode.Next
        }
    }
    if pHead1!=nil{
        tmpNode.Next=pHead1
    }
    if pHead2!=nil{
        tmpNode.Next=pHead2
    }
    
    newLinkHead=*newLinkHead.Next
    return &newLinkHead
}
```